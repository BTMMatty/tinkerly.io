// src/app/blog/admin/page.tsx
// Blog Admin Panel - Where the magic happens! 🧚‍♀️

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { 
  PlusCircle, Edit, Trash2, Eye, EyeOff, Star, Calendar, Tag, 
  Sparkles, TrendingUp, MessageCircle, Heart, Share2, Users,
  FileText, Save, X, Loader, Check, AlertCircle, BookOpen,
  BarChart3, Clock, DollarSign
} from 'lucide-react';
import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';
import { blogService, BlogPost, Category, Tag as BlogTag } from '@/lib/blog-cms';

// Admin emails - add yours here!
const ADMIN_EMAILS = ['matty@tinkerly.io'];

export default function BlogAdminPanel() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  
  // State management
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'posts' | 'create' | 'stats'>('posts');
  
  // Form state
  const [postForm, setPostForm] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image: '',
    category_id: '',
    featured: false,
    published: false,
    seo_title: '',
    seo_description: '',
    seo_keywords: [],
    tags: []
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Check admin access
  useEffect(() => {
    if (isLoaded) {
      if (!user || !ADMIN_EMAILS.includes(user.emailAddresses[0]?.emailAddress || '')) {
        router.push('/blog');
        return;
      }
      loadAdminData();
    }
  }, [isLoaded, user]);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      // Load all posts (including unpublished)
      const { data: postsData } = await blogService.getPosts({ limit: 100 });
      if (postsData) setPosts(postsData);
      
      // Load categories
      const { data: categoriesData } = await blogService.getCategories();
      if (categoriesData) setCategories(categoriesData);
      
      // Load tags
      const { data: tagsData } = await blogService.getTags();
      if (tagsData) setTags(tagsData);
      
      // Load stats
      const { data: statsData } = await blogService.getPostStats();
      if (statsData) setStats(statsData);
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setSaving(true);
    
    try {
      // Prepare post data
      const postData = {
        ...postForm,
        tags: tags.filter(t => selectedTags.includes(t.id))
      };
      
      if (editingPost) {
        // Update existing post
        const { data, error } = await blogService.updatePost(editingPost, postData);
        if (error) throw error;
        
        alert('✨ Post updated successfully!');
      } else {
        // Create new post
        const { data, error } = await blogService.createPost(postData, user.id);
        if (error) throw error;
        
        alert('🎉 Post created successfully!');
      }
      
      // Reset form and reload posts
      resetForm();
      loadAdminData();
      setActiveTab('posts');
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleEditPost = (post: BlogPost) => {
    setPostForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      cover_image: post.cover_image || '',
      category_id: post.category_id || '',
      featured: post.featured,
      published: post.published,
      seo_title: post.seo_title || '',
      seo_description: post.seo_description || '',
      seo_keywords: post.seo_keywords || []
    });
    
    // Set selected tags
    const postTagIds = post.tags?.map((t: any) => t.tag.id) || [];
    setSelectedTags(postTagIds);
    
    setEditingPost(post.id);
    setActiveTab('create');
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }
    
    try {
      const { error } = await blogService.deletePost(postId);
      if (error) throw error;
      
      alert('Post deleted successfully.');
      loadAdminData();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post.');
    }
  };

  const handleTogglePublish = async (post: BlogPost) => {
    try {
      const { error } = await blogService.updatePost(post.id, {
        published: !post.published,
        publish_date: !post.published ? new Date().toISOString() : post.publish_date
      });
      
      if (error) throw error;
      
      alert(post.published ? 'Post unpublished.' : '🎉 Post published!');
      loadAdminData();
    } catch (error) {
      console.error('Error toggling publish:', error);
      alert('Failed to update post status.');
    }
  };

  const resetForm = () => {
    setPostForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      cover_image: '',
      category_id: '',
      featured: false,
      published: false,
      seo_title: '',
      seo_description: '',
      seo_keywords: [],
      tags: []
    });
    setSelectedTags([]);
    setEditingPost(null);
    setPreviewMode(false);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <NavigationHeader />
      
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <Sparkles className="w-8 h-8 mr-3" />
                Blog Admin Panel
              </h1>
              <p className="text-emerald-100 mt-2">
                Welcome back, {user?.firstName}! Ready to create some magic? 🧚‍♀️
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-emerald-100">Total Posts</p>
                <p className="text-2xl font-bold">{stats?.totalPosts || 0}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-emerald-100">Published</p>
                <p className="text-2xl font-bold">{stats?.publishedPosts || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white shadow-sm border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'posts'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FileText className="w-5 h-5 inline mr-2" />
              All Posts
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'create'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <PlusCircle className="w-5 h-5 inline mr-2" />
              {editingPost ? 'Edit Post' : 'Create Post'}
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'stats'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BarChart3 className="w-5 h-5 inline mr-2" />
              Analytics
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Posts List Tab */}
        {activeTab === 'posts' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-emerald-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                      Post
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                      Stats
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 flex items-center">
                            {post.title}
                            {post.featured && (
                              <Star className="w-4 h-4 ml-2 text-yellow-500 fill-current" />
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {post.slug}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {post.category && (
                          <span
                            className="px-2 py-1 text-xs rounded-full text-white"
                            style={{ backgroundColor: post.category.color }}
                          >
                            {post.category.name}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          post.published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            {post.likes_count}
                          </span>
                          <span className="flex items-center">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {post.comments_count}
                          </span>
                          <span className="flex items-center">
                            <Share2 className="w-4 h-4 mr-1" />
                            {post.shares_count}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleEditPost(post)}
                            className="text-emerald-600 hover:text-emerald-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleTogglePublish(post)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {posts.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No posts yet. Create your first magical story!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Create/Edit Post Tab */}
        {activeTab === 'create' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSavePost}>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={postForm.title}
                    onChange={(e) => {
                      setPostForm({ 
                        ...postForm, 
                        title: e.target.value,
                        slug: editingPost ? postForm.slug : generateSlug(e.target.value)
                      });
                    }}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter your magical title..."
                  />
                </div>

                {/* Slug */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={postForm.slug}
                    onChange={(e) => setPostForm({ ...postForm, slug: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="auto-generated-from-title"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={postForm.category_id}
                    onChange={(e) => setPostForm({ ...postForm, category_id: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Cover Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    value={postForm.cover_image}
                    onChange={(e) => setPostForm({ ...postForm, cover_image: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* Excerpt */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt *
                  </label>
                  <textarea
                    value={postForm.excerpt}
                    onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="A brief summary of your post..."
                  />
                </div>

                {/* Content */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content * (Markdown supported)
                  </label>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">
                      Use **bold**, *italic*, # headings, and more!
                    </span>
                    <button
                      type="button"
                      onClick={() => setPreviewMode(!previewMode)}
                      className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                    >
                      {previewMode ? 'Edit' : 'Preview'}
                    </button>
                  </div>
                  
                  {previewMode ? (
                    <div className="prose max-w-none p-4 border border-gray-300 rounded-lg min-h-[300px]">
                      <div dangerouslySetInnerHTML={{ 
                        __html: postForm.content || '<p class="text-gray-400">Nothing to preview yet...</p>' 
                      }} />
                    </div>
                  ) : (
                    <textarea
                      value={postForm.content}
                      onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                      required
                      rows={12}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-sm"
                      placeholder="Write your magical content here..."
                    />
                  )}
                </div>

                {/* Tags */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-lg">
                    {tags.map((tag) => (
                      <label
                        key={tag.id}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          value={tag.id}
                          checked={selectedTags.includes(tag.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedTags([...selectedTags, tag.id]);
                            } else {
                              setSelectedTags(selectedTags.filter(id => id !== tag.id));
                            }
                          }}
                          className="sr-only"
                        />
                        <span className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedTags.includes(tag.id)
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}>
                          {tag.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* SEO Section */}
                <div className="md:col-span-2 border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SEO Title
                      </label>
                      <input
                        type="text"
                        value={postForm.seo_title}
                        onChange={(e) => setPostForm({ ...postForm, seo_title: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Custom title for search engines"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SEO Keywords
                      </label>
                      <input
                        type="text"
                        value={postForm.seo_keywords?.join(', ')}
                        onChange={(e) => setPostForm({ 
                          ...postForm, 
                          seo_keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="keyword1, keyword2, keyword3"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SEO Description
                      </label>
                      <textarea
                        value={postForm.seo_description}
                        onChange={(e) => setPostForm({ ...postForm, seo_description: e.target.value })}
                        rows={2}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Meta description for search results"
                      />
                    </div>
                  </div>
                </div>

                {/* Options */}
                <div className="md:col-span-2 flex items-center space-x-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={postForm.featured}
                      onChange={(e) => setPostForm({ ...postForm, featured: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Featured Post
                    </span>
                  </label>
                  
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={postForm.published}
                      onChange={(e) => setPostForm({ ...postForm, published: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Publish Immediately
                    </span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-6 border-t">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {saving ? (
                    <Loader className="w-5 h-5 animate-spin mr-2" />
                  ) : (
                    <Save className="w-5 h-5 mr-2" />
                  )}
                  {editingPost ? 'Update Post' : 'Create Post'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'stats' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <FileText className="w-8 h-8 text-emerald-600" />
                <span className="text-3xl font-bold text-gray-900">
                  {stats?.totalPosts || 0}
                </span>
              </div>
              <h3 className="text-gray-700 font-medium">Total Posts</h3>
              <p className="text-gray-500 text-sm">All time</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <Eye className="w-8 h-8 text-blue-600" />
                <span className="text-3xl font-bold text-gray-900">
                  {stats?.totalViews || 0}
                </span>
              </div>
              <h3 className="text-gray-700 font-medium">Total Views</h3>
              <p className="text-gray-500 text-sm">All posts combined</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <MessageCircle className="w-8 h-8 text-purple-600" />
                <span className="text-3xl font-bold text-gray-900">
                  {stats?.totalComments || 0}
                </span>
              </div>
              <h3 className="text-gray-700 font-medium">Total Comments</h3>
              <p className="text-gray-500 text-sm">Community engagement</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
                <span className="text-3xl font-bold text-gray-900">
                  {stats?.publishedPosts || 0}
                </span>
              </div>
              <h3 className="text-gray-700 font-medium">Published</h3>
              <p className="text-gray-500 text-sm">Live posts</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}