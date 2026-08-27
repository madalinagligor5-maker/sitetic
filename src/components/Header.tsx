'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  BookOpen, 
  Code, 
  FileText, 
  Award, 
  Flame, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X, 
  Settings,
  ShieldCheck
} from 'lucide-react';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { user, guestMode, streak, login, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSimModal, setShowSimModal] = useState(false);

  const navItems = [
    { name: 'Lecții', href: '/lessons', icon: BookOpen },
    { name: 'Practică', href: '/practice', icon: Code },
    { name: 'Teste & Evaluare', href: '/quizzes', icon: Award },
    { name: 'Fișe PDF', href: '/resources', icon: FileText },
    { name: 'Blog', href: '/blog', icon: FileText },
  ];

  const handleSimLogin = (role: 'student' | 'teacher' | 'admin') => {
    login(`profesor.gimnaziu@catalog360.ro`, role);
    setShowSimModal(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-slate-900 text-white shadow-sm">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="rounded-lg bg-blue-600 p-2 text-white">
            <Award className="h-6 w-6" />
          </div>
          <span className="font-serif text-xl font-bold tracking-tight text-white">
            catalog<span className="text-blue-400">360</span>.ro
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-1.5 text-sm font-medium transition-colors hover:text-blue-400 ${
                  isActive ? 'text-blue-400 border-b-2 border-blue-500 pb-1 -mb-1.5' : 'text-slate-300'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Auth / Streak State */}
        <div className="hidden md:flex items-center space-x-4">
          {!guestMode && user ? (
            <>
              {/* Streak info */}
              <div className="flex items-center space-x-1 rounded-full bg-slate-800 px-3 py-1 text-sm font-semibold text-orange-400 border border-orange-500/20" title="Zile de studiu consecutive!">
                <Flame className="h-4 w-4 fill-orange-500" />
                <span>{streak} zile</span>
              </div>

              {/* User Dropdown / Role Info */}
              <div className="flex items-center space-x-2">
                <div className="flex flex-col text-right">
                  <span className="text-xs font-semibold text-slate-200">{user.name}</span>
                  <span className={`text-[10px] uppercase font-bold tracking-wider ${
                    user.role === 'admin' || user.role === 'teacher' ? 'text-emerald-400' : 'text-blue-400'
                  }`}>
                    {user.role === 'admin' ? 'Admin' : user.role === 'teacher' ? 'Profesor' : 'Elev'}
                  </span>
                </div>
                
                {/* Admin Quick Entry */}
                {(user.role === 'admin' || user.role === 'teacher') && (
                  <Link
                    href="/admin"
                    className="rounded bg-slate-800 p-1.5 hover:bg-slate-700 transition-colors text-slate-300"
                    title="Panou Administrare"
                  >
                    <Settings className="h-4 w-4" />
                  </Link>
                )}

                <button
                  onClick={logout}
                  className="rounded-full bg-slate-800 p-1.5 hover:bg-red-950/40 hover:text-red-400 transition-colors text-slate-300"
                  title="Deconectare"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400">Mod Vizitator</span>
              <button
                onClick={() => setShowSimModal(true)}
                className="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white shadow hover:bg-blue-500 transition-all cursor-pointer"
              >
                Conectare
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center space-x-2">
          {/* Quick Admin simulation trigger */}
          <button 
            onClick={() => setShowSimModal(true)} 
            className="text-xs text-blue-400 border border-blue-500/30 rounded px-2 py-1 font-medium bg-slate-800"
          >
            Simulări
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 py-3 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 rounded-lg py-2 px-3 text-sm font-medium hover:bg-slate-800 text-slate-200"
              >
                <item.icon className="h-4 w-4 text-blue-400" />
                <span>{item.name}</span>
              </Link>
            ))}
            {!guestMode && user && (user.role === 'admin' || user.role === 'teacher') && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 rounded-lg py-2 px-3 text-sm font-medium hover:bg-slate-800 text-emerald-400"
              >
                <Settings className="h-4 w-4" />
                <span>Panou Administrare</span>
              </Link>
            )}
          </nav>
          
          {/* Mobile Auth State */}
          <div className="border-t border-slate-800 pt-3">
            {!guestMode && user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-blue-400 text-sm">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-200">{user.name}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">{user.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="flex items-center text-xs text-orange-400 font-semibold bg-slate-800 px-2.5 py-1 rounded-full">
                    <Flame className="h-3.5 w-3.5 mr-0.5 fill-orange-500" /> {streak}d
                  </span>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-red-400 hover:text-red-300 text-xs p-1"
                  >
                    Deconectare
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setShowSimModal(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center rounded-lg bg-blue-600 py-2 text-sm font-semibold hover:bg-blue-500 cursor-pointer"
              >
                Conectare
              </button>
            )}
          </div>
        </div>
      )}

      {/* Simulation Modal (Makes testing easy) */}
      {showSimModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl border border-slate-100 text-slate-900 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif text-lg font-bold flex items-center text-slate-950">
                <ShieldCheck className="mr-2 h-5 w-5 text-blue-600" />
                Simulare Autentificare
              </h3>
              <button onClick={() => setShowSimModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <p className="my-4 text-sm text-slate-600 leading-relaxed">
              Deoarece platforma rulează în mod demonstrativ cu o bază de date simulată, alege profilul de utilizator pe care dorești să îl testezi:
            </p>

            <div className="space-y-3">
              <button
                onClick={() => handleSimLogin('student')}
                className="flex w-full items-center justify-between rounded-lg border border-slate-200 p-3 hover:bg-slate-50 transition-colors text-left"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Profil Elev</h4>
                  <p className="text-xs text-slate-500">Vizualizează streaks, marchează lecții completate, salvează teste.</p>
                </div>
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded font-semibold">Elev</span>
              </button>

              <button
                onClick={() => handleSimLogin('teacher')}
                className="flex w-full items-center justify-between rounded-lg border border-slate-200 p-3 hover:bg-slate-50 transition-colors text-left"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Profil Profesor</h4>
                  <p className="text-xs text-slate-500">Drepturi complete de vizualizare, acces la panoul de administrare.</p>
                </div>
                <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded font-semibold">Profesor</span>
              </button>

              <button
                onClick={() => handleSimLogin('admin')}
                className="flex w-full items-center justify-between rounded-lg border border-slate-200 p-3 hover:bg-slate-50 transition-colors text-left"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Profil Administrator</h4>
                  <p className="text-xs text-slate-500">Control total asupra conținutului (Lecții, Întrebări, Articole Blog, Fișe PDF).</p>
                </div>
                <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded font-semibold">Admin</span>
              </button>
            </div>

            <div className="mt-5 border-t border-slate-100 pt-4 flex justify-between items-center text-xs">
              <button
                onClick={() => {
                  logout();
                  setShowSimModal(false);
                }}
                className="text-slate-500 hover:text-slate-700 underline font-medium"
              >
                Intră ca Vizitator (Fără cont)
              </button>
              <button
                onClick={() => setShowSimModal(false)}
                className="bg-slate-100 text-slate-800 hover:bg-slate-200 rounded-lg px-4 py-2 font-medium"
              >
                Închide
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
