'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { db, BlogPost } from '@/lib/db';
import { BookOpen, Calendar, User, ArrowLeft, Filter, BookOpenCheck } from 'lucide-react';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  useEffect(() => {
    setPosts(db.getBlogPosts());
  }, []);

  const categories = ['All', 'Metodica', 'Olimpiade', 'Noutati', 'Ghiduri'];

  const filteredPosts = posts.filter((post) => {
    if (selectedCategory === 'All') return true;
    return post.category === selectedCategory;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 mx-auto max-w-5xl w-full px-4 py-8 sm:px-6">
        {/* Title */}
        {!activePost && (
          <div className="border-b border-slate-200 pb-6 mb-8">
            <h1 className="font-serif text-3xl font-bold text-slate-900 flex items-center">
              <BookOpenCheck className="mr-2.5 h-8 w-8 text-blue-600" />
              Blog & Noutăți Educaționale
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Metodici didactice, resurse pentru pregătirea competițiilor școlare și ghiduri detaliate pentru profesori.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className={`${activePost ? 'lg:col-span-12' : 'lg:col-span-8'} space-y-8`}>
            {/* List View */}
            {!activePost && (
              <div className="space-y-6">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <article
                      key={post.id}
                      className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-sm transition space-y-4"
                    >
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded border border-blue-100 uppercase tracking-wider">
                          {post.category}
                        </span>
                        <span className="text-slate-400">{post.readTime} lectură</span>
                      </div>

                      <h2 className="font-serif text-xl font-bold text-slate-990 leading-tight hover:text-blue-600 transition">
                        <button onClick={() => setActivePost(post)} className="text-left font-serif font-bold text-slate-900 hover:text-blue-600">
                          {post.title}
                        </button>
                      </h2>

                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center"><User className="h-4 w-4 mr-1 text-slate-400" /> {post.author}</span>
                          <span className="flex items-center"><Calendar className="h-4 w-4 mr-1 text-slate-400" /> {post.date}</span>
                        </div>

                        <button
                          onClick={() => setActivePost(post)}
                          className="font-bold text-blue-600 hover:text-blue-500 flex items-center"
                        >
                          Citește Articolul &rarr;
                        </button>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">
                    <BookOpen className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                    <p className="font-bold text-slate-700">Niciun articol publicat.</p>
                    <p className="text-xs mt-1">Alege o altă categorie din meniul lateral.</p>
                  </div>
                )}
              </div>
            )}

            {/* Single Post Detail View */}
            {activePost && (
              <div className="space-y-6">
                <button
                  onClick={() => setActivePost(null)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center transition"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" /> Înapoi la blog
                </button>

                <article className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
                  <div className="border-b border-slate-100 pb-6 space-y-3">
                    <div className="flex items-center space-x-3 text-xs font-bold">
                      <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded border border-blue-100 uppercase tracking-wider">
                        {activePost.category}
                      </span>
                      <span className="text-slate-400">&bull;</span>
                      <span className="text-slate-500">{activePost.readTime} de citit</span>
                    </div>

                    <h1 className="font-serif text-2xl sm:text-3.5xl font-bold text-slate-900 leading-tight">
                      {activePost.title}
                    </h1>

                    <div className="flex items-center space-x-4 text-xs text-slate-400">
                      <span className="flex items-center"><User className="h-4 w-4 mr-1" /> {activePost.author}</span>
                      <span className="flex items-center"><Calendar className="h-4 w-4 mr-1" /> {activePost.date}</span>
                    </div>
                  </div>

                  <div 
                    className="prose prose-blue text-sm leading-relaxed text-slate-700 max-w-none space-y-4"
                    dangerouslySetInnerHTML={{ __html: activePost.content }}
                  />
                </article>
              </div>
            )}
          </div>

          {/* Sidebar Categories (Hide if reading full article) */}
          {!activePost && (
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
                  <Filter className="h-4 w-4 text-blue-600" />
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Categorii</span>
                </div>

                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left text-xs px-3 py-2 rounded-lg transition font-medium flex items-center justify-between cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-slate-100 text-slate-900 font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cat === 'All' ? 'Toate Articolele' : cat}</span>
                      {selectedCategory === cat && <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
