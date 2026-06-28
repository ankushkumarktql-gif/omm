'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FileText, KeyRound, ArrowRight } from 'lucide-react';

export default function OtpPage() {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const handleInput = (index: number, val: string) => {
    if (isNaN(Number(val))) return;
    const nextCode = [...code];
    nextCode[index] = val;
    setCode(nextCode);

    // Focus next input automatically
    if (val && index < 5) {
      const nextEl = document.getElementById(`otp-${index + 1}`);
      nextEl?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevEl = document.getElementById(`otp-${index - 1}`);
      prevEl?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-100 font-sans relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-indigo-600/10 blur-[90px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative text-center">
        <div className="space-y-2 mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 font-bold text-white mb-2">
            <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center">
              <FileText size={16} className="text-white" />
            </div>
            <span>Resu<span className="text-indigo-400">AI</span></span>
          </Link>
          <h2 className="text-xl font-bold text-white">Enter OTP Code</h2>
          <p className="text-xs text-slate-400">A 6-digit confirmation code was sent to your phone/email.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2.5">
            {code.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInput(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-11 h-12 text-center text-lg font-bold bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg outline-none transition"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition shadow-lg shadow-indigo-600/15"
          >
            Verify Security Code
            <ArrowRight size={14} />
          </button>
        </form>
      </div>
      
      {/* Footer Credit */}
      <footer className="mt-8 text-[10px] text-slate-600 flex flex-col items-center gap-0.5 tracking-wide">
        <span>Designed & Developed by</span>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">Ankush Raja</span>
          <span className="text-slate-800">|</span>
          <span className="text-indigo-500/80 font-medium">Ankush kumar</span>
        </div>
      </footer>
    </div>
  );
}
