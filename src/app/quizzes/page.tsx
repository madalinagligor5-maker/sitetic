'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { db, Quiz, QuizQuestion } from '@/lib/db';
import { useAuth } from '@/context/AuthContext';
import { 
  Award, 
  Clock, 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export default function QuizzesPage() {
  const { saveQuizResult, completedQuizzes, user } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  
  // Quiz running states
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    setQuizzes(db.getQuizzes());
  }, []);

  // Timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      finishQuiz();
    }
    return () => clearInterval(interval);
  }, [timeLeft, timerActive]);

  const startQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setQuizFinished(false);
    setScore(0);
    setTimeLeft(quiz.timeLimitMinutes * 60);
    setTimerActive(true);
  };

  const handleSelectAnswer = (questionId: string, answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const nextQuestion = () => {
    if (!activeQuiz) return;
    if (currentQuestionIdx < activeQuiz.questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    if (!activeQuiz) return;
    setTimerActive(false);
    
    // Calculate score
    let correctCount = 0;
    activeQuiz.questions.forEach((q) => {
      if (selectedAnswers[q.id]?.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / activeQuiz.questions.length) * 100);
    setScore(finalScore);
    setQuizFinished(true);

    // Save score to context
    saveQuizResult(activeQuiz.id, finalScore);
  };

  const resetQuizSelection = () => {
    setActiveQuiz(null);
    setQuizFinished(false);
    setSelectedAnswers({});
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 mx-auto max-w-4xl w-full px-4 py-8 sm:px-6">
        {/* Title */}
        {!activeQuiz && (
          <div className="border-b border-slate-200 pb-6 mb-8">
            <h1 className="font-serif text-3xl font-bold text-slate-900 flex items-center">
              <Award className="mr-2.5 h-8 w-8 text-blue-600" />
              Teste & Evaluări
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Verifică-ți nivelul cunoștințelor cu teste structurate pe capitole. Obține peste 80% pentru calificare.
            </p>
          </div>
        )}

        {/* Quiz Picker Layout */}
        {!activeQuiz && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizzes.map((quiz) => {
              const previousScore = completedQuizzes[quiz.id];
              return (
                <div key={quiz.id} className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between hover:shadow-sm transition">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        Clasa a {quiz.grade === '5' ? 'V-a' : quiz.grade === '6' ? 'VI-a' : quiz.grade === '7' ? 'VII-a' : 'VIII-a'}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        {quiz.timeLimitMinutes} min
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-slate-900 leading-snug">{quiz.title}</h3>
                    <p className="text-xs text-slate-500">Materia: <span className="font-medium text-slate-700">{quiz.topic}</span></p>
                  </div>

                  <div className="border-t border-slate-100 pt-4 mt-6 flex items-center justify-between">
                    <div>
                      {previousScore !== undefined ? (
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">Ultimul scor:</span>
                          <span className={`text-sm font-bold ${previousScore >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {previousScore}%
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">Netestat</span>
                      )}
                    </div>

                    <button
                      onClick={() => startQuiz(quiz)}
                      className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm transition cursor-pointer"
                    >
                      Începe Testul
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Active Quiz Layout */}
        {activeQuiz && !quizFinished && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Test în desfășurare</h3>
                <h2 className="font-serif text-lg font-bold text-slate-900">{activeQuiz.title}</h2>
              </div>

              <div className="flex items-center space-x-2 text-red-600 bg-red-50 border border-red-100 px-3 py-1.5 rounded-lg text-sm font-bold">
                <Clock className="h-4.5 w-4.5 animate-pulse" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full mb-6 overflow-hidden">
              <div 
                className="bg-blue-600 h-full transition-all duration-300"
                style={{ width: `${((currentQuestionIdx + 1) / activeQuiz.questions.length) * 100}%` }}
              ></div>
            </div>

            {/* Question display */}
            <div className="space-y-6">
              <span className="text-xs font-bold text-blue-600 uppercase">
                Întrebarea {currentQuestionIdx + 1} din {activeQuiz.questions.length}
              </span>
              
              <h3 className="font-serif text-lg font-bold text-slate-900 leading-snug">
                {activeQuiz.questions[currentQuestionIdx].question}
              </h3>

              {/* Options */}
              <div className="space-y-2.5">
                {activeQuiz.questions[currentQuestionIdx].options?.map((option, idx) => {
                  const qId = activeQuiz.questions[currentQuestionIdx].id;
                  const isSelected = selectedAnswers[qId] === option;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectAnswer(qId, option)}
                      className={`w-full text-left p-3.5 border rounded-xl text-sm transition font-medium flex items-center justify-between cursor-pointer ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-50/30 text-blue-900 font-bold' 
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span>{option}</span>
                      {isSelected && <span className="h-2 w-2 rounded-full bg-blue-600"></span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Controls */}
            <div className="border-t border-slate-100 pt-6 mt-8 flex justify-between">
              <button
                onClick={resetQuizSelection}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Renunță la test
              </button>

              <button
                onClick={nextQuestion}
                disabled={!selectedAnswers[activeQuiz.questions[currentQuestionIdx].id]}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow disabled:opacity-40 disabled:cursor-not-allowed flex items-center transition cursor-pointer"
              >
                {currentQuestionIdx < activeQuiz.questions.length - 1 ? 'Următoarea' : 'Finalizează testul'}
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </button>
            </div>
          </div>
        )}

        {/* Quiz Finished Result Screen */}
        {activeQuiz && quizFinished && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm text-center space-y-4">
              <div className="mx-auto h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                <TrendingUp className="h-8 w-8" />
              </div>

              <h2 className="font-serif text-2xl font-bold text-slate-900">Rezultate Evaluare</h2>
              <p className="text-sm text-slate-500">Ai finalizat testul: <span className="font-semibold text-slate-700">{activeQuiz.title}</span></p>

              <div className="py-4">
                <div className="inline-block text-center border border-slate-100 rounded-2xl bg-slate-50/50 px-8 py-4">
                  <span className={`text-4xl font-extrabold ${score >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>{score}%</span>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase mt-1">Scor Obținut</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
                {score >= 80 
                  ? 'Excelent! Ai demonstrat o înțelegere deosebită a acestui capitol de curs.' 
                  : 'Nu ai atins pragul de 80%. Îți recomandăm să citești lecțiile corespunzătoare din nou și să reîncerci.'
                }
              </p>

              <div className="flex justify-center space-x-3 pt-4">
                <button
                  onClick={() => startQuiz(activeQuiz)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-2.5 rounded-lg flex items-center transition cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4 mr-1.5" /> Reîncepe Testul
                </button>
                
                <button
                  onClick={resetQuizSelection}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow transition cursor-pointer"
                >
                  Înapoi la catalog teste
                </button>
              </div>
            </div>

            {/* Answer Explanations List */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
              <h3 className="font-serif text-base font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4 flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-blue-600" />
                Explicații Răspunsuri
              </h3>

              <div className="divide-y divide-slate-100 space-y-4">
                {activeQuiz.questions.map((q, idx) => {
                  const userAnswer = selectedAnswers[q.id];
                  const isCorrect = userAnswer?.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();

                  return (
                    <div key={q.id} className={`pt-4 first:pt-0 space-y-2`}>
                      <div className="flex items-start justify-between">
                        <h4 className="text-sm font-bold text-slate-800 leading-tight">
                          {idx + 1}. {q.question}
                        </h4>
                        {isCorrect ? (
                          <span className="text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 flex items-center">
                            <CheckCircle className="h-3.5 w-3.5 mr-1" /> Corect
                          </span>
                        ) : (
                          <span className="text-rose-600 font-bold text-xs bg-rose-50 px-2 py-0.5 rounded border border-rose-100 flex items-center">
                            <XCircle className="h-3.5 w-3.5 mr-1" /> Incorect
                          </span>
                        )}
                      </div>

                      <div className="text-xs space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <p><span className="font-semibold text-slate-500">Răspunsul tău:</span> <span className="text-slate-800">{userAnswer || 'Niciun răspuns'}</span></p>
                        <p><span className="font-semibold text-slate-500">Răspunsul corect:</span> <span className="text-emerald-700 font-semibold">{q.correctAnswer}</span></p>
                        
                        <div className="mt-2.5 pt-2 border-t border-slate-200/50 flex items-start space-x-1.5 text-slate-600">
                          <AlertCircle className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                          <p className="italic">{q.explanation}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
