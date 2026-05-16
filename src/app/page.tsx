"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Shield, Zap, Globe, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* HEADER / NAV */}
      <header className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-blue-600 dark:text-blue-500">
          <MessageCircle size={28} fill="currentColor" />
          <span>VESTA SYSTEMS</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-blue-600 transition">
            Sign In
          </Link>
          <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition shadow-md shadow-blue-500/10">
            Get Started
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto py-12 md:py-24">
        <span className="text-xs font-semibold tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full mb-6">
          VESTA MESSENGER MVP v1.0
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
          Elite Corporate Real-Time Communication.
        </h1>
        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mb-8">
          A high-performance communication platform engineered for modern teams. Experience persistent multi-device sync, instantaneous packet delivery, and a premium workspace interface.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-sm mb-16">
          <Link href="/signup" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group">
            Launch Platform 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/login" className="w-full sm:w-auto border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 text-sm px-8 py-3 rounded-full font-medium transition flex items-center justify-center">
            Sign In to Workspace
          </Link>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full border-t border-slate-200 dark:border-slate-800/60 pt-16 text-left">
          <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white dark:bg-slate-900/30 border border-transparent dark:border-slate-900">
            <div className="p-2 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-lg w-fit">
              <Zap size={20} />
            </div>
            <h3 className="font-semibold text-lg">Sub-Millisecond Sync</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Powered by optimized low-overhead connection layers guaranteeing zero delivery friction.</p>
          </div>

          <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white dark:bg-slate-900/30 border border-transparent dark:border-slate-900">
            <div className="p-2 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-lg w-fit">
              <Shield size={20} />
            </div>
            <h3 className="font-semibold text-lg">Robust Session Security</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Smart active session recognition alerts you instantly if a cross-device conflict is flagged.</p>
          </div>

          <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white dark:bg-slate-900/30 border border-transparent dark:border-slate-900">
            <div className="p-2 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-lg w-fit">
              <Globe size={20} />
            </div>
            <h3 className="font-semibold text-lg">Persistent Context</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Your conversations stay alive permanently. Sessions last until explicitly cleared on your command.</p>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 dark:border-slate-900 px-6 py-6 text-center text-xs text-slate-400">
        © 2026 Vesta Systems Inc. All rights reserved. Vesta Messenger is a production-grade enterprise software MVP layout.
      </footer>
    </div>
  );
}