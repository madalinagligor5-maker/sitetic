'use client';

import React, { useState } from 'react';
import { Play, RotateCcw, AlertCircle, Sparkles } from 'lucide-react';

interface BlockRunnerProps {
  blocks: string[];
}

export const BlockRunner: React.FC<BlockRunnerProps> = ({ blocks }) => {
  const [spritePosition, setSpritePosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userOrder, setUserOrder] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const addBlock = (block: string) => {
    if (userOrder.length >= 3) return;
    setUserOrder([...userOrder, block]);
  };

  const removeBlock = (index: number) => {
    setUserOrder(userOrder.filter((_, i) => i !== index));
    setSuccess(false);
    setMessage('');
  };

  const reset = () => {
    setUserOrder([]);
    setSpritePosition(0);
    setIsPlaying(false);
    setSuccess(false);
    setMessage('');
  };

  const runBlocks = () => {
    if (userOrder.length === 0) {
      setMessage('Trage sau adaugă blocuri în zona de lucru!');
      return;
    }

    setIsPlaying(true);
    setMessage('Se rulează scriptul...');

    // Simulate script evaluation step-by-step
    setTimeout(() => {
      // Step 1 check
      if (userOrder[0].includes('steguleț')) {
        setSpritePosition(50);
        
        setTimeout(() => {
          if (userOrder[1] && userOrder[1].includes('10 pași')) {
            setSpritePosition(150);
            
            setTimeout(() => {
              if (userOrder[2] && userOrder[2].includes('miau')) {
                setSpritePosition(220);
                setSuccess(true);
                setMessage('Felicitări! Personajul a pornit, s-a deplasat și a scos sunetul dorit!');
                setIsPlaying(false);
              } else {
                setMessage('Codul s-a oprit după mișcare. Ai uitat să adaugi sunetul la final?');
                setIsPlaying(false);
              }
            }, 1000);

          } else {
            setMessage('Personajul a pornit la clic pe steguleț, dar nu are instrucțiunea de mișcare următoarea.');
            setIsPlaying(false);
          }
        }, 1000);

      } else {
        setMessage('Eroare: Orice program Scratch trebuie să înceapă cu un eveniment (de ex: "când se dă clic pe steguleț").');
        setIsPlaying(false);
      }
    }, 1000);
  };

  return (
    <div className="my-6 border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm flex flex-col md:flex-row h-[420px]">
      {/* Block selection */}
      <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-4 flex flex-col justify-between">
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Blocuri disponibile</h4>
          <p className="text-xs text-slate-600 mb-4">Apasă pe ele pentru a le adăuga în zona de lucru în ordinea corectă:</p>
          <div className="space-y-2">
            {blocks.map((block) => (
              <button
                key={block}
                onClick={() => addBlock(block)}
                disabled={userOrder.includes(block)}
                className={`w-full text-left p-2.5 rounded-lg text-xs font-semibold border shadow-sm transition-all cursor-pointer ${
                  block.includes('steguleț') 
                    ? 'bg-amber-500 border-amber-600 text-white hover:bg-amber-400' 
                    : block.includes('mișcare') || block.includes('pași')
                    ? 'bg-blue-600 border-blue-700 text-white hover:bg-blue-500'
                    : 'bg-purple-600 border-purple-700 text-white hover:bg-purple-500'
                } disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                {block}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={reset}
          className="w-full py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition cursor-pointer"
        >
          Resetează tot
        </button>
      </div>

      {/* Workspace */}
      <div className="flex-1 p-4 flex flex-col border-b md:border-b-0 border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-4">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Spațiu de Scripturi (Workspace)</span>
          <button
            onClick={runBlocks}
            disabled={isPlaying}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg shadow transition flex items-center cursor-pointer"
          >
            <Play className="h-3.5 w-3.5 mr-1 fill-white" />
            Rulează
          </button>
        </div>

        {/* Selected Blocks Area */}
        <div className="flex-1 border-2 border-dashed border-slate-200 rounded-lg p-4 bg-slate-50/50 space-y-2 overflow-y-auto">
          {userOrder.length === 0 ? (
            <div className="h-full flex items-center justify-center text-xs text-slate-400 italic">
              Adaugă blocuri pentru a forma puzzle-ul logicii.
            </div>
          ) : (
            userOrder.map((block, idx) => (
              <div
                key={idx}
                onClick={() => removeBlock(idx)}
                className={`relative p-3 rounded-lg text-xs font-semibold border shadow-sm cursor-pointer hover:scale-[1.01] transition-transform ${
                  block.includes('steguleț') 
                    ? 'bg-amber-500 border-amber-600 text-white' 
                    : block.includes('mișcare') || block.includes('pași')
                    ? 'bg-blue-600 border-blue-700 text-white'
                    : 'bg-purple-600 border-purple-700 text-white'
                }`}
                title="Apasă pentru a elimina"
              >
                <div className="absolute left-4 -top-1 w-3 h-2 bg-slate-900 rounded-t-full opacity-20"></div>
                <div className="absolute left-4 -bottom-1 w-3 h-2 bg-slate-900 rounded-b-full opacity-20"></div>
                <span className="pl-4">{idx + 1}. {block}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Animation Stage */}
      <div className="w-full md:w-80 bg-slate-950 border-l border-slate-800 flex flex-col h-1/2 md:h-full">
        <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 uppercase tracking-wider">
          Scenă Scratch Simulat
        </div>

        {/* The Sandbox Area */}
        <div className="flex-1 relative overflow-hidden bg-slate-900 flex items-center bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
          {/* Sprite (The cat) */}
          <div
            className="absolute transition-all duration-1000 ease-out"
            style={{ left: `${20 + spritePosition}px` }}
          >
            <div className="relative group cursor-pointer bg-blue-500 text-white h-12 w-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg border border-blue-400">
              😺
              {success && (
                <div className="absolute -top-6 bg-white text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded shadow-md border border-slate-100 whitespace-nowrap animate-bounce">
                  Miau! 🎉
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-900 border-t border-slate-800 min-h-24">
          <p className="text-xs font-mono text-slate-300">
            {message || 'Așteptare comandă...'}
          </p>
          {success && (
            <div className="mt-2 text-xs text-emerald-400 font-semibold flex items-center">
              <Sparkles className="h-4 w-4 mr-1 text-yellow-400" />
              Obiectiv îndeplinit!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
