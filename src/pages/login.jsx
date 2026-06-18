function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 p-8">
        <h1 className="text-3xl font-bold text-white">
          Welcome Back 👋
        </h1>

        <div className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
          />

          <button className="w-full rounded-xl bg-blue-500 p-3 font-semibold text-white">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;