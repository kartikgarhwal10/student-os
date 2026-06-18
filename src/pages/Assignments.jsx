import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");

  const addAssignment = () => {
    if (!title || !subject || !dueDate) return;

    setAssignments([
      ...assignments,
      {
        id: Date.now(),
        title,
        subject,
        dueDate,
        status: "Pending",
      },
    ]);

    setTitle("");
    setSubject("");
    setDueDate("");
  };

  const toggleStatus = (id) => {
    setAssignments(
      assignments.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Pending" ? "Completed" : "Pending",
            }
          : item
      )
    );
  };

  const deleteAssignment = (id) => {
    setAssignments(assignments.filter((item) => item.id !== id));
  };

  const pendingCount = assignments.filter(
    (item) => item.status === "Pending"
  ).length;

  const completedCount = assignments.filter(
    (item) => item.status === "Completed"
  ).length;

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Assignment Tracker
        </h1>
        <p className="mt-2 text-slate-600">
          Track submissions, deadlines, and completion status.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Add Assignment
          </h2>

          <div className="mt-5 space-y-4">
            <input
              type="text"
              placeholder="Assignment Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3"
            />

            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3"
            />

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3"
            />

            <button
              onClick={addAssignment}
              className="w-full rounded-xl bg-blue-600 p-3 font-semibold text-white"
            >
              + Add Assignment
            </button>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm lg:col-span-2">
          <h2 className="text-xl font-bold">Overview</h2>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-slate-900 p-4">
              <p className="text-sm text-slate-400">Pending</p>
              <h3 className="text-3xl font-bold">{pendingCount}</h3>
            </div>

            <div className="rounded-2xl bg-slate-900 p-4">
              <p className="text-sm text-slate-400">Completed</p>
              <h3 className="text-3xl font-bold">{completedCount}</h3>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {assignments.length === 0 ? (
              <p className="text-slate-400">No assignments added yet.</p>
            ) : (
              assignments.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-slate-900 p-4"
                >
                  <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                    <div>
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="text-sm text-slate-400">
                        {item.subject} • Due: {item.dueDate}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleStatus(item.id)}
                        className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white"
                      >
                        {item.status}
                      </button>

                      <button
                        onClick={() => deleteAssignment(item.id)}
                        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Assignments;