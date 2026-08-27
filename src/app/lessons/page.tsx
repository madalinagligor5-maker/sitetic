'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { db, Lesson } from '@/lib/db';
import { useAuth } from '@/context/AuthContext';
import { Search, Filter, BookOpen, CheckCircle, Star, GraduationCap } from 'lucide-react';

export default function LessonsPage() {
  const { completedLessons, bookmarks, toggleBookmark } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');

  useEffect(() => {
    // Load from DB (reacts to localStorage updates if any)
    setLessons(db.getLessons());
  }, []);

  const grades = ['All', '5', '6', '7', '8'];
  const topics = ['All', 'Algoritmi', 'Scratch', 'Limbaje Text', 'Instrumente TIC', 'Cetatenie Digitala'];

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lesson.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'All' ? true : lesson.grade === selectedGrade;
    const matchesTopic = selectedTopic === 'All' ? true : lesson.topic === selectedTopic;
    return matchesSearch && matchesGrade && matchesTopic;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8">
        {/* Page title / intro */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-6 mb-8 gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-slate-900 flex items-center">
              <GraduationCap className="mr-2.5 h-8 w-8 text-blue-600" />
              Lecții Interactive
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Selectează clasa și subiectul pentru a accesa ghidurile teoretice și interactive.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Caută o lecție sau subiect..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Side Filters Pane */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                <Filter className="h-4.5 w-4.5 text-blue-600" />
                <h3 className="font-serif text-sm font-bold text-slate-800">Filtrează Resurse</h3>
              </div>

              {/* Grade Filter */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2.5">După Clasă</label>
                <div className="flex flex-wrap gap-1.5">
                  {grades.map((grade) => (
                    <button
                      key={grade}
                      onClick={() => setSelectedGrade(grade)}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition cursor-pointer ${
                        selectedGrade === grade
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {grade === 'All' ? 'Toate' : `Clasa a ${grade === '5' ? 'V-a' : grade === '6' ? 'VI-a' : grade === '7' ? 'VII-a' : 'VIII-a'}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic Filter */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2.5">După Subiect</label>
                <div className="space-y-1">
                  {topics.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => setSelectedTopic(topic)}
                      className={`w-full text-left text-xs px-3 py-2 rounded-lg transition font-medium flex items-center justify-between cursor-pointer ${
                        selectedTopic === topic
                          ? 'bg-slate-100 text-slate-900 font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{topic === 'All' ? 'Toate domeniile' : topic}</span>
                      {selectedTopic === topic && <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lessons Grid list */}
          <div className="lg:col-span-3">
            {filteredLessons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredLessons.map((lesson) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isBookmarked = bookmarks.includes(lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div className="p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                            Clasa a {lesson.grade === '5' ? 'V-a' : lesson.grade === '6' ? 'VI-a' : lesson.grade === '7' ? 'VII-a' : 'VIII-a'}
                          </span>
                          <span className="text-xs font-semibold text-blue-600">
                            {lesson.topic}
                          </span>
                        </div>

                        <h3 className="font-serif text-lg font-bold text-slate-950 leading-snug hover:text-blue-600 transition">
                          <Link href={`/lessons/${lesson.id}`}>{lesson.title}</Link>
                        </h3>
                        
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                          {lesson.excerpt}
                        </p>
                      </div>

                      <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {isCompleted && (
                            <span className="flex items-center text-xs text-emerald-600 font-bold" title="Lecție Parcursă">
                              <CheckCircle className="h-4.5 w-4.5 mr-1" /> Completă
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleBookmark(lesson.id)}
                            className={`p-1.5 rounded-lg border transition cursor-pointer ${
                              isBookmarked 
                                ? 'bg-amber-50 border-amber-200 text-amber-500 hover:bg-amber-100' 
                                : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
                            }`}
                            title="Salvează lecția"
                          >
                            <Star className={`h-4 w-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                          </button>

                          <Link
                            href={`/lessons/${lesson.id}`}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-sm transition flex items-center"
                          >
                            Parcurge Lecția
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">
                <BookOpen className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                <p className="font-bold text-slate-700">Nu am găsit nicio lecție.</p>
                <p className="text-xs mt-1">Încearcă să schimbi filtrele sau termenii căutați.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
