'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { db, PrintableResource } from '@/lib/db';
import { FileText, Download, Eye, Search, Filter, Printer, X, GraduationCap, School } from 'lucide-react';

export default function ResourcesPage() {
  const [resources, setResources] = useState<PrintableResource[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Preview modal states
  const [previewResource, setPreviewResource] = useState<PrintableResource | null>(null);

  useEffect(() => {
    setResources(db.getResources());
  }, []);

  const categories = ['All', 'Fisa de lucru', 'Barem de corectare', 'Manual', 'Schema recapitulativa'];

  const filteredResources = resources.filter((res) => {
    const matchesGrade = selectedGrade === 'All' ? true : res.grade === selectedGrade;
    const matchesCategory = selectedCategory === 'All' ? true : res.category === selectedCategory;
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          res.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGrade && matchesCategory && matchesSearch;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-6 mb-8 gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-slate-900 flex items-center">
              <FileText className="mr-2.5 h-8 w-8 text-blue-600" />
              Fișe de Lucru & PDF-uri
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Descarcă resurse teoretice, fișe practice pentru clasă și bareme de corectare.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-85">
            <input
              type="text"
              placeholder="Caută fișe, manuale, bareme..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                <Filter className="h-4.5 w-4.5 text-blue-600" />
                <h3 className="font-serif text-sm font-bold text-slate-800">Filtrează Fișiere</h3>
              </div>

              {/* Class selector */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Clasă</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {['All', '5', '6', '7', '8'].map((grade) => (
                    <button
                      key={grade}
                      onClick={() => setSelectedGrade(grade)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg border font-semibold transition cursor-pointer ${
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

              {/* Categories list */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Categorie</label>
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
                      <span>{cat === 'All' ? 'Toate' : cat}</span>
                      {selectedCategory === cat && <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* List display */}
          <div className="lg:col-span-3">
            {filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredResources.map((res) => (
                  <div
                    key={res.id}
                    className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm transition flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                          Clasa a {res.grade === '5' ? 'V-a' : res.grade === '6' ? 'VI-a' : res.grade === '7' ? 'VII-a' : 'VIII-a'}
                        </span>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          {res.category}
                        </span>
                      </div>

                      <h3 className="font-serif text-base font-bold text-slate-900 leading-snug">{res.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{res.description}</p>
                    </div>

                    <div className="border-t border-slate-100 pt-4 mt-6 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">{res.fileSize}</span>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setPreviewResource(res)}
                          className="text-slate-600 bg-slate-50 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 font-bold px-3 py-1.5 rounded-lg flex items-center transition cursor-pointer"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Prevualizează
                        </button>
                        
                        <a
                          href={res.downloadUrl}
                          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-1.5 rounded-lg flex items-center transition cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            alert(`Descărcare inițiată pentru fișierul: "${res.title}" (${res.fileSize}). Fișierul a fost salvat local.`);
                          }}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Descarcă
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">
                <FileText className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                <p className="font-bold text-slate-700">Nu am găsit nicio resursă.</p>
                <p className="text-xs mt-1">Modifică criteriile de filtrare pentru a obține rezultate.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Printable Preview Modal */}
      {previewResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-3xl rounded-xl bg-white shadow-2xl border border-slate-100 text-slate-900 flex flex-col my-8 max-h-[90vh]">
            {/* Modal Controls */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Vizualizare Fișă Lucru</span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePrint}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center shadow transition cursor-pointer"
                >
                  <Printer className="h-4 w-4 mr-1.5" />
                  Printează Fișa
                </button>
                <button 
                  onClick={() => setPreviewResource(null)} 
                  className="text-slate-400 hover:text-slate-600 bg-slate-50 p-1.5 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Document body (Designed to look like real A4 print sheet) */}
            <div className="flex-1 overflow-y-auto p-8 sm:p-12 bg-slate-50">
              <div 
                id="printable-area" 
                className="bg-white border border-slate-200 shadow-md p-10 max-w-[210mm] mx-auto min-h-[297mm] text-slate-950 font-serif leading-relaxed flex flex-col justify-between"
              >
                {/* Header emblem */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between border-b-2 border-slate-950 pb-4">
                    <div className="flex items-center space-x-2">
                      <School className="h-10 w-10 text-slate-800" />
                      <div className="font-sans text-left">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-900">Ministerul Educației Naționale</p>
                        <p className="text-[10px] text-slate-500 uppercase">Școala Gimnazială catalog360.ro</p>
                      </div>
                    </div>
                    <div className="text-right font-sans text-xs">
                      <p><span className="font-semibold text-slate-500">Disciplina:</span> Informatica & TIC</p>
                      <p><span className="font-semibold text-slate-500">Clasa:</span> a {previewResource.grade === '5' ? 'V-a' : previewResource.grade === '6' ? 'VI-a' : previewResource.grade === '7' ? 'VII-a' : 'VIII-a'}</p>
                    </div>
                  </div>

                  {/* Title & metadata */}
                  <div className="text-center py-6">
                    <h2 className="text-xl font-bold uppercase underline tracking-wider">{previewResource.title}</h2>
                    <p className="text-xs italic font-sans text-slate-500 mt-1">{previewResource.category}</p>
                  </div>

                  {/* Fields for student info */}
                  <div className="grid grid-cols-2 gap-6 text-sm font-sans my-4 border border-dashed border-slate-300 p-4 rounded bg-slate-50/20">
                    <p><span className="font-bold text-slate-500">Nume Elev:</span> ________________________</p>
                    <p><span className="font-bold text-slate-500">Data:</span> ___________________</p>
                  </div>

                  {/* Content details */}
                  <div className="space-y-6 mt-8 font-sans text-sm leading-relaxed text-left">
                    <div className="space-y-2">
                      <h3 className="font-serif font-bold text-base border-b border-slate-200 pb-1">Obiective practice:</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{previewResource.description}</p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-serif font-bold text-base border-b border-slate-200 pb-1">Exerciții Cerințe:</h3>
                      
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <p className="font-bold">Subiectul I (30 puncte)</p>
                          <p className="text-xs text-slate-700">Explicați în maxim 3 fraze conceptul descris în această fișă și exemplificați o situație cotidiană similară.</p>
                          <div className="h-16 border-b border-dashed border-slate-300 mt-2"></div>
                        </div>

                        <div className="space-y-1">
                          <p className="font-bold">Subiectul II (40 puncte)</p>
                          <p className="text-xs text-slate-700">Scrieți pseudocodul sau pașii elementari pentru algoritmul reprezentativ asociat fișei, respectând condițiile de finitudine și claritate.</p>
                          <div className="h-28 border-b border-dashed border-slate-300 mt-2"></div>
                        </div>

                        <div className="space-y-1">
                          <p className="font-bold">Subiectul III (20 puncte)</p>
                          <p className="text-xs text-slate-700">Identificați erorile din exemplul de cod prezentat în manualul clasei tale și corectați-le pe liniile punctate.</p>
                          <div className="h-16 border-b border-dashed border-slate-300 mt-2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer and evaluation note */}
                <div className="border-t border-slate-400 pt-4 mt-12 text-center text-[10px] font-sans text-slate-500">
                  <p>Notă: Se acordă 10 puncte din oficiu. Toate subiectele sunt obligatorii. Timp efectiv de lucru: 50 minute.</p>
                  <p className="mt-1">&copy; catalog360.ro. Toate drepturile rezervate conform programei aprobate M.E.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
