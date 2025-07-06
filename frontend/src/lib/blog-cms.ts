// src/lib/blog-cms.ts
// Blog CMS Service for Tinkerly.io - The Magical Blog Engine 🧚‍♀️

import { supabase } from './supabase';
import { remark } from 'remark';
import html from 'remark-html';
import matter from 'gray-matter';
import readingTime from 'reading-time';

// Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  html_content?: string;
  cover_image?: string;
  author_id: string;
  category_id?: string;
  featured: boolean;
  published: boolean;
  publish_date?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  reading_time?: number;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  created_at: string;
  updated_at: string;
  // Relations
  author?: Author;
  category?: Category;
  tags?: Tag[];
  comments?: Comment[];
}

export interface Author {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  bio?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id?: string;
  author_name: string;
  author_email?: string;
  content: string;
  approved: boolean;
  created_at: string;
}

export interface BlogAnalytics {
  id: string;
  post_id: string;
  event_type: 'view' | 'like' | 'share' | 'comment';
  user_id?: string;
  ip_address?: string;
  created_at: string;
}

// Blog Service Class
export class BlogService {
  // ==========================================
  // POST OPERATIONS
  // ==========================================

  // Get all published posts
  async getPosts(options: {
    limit?: number;
    offset?: number;
    category?: string;
    tag?: string;
    featured?: boolean;
    search?: string;
  } = {}) {
    try {
      let query = supabase
        .from('blog_posts')
        .select(`
          *,
          author:users!author_id(id, full_name, email, avatar_url),
          category:blog_categories!category_id(id, name, slug, color),
          tags:blog_post_tags(tag:blog_tags(id, name, slug))
        `)
        .eq('published', true)
        .order('publish_date', { ascending: false });

      // Apply filters
      if (options.category) {
        const { data: category } = await supabase
          .from('blog_categories')
          .select('id')
          .eq('slug', options.category)
          .single();
        
        if (category) {
          query = query.eq('category_id', category.id);
        }
      }

      if (options.featured !== undefined) {
        query = query.eq('featured', options.featured);
      }

      if (options.search) {
        query = query.or(`title.ilike.%${options.search}%,excerpt.ilike.%${options.search}%,content.ilike.%${options.search}%`);
      }

      if (options.limit) {
        query = query.limit(options.limit);
      }

      if (options.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Process posts to add HTML content
      const processedPosts = await Promise.all(
        (data || []).map(async (post) => ({
          ...post,
          html_content: await this.markdownToHtml(post.content),
          reading_time: Math.ceil(readingTime(post.content).minutes)
        }))
      );

      return { data: processedPosts, error: null };
    } catch (error) {
      console.error('Error fetching posts:', error);
      return { data: null, error };
    }
  }

  // Get single post by slug
  async getPostBySlug(slug: string) {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          author:users!author_id(id, full_name, email, avatar_url, bio),
          category:blog_categories!category_id(id, name, slug, color),
          tags:blog_post_tags(tag:blog_tags(id, name, slug)),
          comments:blog_comments!post_id(*)
        `)
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) throw error;

      // Convert markdown to HTML
      const html_content = await this.markdownToHtml(data.content);
      
      return {
        data: {
          ...data,
          html_content,
          reading_time: Math.ceil(readingTime(data.content).minutes)
        },
        error: null
      };
    } catch (error) {
      console.error('Error fetching post:', error);
      return { data: null, error };
    }
  }

  // Create new post
  async createPost(post: Partial<BlogPost>, authorId: string) {
    try {
      const slug = this.generateSlug(post.title || '');
      const postReadingTime = Math.ceil(readingTime(post.content || '').minutes);

      const { data, error } = await supabase
        .from('blog_posts')
        .insert({
          ...post,
          slug,
          author_id: authorId,
          reading_time: postReadingTime,
          publish_date: post.published ? new Date().toISOString() : null
        })
        .select()
        .single();

      if (error) throw error;

      // Handle tags if provided
      if (post.tags && post.tags.length > 0) {
        await this.updatePostTags(data.id, post.tags);
      }

      return { data, error: null };
    } catch (error) {
      console.error('Error creating post:', error);
      return { data: null, error };
    }
  }

  // Update post
  async updatePost(postId: string, updates: Partial<BlogPost>) {
    try {
      const postReadingTime = updates.content 
        ? Math.ceil(readingTime(updates.content).minutes)
        : undefined;

      const { data, error } = await supabase
        .from('blog_posts')
        .update({
          ...updates,
          reading_time: postReadingTime,
          updated_at: new Date().toISOString()
        })
        .eq('id', postId)
        .select()
        .single();

      if (error) throw error;

      // Update tags if provided
      if (updates.tags) {
        await this.updatePostTags(postId, updates.tags);
      }

      return { data, error: null };
    } catch (error) {
      console.error('Error updating post:', error);
      return { data: null, error };
    }
  }

  // Delete post
  async deletePost(postId: string) {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      return { error: null };
    } catch (error) {
      console.error('Error deleting post:', error);
      return { error };
    }
  }

  // ==========================================
  // CATEGORY OPERATIONS
  // ==========================================

  async getCategories() {
    try {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name');

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Error fetching categories:', error);
      return { data: null, error };
    }
  }

  async createCategory(category: Partial<Category>) {
    try {
      const slug = this.generateSlug(category.name || '');
      
      const { data, error } = await supabase
        .from('blog_categories')
        .insert({
          ...category,
          slug
        })
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Error creating category:', error);
      return { data: null, error };
    }
  }

  // ==========================================
  // TAG OPERATIONS
  // ==========================================

  async getTags() {
    try {
      const { data, error } = await supabase
        .from('blog_tags')
        .select('*')
        .order('name');

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Error fetching tags:', error);
      return { data: null, error };
    }
  }

  async createTag(name: string) {
    try {
      const slug = this.generateSlug(name);
      
      const { data, error } = await supabase
        .from('blog_tags')
        .insert({
          name,
          slug
        })
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Error creating tag:', error);
      return { data: null, error };
    }
  }

  async updatePostTags(postId: string, tags: Tag[]) {
    try {
      // Remove existing tags
      await supabase
        .from('blog_post_tags')
        .delete()
        .eq('post_id', postId);

      // Add new tags
      if (tags.length > 0) {
        const tagRelations = tags.map(tag => ({
          post_id: postId,
          tag_id: tag.id
        }));

        await supabase
          .from('blog_post_tags')
          .insert(tagRelations);
      }

      return { error: null };
    } catch (error) {
      console.error('Error updating post tags:', error);
      return { error };
    }
  }

  // ==========================================
  // COMMENT OPERATIONS
  // ==========================================

  async getComments(postId: string, approved: boolean = true) {
    try {
      let query = supabase
        .from('blog_comments')
        .select(`
          *,
          user:users!user_id(id, full_name, avatar_url)
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: false });

