"use client";

import React, { useState, useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { MessageCircle, Eye, EyeOff, AlertTriangle, Loader2, CheckCircle } from "lucide-react";
import { loginUser } from "@/actions/login";

// Form action payload state interface mapping 
interface LoginState {
  error: string | null;
  success: boolean;
  hasConflict: boolean;
  userId: string | null;
  deviceId: string;
}

const initialFormPayload: LoginState = {
  error: null,
  success: false,
  hasConflict: false,
  userId: null,
  deviceId: "",
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isJustRegistered = searchParams.get("registered") === "true";

  const [showPassword, setShowPassword] = useState(false);
  const [mockDeviceToken, setMockDeviceToken] = useState("");

  // Hooked directly into the matching LoginState object definition layout
  const [state, formAction, isPending] = useActionState(loginUser, initialFormPayload);

  // Generate a mock unique tracker footprint safely checking for browser instance runtime
  useEffect(() => {
    if (typeof window !== "undefined" && window.navigator) {
      setMockDeviceToken(navigator.userAgent.replace(/\s+/g, "").slice(0, 20));
    }
  }, []);

  // Securely forward authenticated session users to global chat space
  useEffect(() => {
    if (state?.success) {
      router.push("/chat");
    }
  }, [state, router]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="w-full max-w-md space-y-8 p-8 border border-slate-100 dark:border-slate-900 rounded-3xl bg-slate-50/50 dark:bg-slate-900/20 backdrop-blur-md">
        
        {/* Brand Identity Header */}
        <div className="flex flex-col items-center text-center">
          <div className="text-blue-600 dark:text-blue-500 mb-3 p-3 bg-blue-50 dark:bg-blue-950/40 rounded-2xl">
            <MessageCircle size={36} fill="currentColor" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Log in to Vesta Workspace</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Enter your corporate credentials below</p>
        </div>

        {/* Dynamic Success Alert from Registration redirect */}
        {isJustRegistered && !state?.error && (
          <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl text-emerald-800 dark:text-emerald-400 text-sm">
            <CheckCircle className="shrink-0" size={18} />
            <p className="font-medium">Account created successfully! Log in below.</p>
          </div>
        )}

        {/* Server Validation Exceptions */}
        {state?.error && (
          <div className="flex items-center gap-2 p-4 text-xs font-semibold rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400">
            <span>{state.error}</span>
          </div>
        )}

        {/* Active Concurrent Session Mitigation Warnings */}
        {state?.hasConflict && (
          <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-2xl text-amber-800 dark:text-amber-300 text-sm">
            <AlertTriangle className="shrink-0 mt-0.5" size={18} />
            <div>
              <p className="font-semibold">Active Session Detected</p>
              <p className="text-xs opacity-90 mt-0.5">You are currently authenticated on another device instance. Logging in will establish this workspace as your primary view.</p>
              <button 
                type="button"
                onClick={() => router.push("/chat")}
                className="mt-2 text-xs font-bold underline block text-left cursor-pointer hover:text-amber-700 dark:hover:text-amber-200"
              >
                Override Session & Establish Context
              </button>
            </div>
          </div>
        )}

        {/* Entry Processing Layout Form */}
        <form action={formAction} className="space-y-5">
          <input type="hidden" name="deviceId" value={mockDeviceToken} />

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Email Address</label>
            <input 
              type="email"
              name="email"
              required
              disabled={isPending}
              placeholder="name@company.com"
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isPending}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Verifying Credentials...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          New to the workspace?{" "}
          <Link href="/signup" className="text-blue-600 dark:text-blue-500 font-semibold hover:underline">
            Request an account
          </Link>
        </div>

      </div>
    </div>
  );
}