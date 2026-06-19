import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardCard from "../components/DashboardCard";
import { supabase } from "../lib/supabaseClient";

function Dashboard() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("Student");
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [latestSgpa, setLatestSgpa] = useState("0.00");
  const [pendingAssignments, setPendingAssignments] = useState(0);
  const [approvedResources, setApprovedResources] = useState(0);
  const [upcomingAssignments, setUpcomingAssignments] = useState([]);
  const [recentResources, setRecentResources] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) return;

    const userId = userData.user.id;

    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", userId)
      .single();

    if (profile?.full_name) setUserName(profile.full_name);

    const { count: attendanceTotal } = await supabase
      .from("attendance")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    setAttendanceCount(attendanceTotal || 0);

    const { data: cgpaData } = await supabase
      .from("cgpa")
      .select("sgpa")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1);

    if (cgpaData?.length > 0) setLatestSgpa(cgpaData[0].sgpa);

    const { count: assignmentCount } = await supabase
      .from("assignments")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("status", "Pending");

    setPendingAssignments(assignmentCount || 0);

    const { count: resourceCount } = await supabase
      .from("resources")
      .select("*", { count: "exact", head: true })
      .eq("status", "Approved");

    setApprovedResources(resourceCount || 0);

    const { data: upcoming } = await supabase
      .from("assignments")
      .select("title, subject, due_date")
      .eq("user_id", userId)
      .eq("status", "Pending")
      .order("due_date", { ascending: true })
      .limit(3);

    setUpcomingAssignments(upcoming || []);

    const { data: resources } = await supabase
      .from("resources")
      .select("title, subject, type")
      .eq("status", "Approved")
      .order("created_at", { ascending: false })
      .limit(3);

    setRecentResources(resources || []);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-2 text-slate-600">Welcome back, {userName}.</p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white"
        >
          Logout
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          icon="📈"
          title="Attendance Records"
          value={attendanceCount}
          description="Subjects saved"
        />

        <DashboardCard
          icon="🎯"
          title="Latest SGPA"
          value={latestSgpa}
          description="Last saved semester score"
        />

        <DashboardCard
          icon="📝"
          title="Pending Assignments"
          value={pendingAssignments}
          description="Tasks still pending"
        />

        <DashboardCard
          icon="📚"
          title="Approved Resources"
          value={approvedResources}
          description="Notes and PYQs available"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Upcoming Deadlines
          </h2>

          <div className="mt-4 space-y-3">
            {upcomingAssignments.length === 0 ? (
              <p className="text-slate-500">No pending assignments.</p>
            ) : (
              upcomingAssignments.map((item, index) => (
                <div key={index} className="rounded-2xl bg-slate-100 p-4">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-slate-500">
                    {item.subject} - Due: {item.due_date}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Recent Resources
          </h2>

          <div className="mt-4 space-y-3">
            {recentResources.length === 0 ? (
              <p className="text-slate-500">No approved resources yet.</p>
            ) : (
              recentResources.map((item, index) => (
                <div key={index} className="rounded-2xl bg-slate-100 p-4">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-slate-500">
                    {item.subject} - {item.type}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;