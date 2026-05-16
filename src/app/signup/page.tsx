"use client";

import React, { useState, useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MessageCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { registerUser } from "@/actions/auth";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  
  // React 19 / Next.js 15 state management for secure server actions
  const [state, formAction, isPending] = useActionState(registerUser, {
    error: null,
    success: false,
  });

  // Track if registration is successful to push route securely
  useEffect(() => {
    if (state?.success) {
      router.push("/login?registered=true");
    }
  }, [state, router]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100">
      <div className="w-full max-w-md space-y-8 p-8 border border-slate-100 dark:border-slate-900 rounded-3xl bg-slate-50/50 dark:bg-slate-900/20 backdrop-blur-md">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="text-blue-600 dark:text-blue-500 mb-3 p-3 bg-blue-50 dark:bg-blue-950/40 rounded-2xl">
            <MessageCircle size={36} fill="currentColor" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Create Corporate Identity</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Join the Vesta internal communications network</p>
        </div>

        {/* Dynamic Server Error Messages */}
        {state?.error && (
          <div className="p-3 text-xs font-semibold rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400">
            {state.error}
          </div>
        )}

        {/* Form Entry */}
        <form action={formAction} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Full Name</label>
            <input 
              type="text"
              name="fullName"
              required
              disabled={isPending}
              placeholder="Alex Mercer"
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-blue-500 outline-none transition text-sm text-slate-900 dark:text-white disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Corporate Email</label>
            <input 
              type="email"
              name="email"
              required
              disabled={isPending}
              placeholder="amercer@company.com"
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-blue-500 outline-none transition text-sm text-slate-900 dark:text-white disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                name="password"
                required
                disabled={isPending}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-blue-500 outline-none transition text-sm text-slate-900 dark:text-white pr-10 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isPending}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isPending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Encrypting Workspace Data...
              </>
            ) : (
              "Create Instance Account"
            )}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Already verified?{" "}
          <Link href="/login" className="text-blue-600 dark:text-blue-500 font-semibold hover:underline">
            Sign in here
          </Link>
        </div>

      </div>
    </div>
  );
}