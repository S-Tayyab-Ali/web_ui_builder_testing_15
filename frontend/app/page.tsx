"use client";

import React from 'react';
import TodoApp from '@/components/TodoApp';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-[40%] left-[60%] w-[20%] h-[20%] bg-pink-500/10 rounded-full blur-[80px] animate-pulse delay-500" />
      </div>

      <div className="relative z-10">
        <TodoApp />
      </div>
    </main>
  );
}
