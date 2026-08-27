'use client';

import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';

interface CodePlaygroundProps {
  initialCode: string;
  expectedOutput?: string;
  onSuccess?: () => void;
  label?: string;
}

export const CodePlayground: React.FC<CodePlaygroundProps> = ({
  initialCode,
  expectedOutput,
  onSuccess,
  label = 'Consolă de Lucru'
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setCode(initialCode);
    setOutput([]);
    setError(null);
    setIsSuccess(false);
  }, [initialCode]);

  const runCode = () => {
    setIsRunning(true);
    setError(null);
    setOutput([]);
    setIsSuccess(false);

    // Simple mock execution engine for Javascript/Python hybrid
    // To make it easy for students to run, we allow simple Python-like JS syntax,
    // or direct JavaScript. Let's convert standard Python prints to JS console.logs
    // so they can write either.
    let codeToRun = code;

    // Basic Python syntax to JS translation for beginner snippets
    if (code.includes('print(')) {
      // replace print(...) with console.log(...)
      codeToRun = codeToRun.replace(/print\((.*?)\)/g, 'console.log($1)');
    }
    // Convert basic loop syntax if they write python range
    // e.g. for i in range(1, 11): -> for (let i = 1; i < 11; i++) {
    // We'll do a simple regex or prompt them to write JS/Python hybrid.
    // If they just run the default provided code, let's make sure it evaluates perfectly.

    const capturedLogs: string[] = [];
    const mockConsole = {
      log: (...args: any[]) => {
        capturedLogs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
      }
    };

    try {
      // Evaluate within a safe function closure
      const runner = new Function('console', `
        try {
          ${codeToRun}
        } catch (e) {
          throw new Error(e.message);
        }
      `);
      
      runner(mockConsole);
      
      setOutput(capturedLogs);
      
      // Validation check
      if (expectedOutput) {
        const actualStr = capturedLogs.join('\n').trim();
        const expectedStr = expectedOutput.trim();
        
        if (actualStr === expectedStr) {
          setIsSuccess(true);
          if (onSuccess) onSuccess();
        } else {
          setError(`Rezultatul afișat nu se potrivește. Așteptat: "${expectedStr}", Obținut: "${actualStr}"`);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Eroare de sintaxă!');
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput([]);
    setError(null);
    setIsSuccess(false);
  };

  return (
    <div className="w-full border border-slate-200 rounded-xl bg-slate-50 overflow-hidden shadow-sm flex flex-col md:flex-row h-[420px] my-6">
      {/* Editor Pane */}
      <div className="flex-1 flex flex-col border-r border-slate-200 bg-white">
        <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 tracking-wide uppercase font-sans flex items-center">
            <span className="h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
            {label}
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={resetCode}
              className="text-xs flex items-center text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded px-2.5 py-1 transition shadow-sm cursor-pointer"
              title="Resetează codul la cel inițial"
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1" />
              Reset
            </button>
            <button
              onClick={runCode}
              disabled={isRunning}
              className="text-xs flex items-center bg-blue-600 text-white hover:bg-blue-500 rounded px-3.5 py-1 font-semibold transition shadow cursor-pointer"
            >
              <Play className="h-3.5 w-3.5 mr-1 fill-white" />
              {isRunning ? 'Se execută...' : 'Rulează Cod'}
            </button>
          </div>
        </div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 p-4 font-mono text-sm bg-slate-950 text-slate-100 outline-none resize-none focus:ring-1 focus:ring-blue-500/50"
          spellCheck={false}
        />
      </div>

      {/* Output Console Pane */}
      <div className="w-full md:w-80 bg-slate-900 text-slate-200 flex flex-col h-1/2 md:h-full">
        <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Afișaj Output</span>
          {isSuccess && (
            <span className="text-xs bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 font-semibold flex items-center animate-pulse">
              <CheckCircle className="h-3.5 w-3.5 mr-1" />
              Corect!
            </span>
          )}
        </div>

        <div className="flex-1 p-4 font-mono text-sm overflow-y-auto space-y-2">
          {output.length > 0 ? (
            output.map((line, idx) => (
              <div key={idx} className="text-emerald-400 border-l-2 border-emerald-500/50 pl-2">
                {line}
              </div>
            ))
          ) : (
            !error && !isSuccess && <div className="text-slate-500 italic">Rulează programul pentru a vedea rezultatele.</div>
          )}

          {error && (
            <div className="rounded-lg bg-red-950/40 border border-red-500/20 p-3 text-xs text-red-300 flex items-start space-x-2">
              <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {isSuccess && (
            <div className="rounded-lg bg-emerald-950/30 border border-emerald-500/20 p-3 text-xs text-emerald-300 space-y-2">
              <div className="font-bold flex items-center">
                Felicitări! Rezultatul este exact cel așteptat.
              </div>
              <p className="text-slate-400">Ai înțeles logica acestui algoritm. Poți marca această lecție ca fiind completată cu succes!</p>
            </div>
          )}
        </div>

        <div className="bg-slate-950/40 p-3 border-t border-slate-800 text-xs text-slate-400 flex items-center space-x-1.5">
          <Lightbulb className="h-4 w-4 text-yellow-500 shrink-0" />
          <span>Sfat: Modifică valorile variabilelor pentru a testa diferite cazuri.</span>
        </div>
      </div>
    </div>
  );
};
