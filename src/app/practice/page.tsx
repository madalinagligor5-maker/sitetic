'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { db, Exercise } from '@/lib/db';
import { CodePlayground } from '@/components/CodePlayground';
import { Code, Flame, Award, Filter, Sparkles } from 'lucide-react';

export default function PracticePage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [completedList, setCompletedList] = useState<string[]>([]);

  useEffect(() => {
    const list = db.getExercises();
    setExercises(list);
    if (list.length > 0) {
      setSelectedExercise(list[0]);
    }

    // Load local storage completions
    const stored = localStorage.getItem('c360_completed_exercises');
    if (stored) {
      setCompletedList(JSON.parse(stored));
    }
  }, []);

  const handleSuccess = (id: string) => {
    if (!completedList.includes(id)) {
      const newList = [...completedList, id];
      setCompletedList(newList);
      localStorage.setItem('c360_completed_exercises', JSON.stringify(newList));
    }
  };

  const filteredExercises = exercises.filter((ex) => {
    const matchesGrade = selectedGrade === 'All' ? true : ex.grade === selectedGrade;
    const matchesDifficulty = selectedDifficulty === 'All' ? true : ex.difficulty === selectedDifficulty;
    return matchesGrade && matchesDifficulty;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-6 mb-8">
          <h1 className="font-serif text-3xl font-bold text-slate-900 flex items-center">
            <Code className="mr-2.5 h-8 w-8 text-blue-600" />
            Atelier de Practică
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Rezolvă probleme de logică și programare direct în browser. Alege gradul de dificultate potrivit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* List of exercises (Col 4) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Filters */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
                <Filter className="h-4 w-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Filtre</span>
              </div>

              <div className="flex gap-2">
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="flex-1 text-xs border border-slate-200 bg-slate-50 rounded-lg p-2 font-medium"
                >
                  <option value="All">Toate Clasele</option>
                  <option value="5">Clasa a V-a</option>
                  <option value="6">Clasa a VI-a</option>
                  <option value="7">Clasa a VII-a</option>
                  <option value="8">Clasa a VIII-a</option>
                </select>

                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="flex-1 text-xs border border-slate-200 bg-slate-50 rounded-lg p-2 font-medium"
                >
                  <option value="All">Dificultăți</option>
                  <option value="Usor">Ușor</option>
                  <option value="Mediu">Mediu</option>
                  <option value="Avansat">Avansat</option>
                </select>
              </div>
            </div>

            {/* List */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Seturi de Probleme</h3>
              </div>

              <div className="divide-y divide-slate-100 max-h-[450px] overflow-y-auto">
                {filteredExercises.length > 0 ? (
                  filteredExercises.map((ex) => {
                    const isSelected = selectedExercise?.id === ex.id;
                    const isCompleted = completedList.includes(ex.id);
                    
                    return (
                      <button
                        key={ex.id}
                        onClick={() => setSelectedExercise(ex)}
                        className={`w-full text-left p-4 transition-colors flex items-start justify-between cursor-pointer ${
                          isSelected ? 'bg-blue-50/40 text-blue-900' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="space-y-1 pr-2">
                          <h4 className="text-sm font-bold text-slate-800 flex items-center">
                            {ex.title}
                          </h4>
                          <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400">
                            <span>Clasa a {ex.grade}</span>
                            <span>&bull;</span>
                            <span className={
                              ex.difficulty === 'Usor' ? 'text-emerald-600' : ex.difficulty === 'Mediu' ? 'text-amber-600' : 'text-rose-600'
                            }>
                              {ex.difficulty}
                            </span>
                          </div>
                        </div>

                        {isCompleted && (
                          <span className="text-emerald-500 font-semibold text-xs shrink-0 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                            Rezolvat
                          </span>
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="p-8 text-center text-slate-400 text-xs italic">
                    Nu s-au găsit exerciții potrivite.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Playground (Col 8) */}
          <div className="lg:col-span-8">
            {selectedExercise ? (
              <div className="space-y-6">
                {/* Task Details */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{selectedExercise.topic}</span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                      selectedExercise.difficulty === 'Usor' 
                        ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                        : selectedExercise.difficulty === 'Mediu'
                        ? 'bg-amber-50 border-amber-100 text-amber-700'
                        : 'bg-rose-50 border-rose-100 text-rose-700'
                    }`}>
                      Dificultate: {selectedExercise.difficulty}
                    </span>
                  </div>

                  <h2 className="font-serif text-xl font-bold text-slate-900 mb-2">
                    {selectedExercise.title}
                  </h2>
                  
                  <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                    {selectedExercise.description}
                  </p>
                </div>

                {/* Editor Console */}
                <CodePlayground
                  initialCode={selectedExercise.starterCode || ''}
                  expectedOutput={selectedExercise.expectedOutput || ''}
                  onSuccess={() => handleSuccess(selectedExercise.id)}
                  label={`Consolă ${selectedExercise.title}`}
                />
              </div>
            ) : (
              <div className="h-[400px] border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 italic text-sm">
                Selectează o problemă din meniul din stânga pentru a începe rezolvarea.
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
