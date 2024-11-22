"use client";

export function Loading() {
  return (
    <main className="h-screen w-full bg-black flex flex-col items-center justify-center">
      <div className="relative w-16 h-16">
        <div className="w-16 h-16 border-t-2 border-l-2 border-muted rounded-full animate-[spin_0.6s_linear_infinite]" />
      </div>
    </main>
  );
}
