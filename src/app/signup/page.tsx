'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { mockSignUp, mockGoogleLogin } from '@/lib/firebase';
import { FileText, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all details.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      await mockSignUp(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError(null);
    try {
      await mockGoogleLogin();
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || "Google Sign-In failed.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-100 font-sans relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-indigo-600/10 blur-[90px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative">
        <div className="text-center space-y-2 mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 font-bold text-white mb-2">
            <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center">
              <FileText size={16} className="text-white" />
            </div>
            <span>ResumeOMM <span className="text-indigo-400">AI</span></span>
          </Link>
          <h2 className="text-xl font-bold text-white">Create your account</h2>
          <p className="text-xs text-slate-400">Get started by setting up your profile credentials.</p>
        </div>

        {error && (
          <div className="mb-5 bg-red-500/10 border border-red-500/20 p-3.5 rounded-lg flex gap-2.5 items-start text-xs text-red-400">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

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

          <div>
            <label className="text-[11px] font-medium text-slate-300 block mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs bg-slate-950 border border-slate-800 focus:border-indigo-500 text-white rounded-lg pl-10 pr-4 py-2.5 outline-none transition"
                placeholder="Must be 6+ characters"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-lg flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed transition mt-2 shadow-lg shadow-indigo-600/15"
          >
            {loading ? 'Registering...' : 'Create Account'}
            <ArrowRight size={14} />
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
          <span className="relative bg-slate-900 px-3 text-[10px] text-slate-500 font-semibold uppercase">Or continue with</span>
        </div>

        {/* Google Sign In */}
        <button 
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="w-full text-xs font-semibold bg-slate-950 border border-slate-800 text-slate-300 hover:text-white py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-850 transition"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" stroke="none" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" stroke="none" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" stroke="none" />
          </svg>
          {googleLoading ? 'Connecting...' : 'Google Account'}
        </button>

        {/* Redirect */}
        <p className="mt-8 text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link href="/login" className="text-indigo-400 font-semibold hover:underline">Sign In</Link>
        </p>
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
