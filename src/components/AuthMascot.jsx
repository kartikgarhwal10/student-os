function AuthMascot({ mode = "login" }) {
  return (
    <div className="relative mx-auto mb-6 h-40 w-full max-w-md overflow-hidden">
      <div className="absolute left-4 top-16 h-1 w-40 origin-left animate-ropePull rounded-full bg-blue-400"></div>

      <div className="absolute left-2 top-8 animate-characterWalk">
        <div className="relative">
          <div className="mx-auto h-12 w-12 rounded-full bg-amber-300"></div>

          <div className="absolute left-3 top-4 h-2 w-2 rounded-full bg-slate-900"></div>
          <div className="absolute right-3 top-4 h-2 w-2 rounded-full bg-slate-900"></div>
          <div className="absolute left-4 top-8 h-1 w-4 rounded-full bg-slate-900"></div>

          <div className="mx-auto mt-1 h-16 w-14 rounded-2xl bg-blue-600"></div>

          <div className="absolute -right-5 top-16 h-3 w-10 origin-left animate-wave rounded-full bg-amber-300"></div>
          <div className="absolute -left-4 top-16 h-3 w-8 rotate-12 rounded-full bg-amber-300"></div>

          <div className="absolute left-2 top-28 h-10 w-3 animate-leg rounded-full bg-slate-800"></div>
          <div className="absolute right-2 top-28 h-10 w-3 animate-legDelay rounded-full bg-slate-800"></div>
        </div>
      </div>

      <div className="absolute bottom-0 right-4 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-lg">
        {mode === "login" ? "Welcome back!" : "Join Student OS!"}
      </div>
    </div>
  );
}

export default AuthMascot;