'use client';

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { db, Lesson } from '@/lib/db';
import { useAuth } from '@/context/AuthContext';
import { CodePlayground } from '@/components/CodePlayground';
import { BlockRunner } from '@/components/BlockRunner';
import { FlowchartVisualizer } from '@/components/FlowchartVisualizer';
import { 
  ArrowLeft, 
  CheckCircle, 
  Star, 
  Sparkles, 
  BookOpen, 
  MessageSquare,
  BookmarkCheck
} from 'lucide-react';

export default function LessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const lessonId = resolvedParams.id;

  const { completedLessons, toggleLessonCompleted, bookmarks, toggleBookmark, user } = useAuth();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [successAnimation, setSuccessAnimation] = useState(false);

  useEffect(() => {
    const data = db.getLessons().find((l) => l.id === lessonId);
    if (data) {
      setLesson(data);
    }
  }, [lessonId]);

  if (!lesson) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-12 text-slate-500">
          <BookOpen className="h-12 w-12 text-slate-300 mb-3 animate-pulse" />
          <p className="font-bold text-slate-700">Se încarcă sau lecția nu a fost găsită...</p>
          <Link href="/lessons" className="text-sm text-blue-600 hover:underline mt-2">Înapoi la lecții</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const isCompleted = completedLessons.includes(lesson.id);
  const isBookmarked = bookmarks.includes(lesson.id);

  const handleToggleCompleted = () => {
    toggleLessonCompleted(lesson.id);
    if (!isCompleted) {
      setSuccessAnimation(true);
      setTimeout(() => setSuccessAnimation(false), 3000);
    }
  };

  const handlePlaygroundSuccess = () => {
    if (!isCompleted) {
      toggleLessonCompleted(lesson.id);
      setSuccessAnimation(true);
      setTimeout(() => setSuccessAnimation(false), 3000);
    }
  };

  // Basic markdown-to-HTML parser to support clean headers, lists, code, etc.
  const renderMarkdown = (text: string) => {
    return text.split('\n\n').map((block, idx) => {
      // Headers
      if (block.startsWith('### ')) {
        return <h3 key={idx} className="font-serif text-xl font-bold text-slate-900 mt-6 mb-3">{block.replace('### ', '')}</h3>;
      }
      if (block.startsWith('#### ')) {
        return <h4 key={idx} className="font-serif text-base font-bold text-slate-800 mt-4 mb-2">{block.replace('#### ', '')}</h4>;
      }
      // Unordered Lists
      if (block.startsWith('- ') || block.startsWith('* ')) {
        return (
          <ul key={idx} className="list-disc pl-6 space-y-1.5 my-3 text-sm text-slate-700">
            {block.split('\n').map((line, lIdx) => (
              <li key={lIdx}>{line.replace(/^[-*]\s+/, '')}</li>
            ))}
          </ul>
        );
      }
      // Ordered Lists
      if (/^\d+\.\s+/.test(block)) {
        return (
          <ol key={idx} className="list-decimal pl-6 space-y-1.5 my-3 text-sm text-slate-700">
            {block.split('\n').map((line, lIdx) => (
              <li key={lIdx}>{line.replace(/^\d+\.\s+/, '')}</li>
            ))}
          </ol>
        );
      }
      // Code blocks (single or multiple lines)
      if (block.startsWith('```')) {
        const lines = block.split('\n');
        const codeContent = lines.slice(1, lines.length - 1).join('\n');
        return (
          <pre key={idx} className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs my-4 overflow-x-auto border border-slate-800">
            <code>{codeContent}</code>
          </pre>
        );
      }
      // Bold syntax parser
      const formattedBlock = block.split('**').map((chunk, cIdx) => {
        if (cIdx % 2 === 1) {
          return <strong key={cIdx} className="font-bold text-slate-950">{chunk}</strong>;
        }
        // Inline code parser inside text
        return chunk.split('`').map((subChunk, scIdx) => {
          if (scIdx % 2 === 1) {
            return <code key={scIdx} className="bg-slate-100 text-red-600 px-1 py-0.5 rounded font-mono text-xs">{subChunk}</code>;
          }
          return subChunk;
        });
      });

      return <p key={idx} className="text-sm leading-relaxed text-slate-700 my-3">{formattedBlock}</p>;
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Success banner animation */}
      {successAnimation && (
        <div className="bg-emerald-600 text-white py-3 text-center text-sm font-semibold flex items-center justify-center space-x-2 animate-fade-in">
          <Sparkles className="h-5 w-5 text-yellow-300 animate-spin" />
          <span>Felicitări! Ai completat această lecție cu succes! Progresul tău a fost actualizat.</span>
        </div>
      )}

      <main className="flex-1 mx-auto max-w-4xl w-full px-4 py-8 sm:px-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/lessons"
            className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center transition"
          >
            <ArrowLeft className="mr-1 h-4 w-4" /> Înapoi la listă
          </Link>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleBookmark(lesson.id)}
              className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition flex items-center cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-50 border-amber-200 text-amber-600'
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              <Star className={`h-4 w-4 mr-1.5 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
              {isBookmarked ? 'Salvat' : 'Salvează'}
            </button>

            <button
              onClick={handleToggleCompleted}
              className={`text-xs px-3.5 py-1.5 rounded-lg border font-bold transition flex items-center cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'bg-blue-600 border-blue-600 text-white hover:bg-blue-500'
              }`}
            >
              <CheckCircle className="h-4 w-4 mr-1.5" />
              {isCompleted ? 'Completată!' : 'Marchează ca citită'}
            </button>
          </div>
        </div>

        {/* Lesson Body */}
        <article className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
          {/* Header metadata */}
          <div className="space-y-3 mb-6 border-b border-slate-100 pb-6">
            <div className="flex items-center space-x-3 text-xs font-bold">
              <span className="bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-0.5 rounded-full">
                Clasa a {lesson.grade === '5' ? 'V-a' : lesson.grade === '6' ? 'VI-a' : lesson.grade === '7' ? 'VII-a' : 'VIII-a'}
              </span>
              <span className="text-slate-400">&bull;</span>
              <span className="text-slate-500 uppercase tracking-wider">{lesson.topic}</span>
            </div>
            
            <h1 className="font-serif text-2xl sm:text-3.5xl font-bold text-slate-950 leading-tight">
              {lesson.title}
            </h1>
            
            <p className="text-slate-500 text-sm leading-relaxed italic">
              {lesson.excerpt}
            </p>
          </div>

          {/* Main textual content parsed */}
          <div className="prose prose-slate max-w-none">
            {renderMarkdown(lesson.content)}
          </div>

          {/* Embedded Interactive Components */}
          {lesson.interactiveType && (
            <div className="mt-8 pt-8 border-t border-slate-100">
              <h3 className="font-serif text-lg font-bold text-slate-900 mb-2 flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-blue-600" />
                Activitate Interactivă
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Rezolvă cerința de mai jos pentru a-ți consolida cunoștințele teoretice din lecție.
              </p>

              {lesson.interactiveType === 'flowchart' && (
                <FlowchartVisualizer steps={lesson.interactiveData.steps} />
              )}

              {lesson.interactiveType === 'block-runner' && (
                <BlockRunner blocks={lesson.interactiveData.blocks} />
              )}

              {lesson.interactiveType === 'scratchpad' && (
                <CodePlayground
                  initialCode={lesson.interactiveData.starter}
                  expectedOutput={lesson.interactiveData.expectedOutput}
                  onSuccess={handlePlaygroundSuccess}
                />
              )}
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
