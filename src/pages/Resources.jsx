import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { supabase } from "../lib/supabaseClient";

function Resources() {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const fetchResources = async () => {
    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .eq("status", "Approved")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setResources(data || []);
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const filteredResources = resources.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.subject?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase());

    const matchesType = typeFilter === "All" || item.type === typeFilter;

    return matchesSearch && matchesType;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Notes & PYQ Hub
          </h1>
          <p className="mt-2 text-slate-600">
            Search approved notes, PYQs, viva questions, and study resources.
          </p>
        </div>

        <a
          href="/contribute"
          className="rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white"
        >
          + Contribute
        </a>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <input
          type="text"
          placeholder="Search by title, subject, or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl border border-slate-300 p-3 md:col-span-2"
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-xl border border-slate-300 p-3"
        >
          <option>All</option>
          <option>Notes</option>
          <option>PYQ</option>
          <option>Assignment</option>
          <option>Viva Questions</option>
          <option>Useful Link</option>
          <option>Placement Resource</option>
        </select>
      </div>

      <p className="mt-4 text-sm text-slate-500">
        Showing {filteredResources.length} resource(s)
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredResources.length === 0 ? (
          <p className="text-slate-500">No resources found.</p>
        ) : (
          filteredResources.map((item) => (
            <div key={item.id} className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                  {item.type}
                </span>

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                  {item.status}
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900">
                {item.title}
              </h2>

              <p className="mt-2 text-slate-600">{item.subject}</p>

              {item.description && (
                <p className="mt-2 text-sm text-slate-500">
                  {item.description}
                </p>
              )}

              {item.file_url ? (
                <a
                  href={item.file_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 block w-full rounded-xl bg-slate-950 p-3 text-center font-semibold text-white"
                >
                  View Resource
                </a>
              ) : (
                <button className="mt-5 w-full rounded-xl bg-slate-300 p-3 font-semibold text-slate-600">
                  No Link Available
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}

export default Resources;