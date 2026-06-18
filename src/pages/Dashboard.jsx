import DashboardLayout from "../layouts/DashboardLayout";
import DashboardCard from "../components/DashboardCard";

function Dashboard() {
  return (
    <DashboardLayout>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-2 text-slate-600">
            Your complete college productivity overview.
          </p>
        </div>

        <button className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white">
          + Add Resource
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          icon="📈"
          title="Attendance"
          value="82%"
          description="Safe attendance status"
        />

        <DashboardCard
          icon="🎯"
          title="CGPA"
          value="8.1"
          description="Current academic score"
        />

        <DashboardCard
          icon="📝"
          title="Assignments"
          value="5"
          description="Pending submissions"
        />

        <DashboardCard
          icon="📚"
          title="Resources"
          value="24"
          description="Notes and PYQs shared"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Upcoming Deadlines
          </h2>

          <div className="mt-4 space-y-3">
            <div className="rounded-2xl bg-slate-100 p-4">
              <p className="font-semibold">Compiler Assignment</p>
              <p className="text-sm text-slate-500">Due tomorrow</p>
            </div>

            <div className="rounded-2xl bg-slate-100 p-4">
              <p className="font-semibold">DBMS Lab File</p>
              <p className="text-sm text-slate-500">Due in 3 days</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Recent Resources
          </h2>

          <div className="mt-4 space-y-3">
            <div className="rounded-2xl bg-slate-100 p-4">
              <p className="font-semibold">DAA Important Questions</p>
              <p className="text-sm text-slate-500">Uploaded by student</p>
            </div>

            <div className="rounded-2xl bg-slate-100 p-4">
              <p className="font-semibold">Cyber Security Notes</p>
              <p className="text-sm text-slate-500">Approved resource</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;