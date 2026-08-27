'use client';

import React, { useState } from 'react';
import { Play, ArrowDown, Check, ArrowRight } from 'lucide-react';

interface Step {
  label: string;
  type: 'terminal' | 'process' | 'decision';
  yes?: number;
  no?: number;
}

interface FlowchartVisualizerProps {
  steps: Step[];
}

export const FlowchartVisualizer: React.FC<FlowchartVisualizerProps> = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const [decisionPath, setDecisionPath] = useState<string | null>(null);

  const startTracing = () => {
    setCurrentStep(0);
    setHistory([0]);
    setDecisionPath(null);
  };

  const nextStep = () => {
    if (currentStep === null) return;
    const step = steps[currentStep];

    if (step.type === 'terminal' && currentStep > 0) {
      // Finished
      setCurrentStep(null);
      return;
    }

    if (step.type === 'decision' && step.yes !== undefined && step.no !== undefined) {
      // For demo, if decision is reached, let's toggle between Yes/No path
      // we can ask user or just automatically select "No" first and "Yes" later, or let them click.
      return;
    }

    const nextIndex = currentStep + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(nextIndex);
      setHistory([...history, nextIndex]);
    } else {
      setCurrentStep(null);
    }
  };

  const handleDecision = (choice: 'yes' | 'no') => {
    if (currentStep === null) return;
    const step = steps[currentStep];
    if (step.type !== 'decision') return;

    const nextIdx = choice === 'yes' ? step.yes : step.no;
    if (nextIdx !== undefined) {
      setDecisionPath(choice);
      setCurrentStep(nextIdx);
      setHistory([...history, nextIdx]);
    }
  };

  return (
    <div className="my-6 border border-slate-200 rounded-xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-6">
        <div>
          <h4 className="font-serif text-sm font-bold text-slate-800">Simulator Traseu Algoritm</h4>
          <p className="text-xs text-slate-500">Urmărește modul de execuție al instrucțiunilor.</p>
        </div>
        <button
          onClick={startTracing}
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2 rounded-lg transition flex items-center shadow cursor-pointer"
        >
          <Play className="h-3.5 w-3.5 mr-1.5 fill-white" />
          {currentStep !== null ? 'Repornește' : 'Pornește Traseul'}
        </button>
      </div>

      <div className="flex flex-col items-center space-y-4 max-w-md mx-auto">
        {steps.map((step, idx) => {
          const isActive = currentStep === idx;
          const isVisited = history.includes(idx);
          
          let shapeClass = '';
          if (step.type === 'terminal') {
            shapeClass = 'rounded-full px-6 py-2 border-2 bg-slate-50 border-slate-400 text-slate-700';
          } else if (step.type === 'process') {
            shapeClass = 'rounded-md px-5 py-3 border-2 bg-blue-50/20 border-blue-500 text-slate-800';
          } else if (step.type === 'decision') {
            shapeClass = 'rotate-45 w-32 h-32 border-2 border-amber-500 bg-amber-50/20 text-slate-800 flex items-center justify-center';
          }

          if (isActive) {
            shapeClass += ' ring-4 ring-blue-500/40 border-blue-600 scale-[1.03] shadow-md font-bold';
          } else if (isVisited) {
            shapeClass += ' opacity-80 border-emerald-500 bg-emerald-50/10 text-emerald-800';
          }

          return (
            <div key={idx} className="flex flex-col items-center w-full">
              {idx > 0 && (
                <ArrowDown className={`h-6 w-6 my-1 ${
                  isVisited && history[history.indexOf(idx) - 1] === idx - 1 ? 'text-emerald-500' : 'text-slate-300'
                }`} />
              )}

              {step.type === 'decision' ? (
                <div className="relative my-4 flex items-center justify-center h-36">
                  <div className={shapeClass}>
                    <div className="-rotate-45 text-center text-xs font-semibold px-2">
                      {step.label}
                    </div>
                  </div>
                  
                  {isActive && (
                    <div className="absolute top-1/2 -translate-y-1/2 flex space-x-12 z-10">
                      <button
                        onClick={() => handleDecision('no')}
                        className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow cursor-pointer"
                      >
                        NU
                      </button>
                      <button
                        onClick={() => handleDecision('yes')}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow cursor-pointer"
                      >
                        DA
                      </button>
                    </div>
                  )}

                  {decisionPath && isVisited && (
                    <div className="absolute -right-16 top-1/2 -translate-y-1/2 bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200">
                      Calea: {decisionPath.toUpperCase()}
                    </div>
                  )}
                </div>
              ) : (
                <div className={`${shapeClass} text-center text-xs font-semibold transition-all duration-300 shadow-sm flex items-center justify-center space-x-1.5`}>
                  {isVisited && step.type !== 'terminal' && <Check className="h-3.5 w-3.5 text-emerald-500" />}
                  <span>{step.label}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {currentStep !== null && steps[currentStep].type !== 'decision' && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={nextStep}
            className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-5 py-2.5 rounded-lg shadow flex items-center cursor-pointer"
          >
            Pasul Următor
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </button>
        </div>
      )}
    </div>
  );
};
