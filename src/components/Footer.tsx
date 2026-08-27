import React from 'react';
import Link from 'next/link';
import { Award, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Platform Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="rounded-lg bg-blue-600 p-2 text-white">
                <Award className="h-5 w-5" />
              </div>
              <span className="font-serif text-lg font-bold tracking-tight text-white">
                catalog<span className="text-blue-400">360</span>.ro
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Platformă educațională digitală dedicată orelor de Informatică și TIC din ciclul gimnazial din România. Creată pentru a aduce învățarea interactivă direct în clase.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-sm font-semibold text-slate-200 tracking-wider uppercase mb-4">Materia pe Clase</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/lessons?grade=5" className="hover:text-white transition-colors">Clasa a V-a (Introducere, Scratch)</Link>
              </li>
              <li>
                <Link href="/lessons?grade=6" className="hover:text-white transition-colors">Clasa a VI-a (Structuri, Word)</Link>
              </li>
              <li>
                <Link href="/lessons?grade=7" className="hover:text-white transition-colors">Clasa a VII-a (Python, Excel)</Link>
              </li>
              <li>
                <Link href="/lessons?grade=8" className="hover:text-white transition-colors">Clasa a VIII-a (Prezentări, Proiecte)</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-serif text-sm font-semibold text-slate-200 tracking-wider uppercase mb-4">Resurse Utile</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/practice" className="hover:text-white transition-colors">Exerciții Practice</Link>
              </li>
              <li>
                <Link href="/quizzes" className="hover:text-white transition-colors">Teste Evaluare</Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white transition-colors">Fișe PDF & Bareme</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">Ghiduri Metodice & Știri</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="font-serif text-sm font-semibold text-slate-200 tracking-wider uppercase mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span>contact@catalog360.ro</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span>+40 700 000 000</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span>București, România</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs">
          <p>&copy; {new Date().getFullYear()} catalog360.ro. Toate drepturile rezervate conform programei școlare oficiale M.E.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer">Termeni și Condiții</span>
            <span className="hover:text-white cursor-pointer">Politică de Confidențialitate</span>
            <span className="hover:text-white cursor-pointer">ANPC</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
