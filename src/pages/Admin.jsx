import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { supabase } from "../lib/supabaseClient";

function Admin() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingRole, setCheckingRole] = useState(true);

  const [stats, setStats] = useState({
    users: 0,
    resources: 0,
    assignments: 0,
    attendance: 0,
    cgpa: 0,
  });

  const checkAdminRole = async () => {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData?.user) {
      setIsAdmin(false);
      setCheckingRole(false);
      return;
    }

    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userData.user.id)
      .single();

    setIsAdmin(data?.role === "admin");
    setCheckingRole(false);
  };

  const fetchStats = async () => {
    const { count: users } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    const { count: resources } = await supabase
      .from("resources")
      .select("*", { count: "exact", head: true });

    const { count: assignments } = await supabase
      .from("assignments")
      .select("*", { count: "exact", head: true });

    const { count: attendance } = await supabase
      .from("attendance")
      .select("*", { count: "exact", head: true });

    const { count: cgpa } = await supabase
      .from("cgpa")
      .select("*", { count: "exact", head: true });

    setStats({
      users: users || 0,
      resources: resources || 0,
      assignments: assignments || 0,
      attendance: attendance || 0,
      cgpa: cgpa || 0,
    });
  };

  const fetchResources = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
    } else {
      setResources(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    checkAdminRole();
    fetchResources();
    fetchStats();
  }, []);

  const updateStatus = async (id, status) => {
    if (!isAdmin) {
      alert("Access denied");
      return;
    }

    const { error } = await supabase
      .from("resources")
      .update({ status })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchResources();
    fetchStats();
  };

  const deleteResource = async (id) => {
    if (!isAdmin) {
      alert("Access denied");
      return;
    }

    const { error } = await supabase.from("resources").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchResources();
    fetchStats();
  };

  if (checkingRole) {
    return (
      <DashboardLayout>
        <p className="text-slate-600">Checking admin access...</p>
      </DashboardLayout>
    );
  }

  if (!isAdmin) {
    return (
      <DashboardLayout>
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
          <p className="mt-2 text-slate-600">
            You do not have permission to access the admin panel.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const pendingCount = resources.filter((item) => item.status === "Pending").length;
  const approvedCount = resources.filter((item) => item.status === "Approved").length;
  const rejectedCount = resources.filter((item) => item.status === "Rejected").length;

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Admin Analytics & Approval Panel
        </h1>
        <p className="mt-2 text-slate-600">
          Monitor platform activity and manage submitted resources.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total Users</p>
          <h2 className="mt-2 text-3xl font-bold">{stats.users}</h2>
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total Resources</p>
          <h2 className="mt-2 text-3xl font-bold">{stats.resources}</h2>
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Assignments</p>
          <h2 className="mt-2 text-3xl font-bold">{stats.assignments}</h2>
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Attendance Records</p>
          <h2 className="mt-2 text-3xl font-bold">{stats.attendance}</h2>
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">CGPA Records</p>
          <h2 className="mt-2 text-3xl font-bold">{stats.cgpa}</h2>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Pending Resources</p>
          <h2 className="mt-2 text-3xl font-bold">{pendingCount}</h2>
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Approved Resources</p>
          <h2 className="mt-2 text-3xl font-bold">{approvedCount}</h2>
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Rejected Resources</p>
          <h2 className="mt-2 text-3xl font-bold">{rejectedCount}</h2>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4">
        {loading ? (
          <p className="text-slate-600">Loading resources...</p>
        ) : resources.length === 0 ? (
          <p className="text-slate-600">No resources submitted yet.</p>
        ) : (
          resources.map((item) => (
            <div key={item.id} className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                      {item.type || "Resource"}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        item.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900">
                    {item.title}
                  </h2>

                  <p className="mt-1 text-slate-600">{item.subject}</p>

                  {item.description && (
                    <p className="mt-2 text-sm text-slate-500">
                      {item.description}
                    </p>
                  )}

                  {item.file_url && (
                    <a
                      href={item.file_url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block text-sm font-semibold text-blue-600"
                    >
                      View submitted resource
                    </a>
                  )}
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    onClick={() => updateStatus(item.id, "Approved")}
                    className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(item.id, "Rejected")}
                    className="rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-white"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => deleteResource(item.id)}
                    className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}

export default Admin;