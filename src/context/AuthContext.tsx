'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
}

interface AuthContextType {
  user: User | null;
  guestMode: boolean;
  streak: number;
  completedLessons: string[];
  completedQuizzes: Record<string, number>;
  bookmarks: string[];
  login: (email: string, role: 'student' | 'teacher' | 'admin') => void;
  logout: () => void;
  setGuestMode: (val: boolean) => void;
  toggleLessonCompleted: (id: string) => void;
  saveQuizResult: (quizId: string, score: number) => void;
  toggleBookmark: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [guestMode, setGuestModeState] = useState<boolean>(true);
  const [streak, setStreak] = useState<number>(3); // start with a nice streak for demo!
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [completedQuizzes, setCompletedQuizzes] = useState<Record<string, number>>({});
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('c360_user');
    const storedGuest = localStorage.getItem('c360_guest');
    const storedStreak = localStorage.getItem('c360_streak');
    const storedLessons = localStorage.getItem('c360_completed_lessons');
    const storedQuizzes = localStorage.getItem('c360_completed_quizzes');
    const storedBookmarks = localStorage.getItem('c360_bookmarks');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setGuestModeState(false);
    } else if (storedGuest) {
      setGuestModeState(JSON.parse(storedGuest));
    }

    if (storedStreak) setStreak(Number(storedStreak));
    if (storedLessons) setCompletedLessons(JSON.parse(storedLessons));
    if (storedQuizzes) setCompletedQuizzes(JSON.parse(storedQuizzes));
    if (storedBookmarks) setBookmarks(JSON.parse(storedBookmarks));
  }, []);

  const login = (email: string, role: 'student' | 'teacher' | 'admin') => {
    const name = email.split('@')[0];
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    const newUser: User = {
      name: formattedName,
      email,
      role,
    };
    setUser(newUser);
    setGuestModeState(false);
    localStorage.setItem('c360_user', JSON.stringify(newUser));
    localStorage.setItem('c360_guest', JSON.stringify(false));
    
    // Increment streak on login
    const newStreak = streak + 1;
    setStreak(newStreak);
    localStorage.setItem('c360_streak', String(newStreak));
  };

  const logout = () => {
    setUser(null);
    setGuestModeState(true);
    localStorage.removeItem('c360_user');
    localStorage.setItem('c360_guest', JSON.stringify(true));
  };

  const setGuestMode = (val: boolean) => {
    setGuestModeState(val);
    localStorage.setItem('c360_guest', JSON.stringify(val));
    if (val) {
      setUser(null);
      localStorage.removeItem('c360_user');
    }
  };

  const toggleLessonCompleted = (id: string) => {
    setCompletedLessons((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem('c360_completed_lessons', JSON.stringify(next));
      return next;
    });
  };

  const saveQuizResult = (quizId: string, score: number) => {
    setCompletedQuizzes((prev) => {
      const next = { ...prev, [quizId]: score };
      localStorage.setItem('c360_completed_quizzes', JSON.stringify(next));
      return next;
    });
  };

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem('c360_bookmarks', JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        guestMode,
        streak,
        completedLessons,
        completedQuizzes,
        bookmarks,
        login,
        logout,
        setGuestMode,
        toggleLessonCompleted,
        saveQuizResult,
        toggleBookmark,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
