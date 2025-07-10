'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Sparkles, Zap, Heart, User, Circle } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase';

// Mock team members - replace with your actual team data
const teamMembers = [
  {
    id: 'tink',
    name: 'Tink',
    role: 'Chief Code Pixie',
    avatar: '🧚‍♀️',
    status: 'online',
    lastSeen: 'Now'
  },
  {
    id: 'dev1',
    name: 'Alex',
    role: 'Senior Developer',
    avatar: '👨‍💻',
    status: 'online',
    lastSeen: '2 min ago'
  },
  {
    id: 'dev2',
    name: 'Sarah',
    role: 'UI/UX Designer',
    avatar: '🎨',
    status: 'away',
    lastSeen: '15 min ago'
  }
];

interface ChatMessage {
  id: string;
  user_id: string;
  user_name: string;
  message: string;
  created_at: string;
  avatar?: string;
}

const TinkerlyChat = () => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load initial messages from Supabase
  useEffect(() => {
    loadMessages();
  }, []);

  // Real-time subscription for new messages
  useEffect(() => {
    const channel = supabase
      .channel('chat_messages')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'chat_messages'
      }, (payload) => {
        const newMessage = payload.new as ChatMessage;
        setMessages(prev => {
          // Avoid duplicates
          if (prev.some(msg => msg.id === newMessage.id)) {
            return prev;
          }
          return [...prev, newMessage];
        });
      })
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(50); // Load last 50 messages

      if (error) {
        console.error('Error loading messages:', error);
        return;
      }

      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    try {
      const message = {
        user_id: user.id,
        user_name: user.firstName || user.fullName || 'Anonymous',
        message: newMessage.trim(),
      };

      const { error } = await supabase
        .from('chat_messages')
        .insert([message]);

      if (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again.');
        return;
      }

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getMessageAvatar = (message: ChatMessage) => {
    // Check if it's a team member
    const teamMember = teamMembers.find(member => 
      member.name.toLowerCase() === message.user_name.toLowerCase()
    );
    
    if (teamMember) {
      return teamMember.avatar;
    }
    
    // Default user avatar
    return '👤';
  };

  const isCurrentUser = (message: ChatMessage) => {
    return user?.id === message.user_id;
  };

  const isTeamMember = (message: ChatMessage) => {
    return teamMembers.some(member => 
      member.name.toLowerCase() === message.user_name.toLowerCase()
    );
  };

  if (!user) {
    return null; // Don't show chat if user is not logged in
  }

  return (
    <>
      {/* Chat Bubble - Fixed Position */}
      <div className="fixed bottom-8 right-8 z-[99999] isolate" style={{ position: 'fixed', zIndex: 99999 }}>
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 relative overflow-hidden"
          >
            {/* Magical sparkle animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 transition-all duration-1000 group-hover:translate-x-full"></div>
            
            <MessageSquare className="w-6 h-6 relative z-10" />
            
            {/* Notification badge */}
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
              💬
            </div>
            
            {/* Floating sparkles */}
            <Sparkles className="absolute -top-1 -left-1 w-4 h-4 text-yellow-300 animate-pulse" />
            <Sparkles className="absolute -bottom-1 -right-1 w-3 h-3 text-cyan-300 animate-bounce" />
          </button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 z-[99999] isolate w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-emerald-200 flex flex-col overflow-hidden" style={{ position: 'fixed', zIndex: 99999 }}>
          {/* Header */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-4 flex items-center justify-between text-white">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-lg">
                  🧚‍♀️
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-semibold">Chat with the Pixie Team ✨</h3>
                <p className="text-emerald-100 text-sm">We're here to help!</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-emerald-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Team Status */}
          <div className="bg-emerald-50 p-3 border-b border-emerald-100">
            <div className="flex space-x-2 overflow-x-auto">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center space-x-2 bg-white rounded-full px-3 py-1 shadow-sm whitespace-nowrap">
                  <span className="text-lg">{member.avatar}</span>
                  <div className="text-xs">
                    <div className="font-medium text-gray-700">{member.name}</div>
                    <div className="flex items-center space-x-1">
                      <Circle className={`w-2 h-2 fill-current ${
                        member.status === 'online' ? 'text-green-400' : 'text-gray-400'
                      }`} />
                      <span className="text-gray-500">{member.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-emerald-600">
                  <Sparkles className="w-6 h-6 animate-spin" />
                  <p className="text-sm mt-2">Loading magical conversations...</p>
                </div>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-sm">No messages yet. Start the conversation! ✨</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${isCurrentUser(message) ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex space-x-2 max-w-[80%] ${
                    isCurrentUser(message) ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-sm">
                      {getMessageAvatar(message)}
                    </div>
                    <div>
                      <div className={`px-4 py-2 rounded-2xl ${
                        isCurrentUser(message)
                          ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
                          : isTeamMember(message)
                          ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                          : 'bg-white border border-emerald-100 text-gray-800'
                      }`}>
                        <p className="text-sm">{message.message}</p>
                      </div>
                      <div className={`text-xs text-gray-500 mt-1 ${
                        isCurrentUser(message) ? 'text-right' : 'text-left'
                      }`}>
                        <span className="font-medium">{message.user_name}</span> • {formatTime(message.created_at)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-sm">
                    🧚‍♀️
                  </div>
                  <div className="bg-white border border-emerald-100 px-4 py-2 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-emerald-100 bg-white">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message... ✨"
                className="flex-1 px-4 py-2 border border-emerald-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-full transition-all duration-200 transform hover:scale-105"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            {/* Quick Actions */}
            <div className="flex space-x-2 mt-3">
              <button 
                onClick={() => setNewMessage('I need help with pricing for my project')}
                className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full hover:bg-emerald-200 transition-colors"
              >
                💰 Get Pricing
              </button>
              <button 
                onClick={() => setNewMessage('I\'d like to start a new automation project')}
                className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full hover:bg-emerald-200 transition-colors"
              >
                🚀 Start Project
              </button>
              <button 
                onClick={() => setNewMessage('Can you tell me more about how Tinkerly.io works?')}
                className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full hover:bg-emerald-200 transition-colors"
              >
                📚 Learn More
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TinkerlyChat;