import DashboardLayout from "../layouts/DashboardLayout";

function Dashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-2 text-slate-600">
        Welcome to Student OS by KartikLabs.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Attendance</p>
          <h2 className="mt-2 text-3xl font-bold">82%</h2>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">CGPA</p>
          <h2 className="mt-2 text-3xl font-bold">8.1</h2>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Assignments</p>
          <h2 className="mt-2 text-3xl font-bold">5</h2>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Resources</p>
          <h2 className="mt-2 text-3xl font-bold">24</h2>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;