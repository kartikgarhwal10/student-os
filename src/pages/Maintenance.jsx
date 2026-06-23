function Maintenance() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="max-w-xl rounded-3xl bg-slate-900 p-10 text-center shadow-2xl">
        <h1 className="text-5xl font-bold text-white">🚧 Maintenance Mode</h1>

        <p className="mt-5 text-lg text-slate-300">
          Student OS is currently under maintenance.
        </p>

        <p className="mt-3 text-slate-400">
          We are improving the platform. Please check back soon.
        </p>

        <div className="mt-8 rounded-2xl bg-slate-800 p-4 text-sm text-slate-300">
          Built by KartikLabs 🚀
        </div>
      </div>
    </div>
  );
}

export default Maintenance;