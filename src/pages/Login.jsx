import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import AuthMascot from "../components/AuthMascot";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Login successful!");
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-6">
      <div className="relative w-full max-w-md rounded-3xl bg-slate-900 p-8 shadow-2xl">
        <AuthMascot mode="login" />

        <h1 className="text-3xl font-bold text-white">Welcome Back 👋</h1>
        <p className="mt-2 text-slate-400">Login to Student OS</p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
            required
          />

          <button className="w-full rounded-xl bg-blue-500 p-3 font-semibold text-white transition hover:bg-blue-600">
            Login
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-blue-300">{message}</p>}

        <p className="mt-5 text-center text-sm text-slate-400">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-400">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;