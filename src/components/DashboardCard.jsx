function DashboardCard({ title, value, description, icon }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-3xl">{icon}</div>
      </div>

      <p className="mt-4 text-sm font-medium text-slate-500">{title}</p>
      <h2 className="mt-2 text-3xl font-bold text-slate-900">{value}</h2>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  );
}

export default DashboardCard;