'use client';

import { useActionState } from 'react';
import { loginAction } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2, ArrowRight, Loader2, Mail, Lock } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="relative min-h-screen bg-[#F3F4F6] text-slate-900 font-sans flex flex-col justify-center items-center selection:bg-[#2563EB] selection:text-white">
      
      {/* Background Top Hero - Solid Electric Blue */}
      <div className="absolute top-0 left-0 w-full h-[45%] bg-[#2563EB] rounded-b-[40px] shadow-lg shadow-blue-500/20" />

      <div className="relative z-10 w-full px-4 sm:max-w-md mx-auto -mt-10">
        
        {/* Header / Logo section (above the card) */}
        <div className="flex flex-col items-center justify-center space-y-2 mb-8 text-white">
          <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full mb-2">
            <Building2 className="w-5 h-5 text-white" />
            <span className="font-bold tracking-wide">Morazze</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">
            Sign in to your Account
          </h2>
          <p className="text-sm font-medium text-white/80">
            Enter your email and password to log in
          </p>
        </div>

        {/* Floating White Card Form */}
        <div className="bg-white px-6 py-8 sm:px-10 shadow-2xl shadow-slate-200 rounded-[28px]">
          
          {/* Mock Google OAuth Button for visuals matching the ref */}
          <div className="mb-6">
            <button type="button" className="w-full flex items-center justify-center gap-2 h-12 rounded-2xl bg-white border border-slate-200/80 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Continue with Google
            </button>
            <div className="relative mt-6 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100" />
              </div>
              <div className="relative bg-white px-4 text-[13px] font-medium text-slate-400 uppercase tracking-widest">
                Or
              </div>
            </div>
          </div>

          <form action={formAction} className="space-y-5">
            {state?.error && (
              <div className="bg-red-50 text-red-500 border border-red-100 p-3 rounded-xl text-sm font-medium animate-in fade-in flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {state.error}
              </div>
            )}

            <div className="space-y-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                   <Mail className="w-4 h-4 text-slate-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="sindico@morazze.com"
                  className="pl-11 h-12 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-[14px] shadow-sm focus-visible:ring-1 focus-visible:ring-[#2563EB] focus-visible:border-[#2563EB] text-[15px]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                   <Lock className="w-4 h-4 text-slate-400" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className="pl-11 pr-10 h-12 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-[14px] shadow-sm focus-visible:ring-1 focus-visible:ring-[#2563EB] focus-visible:border-[#2563EB] text-[15px] tracking-wide"
                />
                <button type="button" className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 pb-3">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB] cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-500 select-none cursor-pointer">
                  Remember me
                </label>
              </div>
              <Link href="#" className="text-sm font-semibold text-[#2563EB] hover:text-blue-700 transition-colors">
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-[52px] bg-[#2563EB] hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 text-white font-semibold rounded-[16px] text-base transition-all duration-300 group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isPending ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                'Log In'
              )}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm font-medium text-slate-500">
             Don't have an account? <Link href="#" className="text-[#2563EB] font-bold hover:text-blue-700 transition-colors">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
