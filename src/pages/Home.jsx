import { Link } from "react-router-dom";
import heroImg from "../assets/hero.png";

function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-10 px-6 py-10 lg:grid-cols-2">
        <div>
          <p className="mb-4 inline-block rounded-full bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            Built by KartikLabs 🚀
          </p>

          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            Student OS for smarter college life.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-slate-300">
            Manage attendance, CGPA, assignments, notes, PYQs, and placement
            preparation from one responsive student dashboard.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/signup"
              className="rounded-xl bg-blue-500 px-6 py-3 text-center font-semibold text-white hover:bg-blue-600"
            >
              Get Started
            </Link>

            <Link
              to="/dashboard"
              className="rounded-xl border border-slate-700 px-6 py-3 text-center font-semibold text-slate-200 hover:bg-slate-900"
            >
              View Demo
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4 shadow-2xl">
          <img
            src={heroImg}
            alt="Student OS Dashboard"
            className="w-full rounded-2xl object-cover"
          />
        </div>
      </section>
    </main>
  );
}

export default Home;