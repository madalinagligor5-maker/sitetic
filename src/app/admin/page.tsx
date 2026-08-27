'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { db, Lesson, Exercise, Quiz, PrintableResource, BlogPost } from '@/lib/db';
import { useAuth } from '@/context/AuthContext';
import { 
  Settings, 
  BookOpen, 
  Award, 
  FileText, 
  NotebookPen, 
  Plus, 
  Trash2, 
  Save, 
  ShieldAlert, 
  CheckCircle,
  Eye
} from 'lucide-react';

export default function AdminDashboard() {
  const { user, login } = useAuth();
  const [activeTab, setActiveTab] = useState<'lessons' | 'quizzes' | 'resources' | 'blog'>('lessons');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Loaded DB data states
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [resources, setResources] = useState<PrintableResource[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  // Form states
  const [lessonForm, setLessonForm] = useState<Partial<Lesson>>({
    title: '', grade: '5', topic: 'Algoritmi', excerpt: '', content: ''
  });

  const [quizForm, setQuizForm] = useState<Partial<Quiz>>({
    title: '', grade: '5', topic: 'Algoritmi', timeLimitMinutes: 15, questions: []
  });

  const [resourceForm, setResourceForm] = useState<Partial<PrintableResource>>({
    title: '', grade: '5', category: 'Fisa de lucru', description: '', fileSize: '500 KB', downloadUrl: '#'
  });

  const [blogForm, setBlogForm] = useState<Partial<BlogPost>>({
    title: '', author: '', date: new Date().toISOString().split('T')[0], category: 'Metodica', excerpt: '', content: '', readTime: '5 min'
  });

  useEffect(() => {
    setLessons(db.getLessons());
    setQuizzes(db.getQuizzes());
    setResources(db.getResources());
    setBlogPosts(db.getBlogPosts());
  }, []);

  const triggerSuccessAlert = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // Add lesson action
  const handleSaveLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonForm.title || !lessonForm.content) return;
    const newLesson: Lesson = {
      id: lessonForm.id || `l_${Date.now()}`,
      title: lessonForm.title,
      grade: lessonForm.grade as '5'|'6'|'7'|'8',
      topic: lessonForm.topic as any,
      excerpt: lessonForm.excerpt || '',
      content: lessonForm.content,
      interactiveType: lessonForm.interactiveType,
      interactiveData: lessonForm.interactiveData
    };
    const updated = db.saveLesson(newLesson);
    setLessons(updated);
    setLessonForm({ title: '', grade: '5', topic: 'Algoritmi', excerpt: '', content: '' });
    triggerSuccessAlert();
  };

  const handleDeleteLesson = (id: string) => {
    const updated = db.deleteLesson(id);
    setLessons(updated);
  };

  // Add printable resource action
  const handleSaveResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceForm.title || !resourceForm.description) return;
    const newResource: PrintableResource = {
      id: resourceForm.id || `r_${Date.now()}`,
      title: resourceForm.title,
      grade: resourceForm.grade as '5'|'6'|'7'|'8',
      category: resourceForm.category as any,
      description: resourceForm.description,
      fileSize: resourceForm.fileSize || '100 KB',
      downloadUrl: '#'
    };
    const updated = db.saveResource(newResource);
    setResources(updated);
    setResourceForm({ title: '', grade: '5', category: 'Fisa de lucru', description: '', fileSize: '500 KB', downloadUrl: '#' });
    triggerSuccessAlert();
  };

  const handleDeleteResource = (id: string) => {
    const updated = db.deleteResource(id);
    setResources(updated);
  };

  // Add Quiz Action
  const handleSaveQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizForm.title) return;
    const newQuiz: Quiz = {
      id: quizForm.id || `q_${Date.now()}`,
      title: quizForm.title,
      grade: quizForm.grade as '5'|'6'|'7'|'8',
      topic: quizForm.topic || 'Algoritmi',
      timeLimitMinutes: Number(quizForm.timeLimitMinutes) || 15,
      questions: quizForm.questions || [
        {
          id: `q_q_${Date.now()}`,
          question: 'Întrebare model: Care este cel mai simplu algoritm?',
          type: 'single',
          options: ['Căutare liniară', 'Bubble Sort', 'Bogo Sort'],
          correctAnswer: 'Căutare liniară',
          explanation: 'Căutarea liniară evaluează secvențial fiecare element.'
        }
      ]
    };
    const updated = db.saveQuiz(newQuiz);
    setQuizzes(updated);
    setQuizForm({ title: '', grade: '5', topic: 'Algoritmi', timeLimitMinutes: 15, questions: [] });
    triggerSuccessAlert();
  };

  const handleDeleteQuiz = (id: string) => {
    const updated = db.deleteQuiz(id);
    setQuizzes(updated);
  };

  // Add Blog Post Action
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.content) return;
    const newPost: BlogPost = {
      id: blogForm.id || `b_${Date.now()}`,
      title: blogForm.title,
      author: blogForm.author || 'Admin',
      date: blogForm.date || new Date().toISOString().split('T')[0],
      category: blogForm.category as any,
      excerpt: blogForm.excerpt || '',
      content: blogForm.content,
      readTime: blogForm.readTime || '5 min'
    };
    const updated = db.saveBlogPost(newPost);
    setBlogPosts(updated);
    setBlogForm({ title: '', author: '', date: new Date().toISOString().split('T')[0], category: 'Metodica', excerpt: '', content: '', readTime: '5 min' });
    triggerSuccessAlert();
  };

  const handleDeleteBlog = (id: string) => {
    const updated = db.deleteBlogPost(id);
    setBlogPosts(updated);
  };

  // Access check
  if (!user || (user.role !== 'admin' && user.role !== 'teacher')) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-12 max-w-md mx-auto text-center space-y-4">
          <ShieldAlert className="h-14 w-14 text-rose-600 animate-bounce" />
          <h2 className="font-serif text-xl font-bold text-slate-900">Acces Restricționat!</h2>
          <p className="text-sm text-slate-500">
            Această zonă (/admin) este destinată cadrelor didactice și administratorilor de sistem pentru gestionarea conținutului.
          </p>
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 text-xs w-full space-y-3">
            <p className="font-bold text-slate-700">Testare rapidă: Simulează contul de administrator</p>
            <button
              onClick={() => login('profesor.gimnaziu@catalog360.ro', 'admin')}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-lg w-full transition cursor-pointer"
            >
              Autentificare ca Administrator
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {saveSuccess && (
        <div className="bg-emerald-600 text-white py-3 text-center text-sm font-semibold flex items-center justify-center space-x-2 animate-fade-in">
          <CheckCircle className="h-5 w-5 text-yellow-300" />
          <span>Modificările au fost salvate cu succes în baza de date locală!</span>
        </div>
      )}

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-6 mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-slate-900 flex items-center">
              <Settings className="mr-2.5 h-8 w-8 text-blue-600" />
              Panou de Administrare Conținut
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Adaugă, editează sau șterge resurse didactice, lecții, întrebări și postări pe blog.
            </p>
          </div>
        </div>

        {/* CMS Tabs Control */}
        <div className="flex border-b border-slate-200 mb-8 space-x-4">
          <button
            onClick={() => setActiveTab('lessons')}
            className={`pb-3 text-sm font-bold border-b-2 transition flex items-center cursor-pointer ${
              activeTab === 'lessons' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <BookOpen className="h-4.5 w-4.5 mr-1.5" /> Lecții
          </button>
          <button
            onClick={() => setActiveTab('quizzes')}
            className={`pb-3 text-sm font-bold border-b-2 transition flex items-center cursor-pointer ${
              activeTab === 'quizzes' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Award className="h-4.5 w-4.5 mr-1.5" /> Chestionare
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`pb-3 text-sm font-bold border-b-2 transition flex items-center cursor-pointer ${
              activeTab === 'resources' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <FileText className="h-4.5 w-4.5 mr-1.5" /> Fișe PDF
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`pb-3 text-sm font-bold border-b-2 transition flex items-center cursor-pointer ${
              activeTab === 'blog' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <NotebookPen className="h-4.5 w-4.5 mr-1.5" /> Blog
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Editor (Col 7) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            {activeTab === 'lessons' && (
              <form onSubmit={handleSaveLesson} className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center border-b border-slate-100 pb-2">
                  <Plus className="mr-1.5 h-5 w-5 text-blue-600" /> Adaugă Lecție Nouă
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Clasă</label>
                    <select
                      value={lessonForm.grade}
                      onChange={(e) => setLessonForm({ ...lessonForm, grade: e.target.value as any })}
                      className="w-full text-sm border border-slate-200 bg-slate-50 rounded-lg p-2 font-medium"
                    >
                      <option value="5">Clasa a V-a</option>
                      <option value="6">Clasa a VI-a</option>
                      <option value="7">Clasa a VII-a</option>
                      <option value="8">Clasa a VIII-a</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Topic</label>
                    <select
                      value={lessonForm.topic}
                      onChange={(e) => setLessonForm({ ...lessonForm, topic: e.target.value as any })}
                      className="w-full text-sm border border-slate-200 bg-slate-50 rounded-lg p-2 font-medium"
                    >
                      <option value="Algoritmi">Algoritmi</option>
                      <option value="Scratch">Scratch</option>
                      <option value="Limbaje Text">Limbaje Text</option>
                      <option value="Instrumente TIC">Instrumente TIC</option>
                      <option value="Cetatenie Digitala">Cetatenie Digitala</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Titlu Lecție</label>
                  <input
                    type="text"
                    required
                    value={lessonForm.title}
                    onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                    className="w-full text-sm border border-slate-200 bg-white rounded-lg p-2.5 outline-none focus:border-blue-500"
                    placeholder="ex: Introducere în structuri logice..."
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Rezumat (Excerpt)</label>
                  <textarea
                    rows={2}
                    value={lessonForm.excerpt}
                    onChange={(e) => setLessonForm({ ...lessonForm, excerpt: e.target.value })}
                    className="w-full text-sm border border-slate-200 bg-white rounded-lg p-2.5 outline-none focus:border-blue-500"
                    placeholder="Scurtă prezentare a lecției afișată în pagină..."
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Conținut Curs (Markdown/text)</label>
                  <textarea
                    rows={7}
                    required
                    value={lessonForm.content}
                    onChange={(e) => setLessonForm({ ...lessonForm, content: e.target.value })}
                    className="w-full text-sm border border-slate-200 bg-white rounded-lg p-2.5 outline-none font-mono focus:border-blue-500"
                    placeholder="### Titlu Secțiune&#10;- Bullet list&#10;**Bold text**..."
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-2.5 rounded-lg flex items-center transition shadow cursor-pointer"
                >
                  <Save className="h-4 w-4 mr-1.5" /> Salvează Lecția
                </button>
              </form>
            )}

            {activeTab === 'quizzes' && (
              <form onSubmit={handleSaveQuiz} className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center border-b border-slate-100 pb-2">
                  <Plus className="mr-1.5 h-5 w-5 text-blue-600" /> Adaugă Test Nou
                </h3>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Clasă</label>
                    <select
                      value={quizForm.grade}
                      onChange={(e) => setQuizForm({ ...quizForm, grade: e.target.value as any })}
                      className="w-full text-sm border border-slate-200 bg-slate-50 rounded-lg p-2 font-medium"
                    >
                      <option value="5">Clasa a V-a</option>
                      <option value="6">Clasa a VI-a</option>
                      <option value="7">Clasa a VII-a</option>
                      <option value="8">Clasa a VIII-a</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Topic</label>
                    <input
                      type="text"
                      required
                      value={quizForm.topic}
                      onChange={(e) => setQuizForm({ ...quizForm, topic: e.target.value })}
                      className="w-full text-sm border border-slate-200 bg-white rounded-lg p-2 outline-none focus:border-blue-500"
                      placeholder="Scratch / Algoritmi"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Limită Timp (min)</label>
                    <input
                      type="number"
                      required
                      value={quizForm.timeLimitMinutes}
                      onChange={(e) => setQuizForm({ ...quizForm, timeLimitMinutes: Number(e.target.value) })}
                      className="w-full text-sm border border-slate-200 bg-white rounded-lg p-2 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Nume Chestionar / Evaluare</label>
                  <input
                    type="text"
                    required
                    value={quizForm.title}
                    onChange={(e) => setQuizForm({ ...quizForm, title: e.target.value })}
                    className="w-full text-sm border border-slate-200 bg-white rounded-lg p-2.5 outline-none focus:border-blue-500"
                    placeholder="ex: Test Evaluare Inițială..."
                  />
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
                  <p className="font-bold text-slate-700">Notă Structură Test:</p>
                  <p className="text-slate-500">Pentru simplitate în varianta demo, noul test va fi generat cu un set predefinit de 2 întrebări grilă bazate pe topicul selectat.</p>
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-2.5 rounded-lg flex items-center transition shadow cursor-pointer"
                >
                  <Save className="h-4 w-4 mr-1.5" /> Salvează Testul
                </button>
              </form>
            )}

            {activeTab === 'resources' && (
              <form onSubmit={handleSaveResource} className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center border-b border-slate-100 pb-2">
                  <Plus className="mr-1.5 h-5 w-5 text-blue-600" /> Încarcă Fișă Lucru
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Clasă</label>
                    <select
                      value={resourceForm.grade}
                      onChange={(e) => setResourceForm({ ...resourceForm, grade: e.target.value as any })}
                      className="w-full text-sm border border-slate-200 bg-slate-50 rounded-lg p-2 font-medium"
                    >
                      <option value="5">Clasa a V-a</option>
                      <option value="6">Clasa a VI-a</option>
                      <option value="7">Clasa a VII-a</option>
                      <option value="8">Clasa a VIII-a</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Categorie Fișier</label>
                    <select
                      value={resourceForm.category}
                      onChange={(e) => setResourceForm({ ...resourceForm, category: e.target.value as any })}
                      className="w-full text-sm border border-slate-200 bg-slate-50 rounded-lg p-2 font-medium"
                    >
                      <option value="Fisa de lucru">Fișă de lucru</option>
                      <option value="Barem de corectare">Barem de corectare</option>
                      <option value="Manual">Manual didactic</option>
                      <option value="Schema recapitulativa">Schemă recapitulativă</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Denumire Document</label>
                    <input
                      type="text"
                      required
                      value={resourceForm.title}
                      onChange={(e) => setResourceForm({ ...resourceForm, title: e.target.value })}
                      className="w-full text-sm border border-slate-200 bg-white rounded-lg p-2 outline-none focus:border-blue-500"
                      placeholder="ex: Fișă recapitulativă bucle..."
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Dimensiune (ex: 450 KB)</label>
                    <input
                      type="text"
                      required
                      value={resourceForm.fileSize}
                      onChange={(e) => setResourceForm({ ...resourceForm, fileSize: e.target.value })}
                      className="w-full text-sm border border-slate-200 bg-white rounded-lg p-2 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Descriere Resursă</label>
                  <textarea
                    rows={3}
                    required
                    value={resourceForm.description}
                    onChange={(e) => setResourceForm({ ...resourceForm, description: e.target.value })}
                    className="w-full text-sm border border-slate-200 bg-white rounded-lg p-2.5 outline-none focus:border-blue-500"
                    placeholder="Descrie cerințele incluse în document..."
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-2.5 rounded-lg flex items-center transition shadow cursor-pointer"
                >
                  <Save className="h-4 w-4 mr-1.5" /> Salvează Resursa
                </button>
              </form>
            )}

            {activeTab === 'blog' && (
              <form onSubmit={handleSaveBlog} className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center border-b border-slate-100 pb-2">
                  <Plus className="mr-1.5 h-5 w-5 text-blue-600" /> Scrie Articol Blog
                </h3>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Autor</label>
                    <input
                      type="text"
                      required
                      value={blogForm.author}
                      onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                      className="w-full text-sm border border-slate-200 bg-white rounded-lg p-2 outline-none focus:border-blue-500"
                      placeholder="Nume profesor..."
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Categorie</label>
                    <select
                      value={blogForm.category}
                      onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value as any })}
                      className="w-full text-sm border border-slate-200 bg-slate-50 rounded-lg p-2 font-medium"
                    >
                      <option value="Metodica">Metodică</option>
                      <option value="Olimpiade">Olimpiade</option>
                      <option value="Noutati">Noutăți</option>
                      <option value="Ghiduri">Ghiduri</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Timp citire (ex: 5 min)</label>
                    <input
                      type="text"
                      required
                      value={blogForm.readTime}
                      onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                      className="w-full text-sm border border-slate-200 bg-white rounded-lg p-2 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Titlu Articol</label>
                  <input
                    type="text"
                    required
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    className="w-full text-sm border border-slate-200 bg-white rounded-lg p-2.5 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Excerpt (Scurtă prezentare)</label>
                  <textarea
                    rows={2}
                    required
                    value={blogForm.excerpt}
                    onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                    className="w-full text-sm border border-slate-200 bg-white rounded-lg p-2.5 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Conținutul Articolului (HTML admis)</label>
                  <textarea
                    rows={5}
                    required
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    className="w-full text-sm border border-slate-200 bg-white rounded-lg p-2.5 outline-none focus:border-blue-500"
                    placeholder="<p>Introdu textul articolului aici...</p>"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-2.5 rounded-lg flex items-center transition shadow cursor-pointer"
                >
                  <Save className="h-4 w-4 mr-1.5" /> Publică Articolul
                </button>
              </form>
            )}
          </div>

          {/* Directory lists (Col 5) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col h-[580px] overflow-hidden">
            <h3 className="font-serif text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">
              Resurse înregistrate ({
                activeTab === 'lessons' ? lessons.length :
                activeTab === 'quizzes' ? quizzes.length :
                activeTab === 'resources' ? resources.length :
                blogPosts.length
              })
            </h3>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {activeTab === 'lessons' && lessons.map((les) => (
                <div key={les.id} className="p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition flex items-center justify-between">
                  <div className="space-y-0.5 max-w-[80%]">
                    <p className="text-xs font-bold text-slate-800 truncate">{les.title}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">Clasa a {les.grade} &bull; {les.topic}</p>
                  </div>
                  <button 
                    onClick={() => handleDeleteLesson(les.id)}
                    className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}

              {activeTab === 'quizzes' && quizzes.map((q) => (
                <div key={q.id} className="p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition flex items-center justify-between">
                  <div className="space-y-0.5 max-w-[80%]">
                    <p className="text-xs font-bold text-slate-800 truncate">{q.title}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">Clasa a {q.grade} &bull; {q.topic} &bull; {q.timeLimitMinutes} min</p>
                  </div>
                  <button 
                    onClick={() => handleDeleteQuiz(q.id)}
                    className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}

              {activeTab === 'resources' && resources.map((res) => (
                <div key={res.id} className="p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition flex items-center justify-between">
                  <div className="space-y-0.5 max-w-[80%]">
                    <p className="text-xs font-bold text-slate-800 truncate">{res.title}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">Clasa a {res.grade} &bull; {res.category} &bull; {res.fileSize}</p>
                  </div>
                  <button 
                    onClick={() => handleDeleteResource(res.id)}
                    className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}

              {activeTab === 'blog' && blogPosts.map((post) => (
                <div key={post.id} className="p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition flex items-center justify-between">
                  <div className="space-y-0.5 max-w-[80%]">
                    <p className="text-xs font-bold text-slate-800 truncate">{post.title}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">{post.author} &bull; {post.date}</p>
                  </div>
                  <button 
                    onClick={() => handleDeleteBlog(post.id)}
                    className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
