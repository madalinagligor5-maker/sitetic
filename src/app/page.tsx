'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { 
  BookOpen, 
  Code, 
  Award, 
  FileText, 
  ArrowRight, 
  Laptop, 
  GraduationCap, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { guestMode, user } = useAuth();

  const gradeSyllabus = [
    {
      grade: 'Clasa a V-a',
      color: 'border-blue-500 text-blue-600 bg-blue-50/50',
      description: 'Primii pași în lumea tehnologiei. Trecerea de la utilizator la creator.',
      topics: ['Ce este un Algoritm?', 'Scratch: Blocuri Grafice', 'Structura Calculatorului', 'Siguranța pe Internet']
    },
    {
      grade: 'Clasa a VI-a',
      color: 'border-indigo-500 text-indigo-600 bg-indigo-50/50',
      description: 'Dezvoltarea logicii de programare și editarea primelor documente text.',
      topics: ['Structuri repetitive și decizii', 'Scratch avansat: Variabile', 'Procesarea textului (Word)', 'Colaborare Online']
    },
    {
      grade: 'Clasa a VII-a',
      color: 'border-purple-500 text-purple-600 bg-purple-50/50',
      description: 'Tranziția la programarea bazată pe text și gestionarea datelor în tabele.',
      topics: ['Introducere în Python', 'Variabile și operații text', 'Tabele de calcul (Excel)', 'Formule și grafice simple']
    },
    {
      grade: 'Clasa a VIII-a',
      color: 'border-emerald-500 text-emerald-600 bg-emerald-50/50',
      description: 'Realizarea de proiecte digitale complexe și pregătirea pentru liceu.',
      topics: ['Algoritmi Python complecși', 'Noțiuni de bază HTML', 'Prezentări multimedia interactive', 'Recapitulare și Bareme Evaluare']
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-sm font-semibold text-blue-400">
                <Laptop className="h-4 w-4" />
                <span>Educație Digitală conform Programei Școlare</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Învață Informatică & TIC interactiv.
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                O platformă modernă dedicată elevilor de gimnaziu (clasele V-VIII). Lecții modulare de programare Scratch și Python, exerciții cu validare live și fișe de lucru printabile.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/lessons"
                  className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg hover:bg-blue-500 transition flex items-center"
                >
                  Explorează Lecțiile
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/quizzes"
                  className="rounded-lg border border-slate-700 bg-slate-800/50 px-6 py-3 font-semibold text-slate-200 hover:bg-slate-800 transition"
                >
                  Testează-te Online
                </Link>
              </div>
            </div>

            {/* Visual preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-[400px] rounded-2xl border border-slate-700 bg-slate-950 p-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex space-x-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">algoritm.py</span>
                </div>
                
                <div className="space-y-3 font-mono text-xs text-slate-300">
                  <p className="text-slate-500"># Verifică nota la TIC</p>
                  <p><span className="text-purple-400">nota</span> = 9</p>
                  <p><span className="text-purple-400">proiect_predat</span> = <span className="text-amber-400">True</span></p>
                  <br />
                  <p><span className="text-blue-400">if</span> nota &gt;= 5 <span className="text-blue-400">and</span> proiect_predat:</p>
                  <p className="pl-4 text-emerald-400">print(<span className="text-slate-100">"Bravo! Te-ai descurcat excelent! 🎉"</span>)</p>
                  <p><span className="text-blue-400">else</span>:</p>
                  <p className="pl-4 text-red-400">print(<span className="text-slate-100">"Mai încearcă o dată!"</span>)</p>
                </div>

                <div className="mt-6 border-t border-slate-800 pt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-sans">Rezultatul rulării:</span>
                  <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded font-semibold">
                    Bravo! Te-ai descurcat excelent! 🎉
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Badges */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600 shrink-0">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Lecții Interactive</h3>
                <p className="text-xs text-slate-500">Explicații grafice pas cu pas</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 shrink-0">
                <Code className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Exerciții Practice</h3>
                <p className="text-xs text-slate-500">Consolă de programare inclusă</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-50 rounded-xl text-purple-600 shrink-0">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Evaluare Instantă</h3>
                <p className="text-xs text-slate-500">Teste cu feedback pe loc</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 shrink-0">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Fișe PDF / Bareme</h3>
                <p className="text-xs text-slate-500">Descărcare rapidă pentru clasă</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-950">
              Structura Programei Școlare (Clasele V–VIII)
            </h2>
            <p className="text-slate-600">
              Conținut didactic atent conceput în conformitate cu curriculumul național de Informatică și TIC aprobat de Ministerul Educației.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {gradeSyllabus.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition duration-300"
              >
                <div>
                  <span className={`inline-block border px-3 py-1 rounded-full text-xs font-bold ${item.color} mb-4`}>
                    {item.grade}
                  </span>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="border-t border-slate-100 pt-4 space-y-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Subiecte cheie:</h4>
                    {item.topics.map((t, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100">
                  <Link
                    href={`/lessons?grade=${idx + 5}`}
                    className="text-xs font-bold text-blue-600 hover:text-blue-500 flex items-center group"
                  >
                    Începe Studiul
                    <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-0.5 transition" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Access Explanation */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-900 text-white p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:32px_32px] opacity-15"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Alege modul în care dorești să utilizezi catalog360.ro
                </h2>
                <p className="text-slate-300 max-w-3xl text-sm leading-relaxed">
                  Platforma este disponibilă atât pentru navigare liberă (Guest Mode - fără cont) cât și pentru urmărirea activă a progresului prin crearea unui cont gratuit.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-2">
                    <h3 className="font-serif text-md font-bold text-white flex items-center">
                      <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                      Mod Vizitator (Fără Cont)
                    </h3>
                    <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
                      <li>Acces integral la toate lecțiile teoretice.</li>
                      <li>Rezolvarea exercițiilor direct în consolă.</li>
                      <li>Descărcarea rapidă a fișelor de lucru PDF.</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-md font-bold text-emerald-400 flex items-center">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
                      Cont Personal (Conectat)
                    </h3>
                    <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
                      <li>Salvarea progresului pe lecții și capitole.</li>
                      <li>Urmărirea streak-ului de studiu consecutiv.</li>
                      <li>Salvarea rezultatelor obținute la teste.</li>
                      <li>Bookmarks / Salvarea resurselor preferate.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center space-y-4">
                {guestMode && !user ? (
                  <div className="bg-slate-800/80 border border-slate-700/50 p-6 rounded-2xl w-full text-center">
                    <ShieldCheck className="mx-auto h-8 w-8 text-blue-400 mb-2" />
                    <p className="text-xs text-slate-300 mb-4">Navighezi momentan în modul Vizitator.</p>
                    <button
                      onClick={() => {
                        const event = new CustomEvent('show-sim-modal');
                        window.dispatchEvent(event);
                        // Trigger showSimModal in Header or toggle simulation manually by checking Context
                      }}
                      className="w-full rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-2 shadow transition cursor-pointer"
                    >
                      Apasă "Conectare" în Header
                    </button>
                  </div>
                ) : (
                  <div className="bg-emerald-950/40 border border-emerald-500/20 p-6 rounded-2xl w-full text-center">
                    <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-400 mb-2" />
                    <p className="text-xs text-emerald-300 mb-2">Conectat ca {user?.name}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">{user?.role}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
