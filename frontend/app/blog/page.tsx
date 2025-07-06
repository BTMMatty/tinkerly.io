// app/blog/page.tsx
// The Pixie Post - Tinkerly.io's Magical Blog 🧚‍♀️

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, User, Clock, Share2, Heart, MessageCircle, Search, Filter, Sparkles, BookOpen, Tag, TrendingUp, Mail, ArrowRight, Loader } from 'lucide-react';
import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';
import { blogService, BlogPost, Category } from '@/lib/blog-cms';

export default function BlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [email, setEmail] = useState('');
  const [subscribeLoading, setSubscribeLoading] = useState(false);

  useEffect(() => {
    loadBlogData();
  }, [selectedCategory]);

  const loadBlogData = async () => {
    setLoading(true);
    try {
      // Load posts
      const { data: postsData } = await blogService.getPosts({
        category: selectedCategory,
        search: searchQuery
      });
      
      if (postsData) {
        setPosts(postsData.filter(p => !p.featured));
        const featured = postsData.find(p => p.featured);
        setFeaturedPost(featured || postsData[0]);
      }

      // Load categories
      const { data: categoriesData } = await blogService.getCategories();
      if (categoriesData) {
        setCategories(categoriesData);
      }
    } catch (error) {
      console.error('Error loading blog data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    loadBlogData();
  };

  const handleShare = async (post: BlogPost, platform: string) => {
    const url = `${window.location.origin}/blog/${post.slug}`;
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

    // Track share
    await blogService.trackAnalytics(post.id, 'share');
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeLoading(true);
    
    // Here you would integrate with your email service
    // For now, just show success
    setTimeout(() => {
      alert(`✨ Welcome to the Pixie Post family! Check your email at ${email} for magical updates!`);
      setEmail('');
      setSubscribeLoading(false);
    }, 1000);
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading magical content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center bg-white bg-opacity-20 rounded-full px-6 py-2 mb-8">
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-emerald-100">The Official Tinkerly.io Blog</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              The Pixie Post 🧚‍♀️
            </h1>
            
            <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto mb-12">
              Magical insights on AI development, ethical automation, and building the future of software with pixie dust
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-600 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for magical content..."
                  className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-emerald-300"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="sticky top-16 z-40 bg-white shadow-sm border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-6 py-4 overflow-x-auto">
            <button
              onClick={() => setSelectedCategory('')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors whitespace-nowrap ${
                selectedCategory === ''
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>All Posts</span>
            </button>
            
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors whitespace-nowrap ${
                  selectedCategory === category.slug
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={{
                  backgroundColor: selectedCategory === category.slug ? category.color : undefined
                }}
              >
                <Tag className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <div className="flex items-center mb-6">
              <TrendingUp className="w-6 h-6 text-emerald-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Featured Story</h2>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow border border-emerald-100">
              <div className="md:flex">
                {featuredPost.cover_image && (
                  <div className="md:w-1/2">
                    <img
                      src={featuredPost.cover_image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className={`${featuredPost.cover_image ? 'md:w-1/2' : 'w-full'} p-8`}>
                  <div className="flex items-center space-x-4 mb-4">
                    {featuredPost.category && (
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: featuredPost.category.color }}
                      >
                        {featuredPost.category.name}
                      </span>
                    )}
                    <span className="text-gray-500 text-sm">
                      {formatDate(featuredPost.publish_date || featuredPost.created_at)}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {featuredPost.reading_time} min read
                      </span>
                      <span className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {featuredPost.likes_count}
                      </span>
                      <span className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {featuredPost.comments_count}
                      </span>
                    </div>
                    
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group border border-emerald-100"
            >
              {post.cover_image && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  {post.category && (
                    <span
                      className="px-2 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: post.category.color }}
                    >
                      {post.category.name}
                    </span>
                  )}
                  <span className="text-gray-500 text-sm">
                    {formatDate(post.publish_date || post.created_at)}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.reading_time} min
                    </span>
                    <span className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      {post.likes_count}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleShare(post, 'twitter')}
                      className="text-gray-400 hover:text-emerald-600 transition-colors"
                      title="Share on Twitter"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && !featuredPost && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No magical stories yet
            </h3>
            <p className="text-gray-600">
              Check back soon for enchanting content! 🧚‍♀️
            </p>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white text-center shadow-xl">
          <div className="max-w-2xl mx-auto">
            <Mail className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Get Magical Updates ✨
            </h2>
            <p className="text-emerald-100 mb-6">
              Join our pixie post family and receive the latest insights on AI development, ethical automation, and software magic.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              />
              <button
                type="submit"
                disabled={subscribeLoading}
                className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {subscribeLoading ? (
                  <Loader className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}