      if (approved) {
        query = query.eq('approved', true);
      }

      const { data, error } = await query;

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Error fetching comments:', error);
      return { data: null, error };
    }
  }

  async createComment(comment: Partial<Comment>) {
    try {
      const { data, error } = await supabase
        .from('blog_comments')
        .insert(comment)
        .select()
        .single();

      if (error) throw error;

      // Increment comment count
      await supabase.rpc('increment_post_stat', {
        p_post_id: comment.post_id,
        p_stat_type: 'comments'
      });

      return { data, error: null };
    } catch (error) {
      console.error('Error creating comment:', error);
      return { data: null, error };
    }
  }

  async approveComment(commentId: string) {
    try {
      const { data, error } = await supabase
        .from('blog_comments')
        .update({ approved: true })
        .eq('id', commentId)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Error approving comment:', error);
      return { data: null, error };
    }
  }

  // ==========================================
  // ANALYTICS OPERATIONS
  // ==========================================

  async trackAnalytics(
    postId: string,
    eventType: 'view' | 'like' | 'share',
    userId?: string
  ) {
    try {
      const { error } = await supabase
        .from('blog_analytics')
        .insert({
          post_id: postId,
          event_type: eventType,
          user_id: userId
        });

      if (error) throw error;

      // Increment the appropriate counter
      if (eventType === 'like' || eventType === 'share') {
        await supabase.rpc('increment_post_stat', {
          p_post_id: postId,
          p_stat_type: eventType === 'like' ? 'likes' : 'shares'
        });
      }

      return { error: null };
    } catch (error) {
      console.error('Error tracking analytics:', error);
      return { error };
    }
  }

  async getPostAnalytics(postId: string) {
    try {
      const { data, error } = await supabase
        .from('blog_analytics')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Error fetching analytics:', error);
      return { data: null, error };
    }
  }

  // ==========================================
  // HELPER FUNCTIONS
  // ==========================================

  private generateSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
  }

  private async markdownToHtml(markdown: string): Promise<string> {
    const result = await remark()
      .use(html)
      .process(markdown);
    
    return result.toString();
  }

  // Get related posts
  async getRelatedPosts(postId: string, limit: number = 3) {
    try {
      // Get the current post's category and tags
      const { data: currentPost } = await supabase
        .from('blog_posts')
        .select('category_id, tags:blog_post_tags(tag_id)')
        .eq('id', postId)
        .single();

      if (!currentPost) return { data: [], error: null };

      // Find posts with same category or tags
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          author:users!author_id(id, full_name, avatar_url),
          category:blog_categories!category_id(id, name, slug, color)
        `)
        .eq('published', true)
        .neq('id', postId)
        .or(`category_id.eq.${currentPost.category_id}`)
        .limit(limit);

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Error fetching related posts:', error);
      return { data: null, error };
    }
  }

  // Search posts
  async searchPosts(query: string) {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          author:users!author_id(id, full_name, avatar_url),
          category:blog_categories!category_id(id, name, slug, color)
        `)
        .eq('published', true)
        .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
        .limit(10);

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Error searching posts:', error);
      return { data: null, error };
    }
  }

  // Get post stats for admin dashboard
  async getPostStats() {
    try {
      const { data: totalPosts } = await supabase
        .from('blog_posts')
        .select('id', { count: 'exact', head: true });

      const { data: publishedPosts } = await supabase
        .from('blog_posts')
        .select('id', { count: 'exact', head: true })
        .eq('published', true);

      const { data: totalViews } = await supabase
        .from('blog_analytics')
        .select('id', { count: 'exact', head: true })
        .eq('event_type', 'view');

      const { data: totalComments } = await supabase
        .from('blog_comments')
        .select('id', { count: 'exact', head: true });

      return {
        data: {
          totalPosts: totalPosts || 0,
          publishedPosts: publishedPosts || 0,
          totalViews: totalViews || 0,
          totalComments: totalComments || 0
        },
        error: null
      };
    } catch (error) {
      console.error('Error fetching stats:', error);
      return { data: null, error };
    }
  }
}

// Export singleton instance
export const blogService = new BlogService();