'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { mockResetPassword } from '@/lib/firebase';
import { FileText, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await mockResetPassword(email);
      setSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-100 font-sans relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-indigo-600/10 blur-[90px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative">
        <div className="text-center space-y-2 mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 font-bold text-white mb-2">
            <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center">
              <FileText size={16} className="text-white" />
            </div>
            <span>Resu<span className="text-indigo-400">AI</span></span>
          </Link>
          <h2 className="text-xl font-bold text-white">Reset Password</h2>
          <p className="text-xs text-slate-400">We will send reset instructions to your inbox.</p>
        </div>

        {success ? (
          <div className="space-y-6 text-center">
            <div className="mx-auto w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <p className="text-xs text-slate-300">
              Reset email sent. Check your inbox to complete the credentials update.
            </p>
            <Link 
              href="/login" 
              className="w-full text-xs font-semibold bg-slate-850 hover:bg-slate-800 border border-slate-700 py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition"
            >
              <ArrowLeft size={14} /> Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="text-[11px] font-medium text-slate-300 block mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white rounded-lg pl-10 pr-4 py-2.5 outline-none transition"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-lg flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed transition mt-2 shadow-lg shadow-indigo-600/15"
            >
              {loading ? 'Sending link...' : 'Send Reset Link'}
            </button>

            <Link 
              href="/login" 
              className="w-full text-xs font-semibold bg-slate-950 border border-slate-800 text-slate-400 hover:text-white py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition"
            >
              <ArrowLeft size={14} /> Back to login
            </Link>
          </form>
        )}
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
