// src/app/blog/[slug]/page.tsx
// Individual Blog Post Page - Where the magic comes to life! 🧚‍♀️

'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, Clock, Share2, Heart, MessageCircle, ArrowLeft, Tag, Sparkles, Twitter, Facebook, Linkedin, Copy, Loader, Send } from 'lucide-react';
import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';
import { blogService, BlogPost, Comment } from '@/lib/blog-cms';
import { useUser } from '@clerk/nextjs';

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();
  const slug = params.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  // Comment form state
  const [commentForm, setCommentForm] = useState({
    author_name: '',
    author_email: '',
    content: ''
  });
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    if (slug) {
      loadPost();
    }
  }, [slug]);

  const loadPost = async () => {
    setLoading(true);
    try {
      // Load post
      const { data: postData } = await blogService.getPostBySlug(slug);
      
      if (!postData) {
        router.push('/blog');
        return;
      }
      
      setPost(postData);
      
      // Track view
      await blogService.trackAnalytics(postData.id, 'view', user?.id);
      
      // Load related posts
      const { data: relatedData } = await blogService.getRelatedPosts(postData.id, 3);
      if (relatedData) {
        setRelatedPosts(relatedData);
      }
      
      // Load comments
      const { data: commentsData } = await blogService.getComments(postData.id);
      if (commentsData) {
        setComments(commentsData);
      }
      
      // Check if user has liked (you'd implement this in your service)
      const savedLikes = localStorage.getItem('liked_posts');
      if (savedLikes) {
        const likedPosts = JSON.parse(savedLikes);
        setLiked(likedPosts.includes(postData.id));
      }
    } catch (error) {
      console.error('Error loading post:', error);
      router.push('/blog');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!post) return;
    
    const newLikedState = !liked;
    setLiked(newLikedState);
    
    // Save to localStorage
    const savedLikes = localStorage.getItem('liked_posts');
    let likedPosts = savedLikes ? JSON.parse(savedLikes) : [];
    
    if (newLikedState) {
      likedPosts.push(post.id);
      await blogService.trackAnalytics(post.id, 'like', user?.id);
      setPost({ ...post, likes_count: post.likes_count + 1 });
    } else {
      likedPosts = likedPosts.filter((id: string) => id !== post.id);
      setPost({ ...post, likes_count: Math.max(0, post.likes_count - 1) });
    }
    
    localStorage.setItem('liked_posts', JSON.stringify(likedPosts));
  };

  const handleShare = async (platform: string) => {
    if (!post) return;
    
    const url = window.location.href;
    const text = `Check out "${post.title}" by @TinkerlyIO`;

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard! ✨');
        break;
    }

    await blogService.trackAnalytics(post.id, 'share', user?.id);
    setShowShareMenu(false);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;
    
    setSubmittingComment(true);
    
    try {
      const { data: newComment } = await blogService.createComment({
        post_id: post.id,
        user_id: user?.id,
        author_name: user?.fullName || commentForm.author_name,
        author_email: user?.emailAddresses?.[0]?.emailAddress || commentForm.author_email,
        content: commentForm.content,
        approved: !!user // Auto-approve if user is logged in
      });
      
      if (newComment && user) {
        // Add comment to list if auto-approved
        setComments([newComment, ...comments]);
        setPost({ ...post, comments_count: post.comments_count + 1 });
      }
      
      // Reset form
      setCommentForm({ author_name: '', author_email: '', content: '' });
      
      alert(user 
        ? '✨ Comment posted successfully!' 
        : '✨ Comment submitted! It will appear after moderation.'
      );
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment. Please try again.');
    } finally {
      setSubmittingComment(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading magical content...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <NavigationHeader />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        {post.cover_image && (
          <img 
            src={post.cover_image} 
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
        )}
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link 
            href="/blog"
            className="inline-flex items-center text-emerald-100 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to The Pixie Post
          </Link>
          
          <div className="flex items-center space-x-4 mb-6">
            {post.category && (
              <span
                className="px-3 py-1 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: post.category.color }}
              >
                {post.category.name}
              </span>
            )}
            <span className="text-emerald-100">
              {formatDate(post.publish_date || post.created_at)}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {post.title}
          </h1>
          
          <p className="text-xl text-emerald-100 mb-8">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {post.author?.avatar_url ? (
                <img 
                  src={post.author.avatar_url} 
                  alt={post.author.full_name}
                  className="w-12 h-12 rounded-full border-2 border-white"
                />
              ) : (
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                  <User className="w-6 h-6 text-white" />
                </div>
              )}
              <div>
                <p className="font-semibold">{post.author?.full_name || 'Tinkerly Team'}</p>
                <p className="text-emerald-100 text-sm">{post.reading_time} min read</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                  liked 
                    ? 'bg-white text-emerald-600' 
                    : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                }`}
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                <span>{post.likes_count}</span>
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition-all"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
                
                {showShareMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-emerald-50 transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                      <span>Twitter</span>
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-emerald-50 transition-colors"
                    >
                      <Facebook className="w-4 h-4" />
                      <span>Facebook</span>
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-emerald-50 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-emerald-50 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copy Link</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Content */}
        <article className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.html_content || post.content }}
          />
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center flex-wrap gap-2">
                <Tag className="w-5 h-5 text-gray-400" />
                {post.tags.map((tag: any) => (
                  <Link
                    key={tag.tag.id}
                    href={`/blog?tag=${tag.tag.slug}`}
                    className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm hover:bg-emerald-200 transition-colors"
                  >
                    {tag.tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Author Bio */}
        {post.author?.bio && (
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white mb-12">
            <div className="flex items-start space-x-4">
              {post.author.avatar_url ? (
                <img 
                  src={post.author.avatar_url} 
                  alt={post.author.full_name}
                  className="w-16 h-16 rounded-full border-2 border-white"
                />
              ) : (
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold mb-2">About {post.author.full_name}</h3>
                <p className="text-emerald-100">{post.author.bio}</p>
              </div>
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <MessageCircle className="w-6 h-6 mr-3 text-emerald-600" />
            Comments ({post.comments_count})
          </h2>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            {!user && (
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={commentForm.author_name}
                  onChange={(e) => setCommentForm({ ...commentForm, author_name: e.target.value })}
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="email"
                  placeholder="Your Email (optional)"
                  value={commentForm.author_email}
                  onChange={(e) => setCommentForm({ ...commentForm, author_email: e.target.value })}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}
            
            <textarea
              placeholder="Share your magical thoughts... ✨"
              value={commentForm.content}
              onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4"
            />
            
            <button
              type="submit"
              disabled={submittingComment}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {submittingComment ? (
                <Loader className="w-5 h-5 animate-spin mr-2" />
              ) : (
                <Send className="w-5 h-5 mr-2" />
              )}
              Post Comment
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-0">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {comment.author_name}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {formatDate(comment.created_at)}
                      </span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {comments.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                Be the first to share your thoughts! 🧚‍♀️
              </p>
            )}
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Sparkles className="w-6 h-6 mr-3 text-emerald-600" />
              More Magical Stories
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  {relatedPost.cover_image && (
                    <div className="h-40 overflow-hidden">
                      <img
                        src={relatedPost.cover_image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}