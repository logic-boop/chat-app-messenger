"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Search, Settings, Edit, MoreHorizontal, 
  Smile, Paperclip, Send, Phone, Video, Info, LogOut, Sun, Moon
} from "lucide-react";
import { useApp } from "@/components/AppContext";

export default function MessengerHome() {
  const { theme, toggleTheme, logout } = useApp();
  const [message, setMessage] = useState("");
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat when component mounts or elements adjust
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    console.log("Sending message stack:", message);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen w-screen bg-white dark:bg-[#121212] overflow-hidden text-slate-900 dark:text-zinc-100 transition-colors duration-200">
      
      {/* --- SIDEBAR: CONVERSATION LIST --- */}
      <aside className="hidden md:flex flex-col w-[360px] border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#121212]">
        <div className="p-4 flex justify-between items-center relative">
          <h1 className="text-2xl font-bold tracking-tight">Chats</h1>
          <div className="flex gap-2">
            
            {/* Multi-Control Action Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
                className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 transition cursor-pointer"
                title="System Preferences"
              >
                <Settings size={20} />
              </button>

              {showSettingsDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-1">
                  <button
                    onClick={() => {
                      toggleTheme();
                      setShowSettingsDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                  >
                    {theme === "dark" ? <Sun size={16} className="text-amber-500" /> : <Moon size={16} className="text-indigo-500" />}
                    Toggle Theme View
                  </button>
                  <hr className="border-gray-100 dark:border-zinc-800 my-1" />
                  <button
                    onClick={() => {
                      setShowSettingsDropdown(false);
                      logout();
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition font-medium cursor-pointer"
                  >
                    <LogOut size={16} />
                    Disconnect Session
                  </button>
                </div>
              )}
            </div>

            <div className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 transition">
              <Edit size={20} />
            </div>
          </div>
        </div>
        
        {/* Workspace Quick Query */}
        <div className="px-4 mb-4">
          <div className="flex items-center bg-gray-100 dark:bg-zinc-800 px-3 py-2 rounded-full border border-transparent focus-within:border-blue-500/30 transition">
            <Search size={18} className="text-gray-400" />
            <input 
              className="bg-transparent border-none outline-none ml-2 w-full text-sm placeholder-gray-400 text-slate-900 dark:text-white" 
              placeholder="Search Messenger" 
            />
          </div>
        </div>

        {/* Dynamic Activity List Scroller */}
        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800/60 cursor-pointer transition">
            <div className="relative w-12 h-12 rounded-full bg-blue-600 shrink-0 flex items-center justify-center text-white font-bold text-sm shadow-inner">
               LT
               <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-[#121212] rounded-full"></span>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex justify-between items-baseline">
                <p className="font-semibold text-sm truncate">LogicTech HQ</p>
                <span className="text-[10px] text-gray-400">2m</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-zinc-400 truncate mt-0.5">You: Let's build this! 🚀</p>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CHAT WINDOW --- */}
      <main className="flex flex-col flex-1 relative h-full bg-white dark:bg-[#121212]">
        
        {/* Active Node View Header */}
        <header className="h-[60px] border-b border-gray-200 dark:border-zinc-800 flex justify-between items-center px-6 shrink-0 bg-white/80 dark:bg-[#121212]/80 backdrop-blur-md shadow-sm z-10">
          <div className="flex items-center gap-3">
            <div className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full cursor-pointer text-blue-500">
               <Info size={20} />
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-inner">LT</div>
            <div>
              <p className="font-bold text-sm leading-tight">LogicTech HQ</p>
              <p className="text-[11px] text-green-500 font-semibold flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Active now
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-blue-500 dark:text-blue-400">
            <Phone size={20} className="cursor-pointer hover:opacity-70 transition" />
            <Video size={22} className="cursor-pointer hover:opacity-70 transition" />
            <MoreHorizontal size={22} className="cursor-pointer hover:opacity-70 transition" />
          </div>
        </header>

        {/* Scrollable Messages Stream */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30 dark:bg-[#0E0E0E]/20">
          <div className="flex flex-col items-center py-8 border-b border-gray-100 dark:border-zinc-900 max-w-sm mx-auto mb-6">
             <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-extrabold text-xl mb-3 shadow-md">LT</div>
             <h2 className="font-bold text-lg">LogicTech HQ</h2>
             <p className="text-gray-400 dark:text-zinc-500 text-xs mt-1 font-medium tracking-wide uppercase">Vesta Network Directory Node</p>
          </div>

          {/* Received Payload Cluster */}
          <div className="flex items-end gap-2 max-w-[75%]">
            <div className="w-7 h-7 rounded-full bg-zinc-400 flex items-center justify-center text-[10px] text-white font-bold shrink-0">HQ</div>
            <div className="bg-gray-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 px-4 py-2.5 rounded-[22px] rounded-bl-none text-sm leading-relaxed shadow-sm">
              This is the Messenger clone layout! Try the light/dark mode.
            </div>
          </div>

          {/* Sent Payload Cluster */}
          <div className="flex justify-end">
            <div className="bg-blue-600 text-white px-4 py-2.5 rounded-[22px] rounded-br-none text-sm leading-relaxed max-w-[75%] shadow-sm font-medium">
              It looks exactly like the real thing. 🚀
            </div>
          </div>

          {/* Typing Indicator Node */}
          <div className="flex items-center gap-2 animate-pulse">
            <div className="w-7 h-7 rounded-full bg-zinc-400 flex items-center justify-center text-[10px] text-white font-bold shrink-0">HQ</div>
            <div className="bg-gray-100 dark:bg-zinc-800 px-4 py-3.5 rounded-[22px] rounded-bl-none flex gap-1 items-center h-8 shadow-sm">
              <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-zinc-500 rounded-full延 animate-bounce [animation-duration:0.8s]"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-zinc-500 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-zinc-500 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.4s]"></span>
            </div>
          </div>
        </div>

        {/* Footer Processing Bar Input */}
        <footer className="p-4 flex items-center gap-3 shrink-0 bg-white dark:bg-[#121212] border-t border-gray-100 dark:border-zinc-900/60 z-10">
          <div className="flex gap-3 text-blue-500 dark:text-blue-400 px-1">
             <Paperclip size={20} className="cursor-pointer hover:scale-105 transition" />
             <Smile size={20} className="cursor-pointer hover:scale-105 transition" />
          </div>
          <div className="flex-1 bg-gray-100 dark:bg-zinc-800 rounded-full px-5 py-2.5 border border-transparent focus-within:border-blue-500/30 transition">
            <input 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent w-full outline-none text-sm placeholder-gray-400 dark:placeholder-zinc-500 text-slate-900 dark:text-white" 
              placeholder="Aa"
            />
          </div>
          <button 
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="text-blue-500 dark:text-blue-400 hover:scale-110 active:scale-95 transition p-1 disabled:opacity-30 disabled:hover:scale-100 cursor-pointer"
          >
            <Send size={22} fill={message.trim() ? "currentColor" : "none"} />
          </button>
        </footer>
      </main>
    </div>
  );
}