import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

const initialResources = [
  {
    id: 1,
    title: "Compiler Construction Unit 3 Notes",
    subject: "Compiler Construction",
    type: "Notes",
    uploadedBy: "Student",
    status: "Pending",
  },
  {
    id: 2,
    title: "DBMS PYQ 2025",
    subject: "DBMS",
    type: "PYQ",
    uploadedBy: "Student",
    status: "Pending",
  },
];

function Admin() {
  const [resources, setResources] = useState(initialResources);

  const updateStatus = (id, status) => {
    setResources(
      resources.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
  };

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Admin Approval Panel
        </h1>
        <p className="mt-2 text-slate-600">
          Review, approve, or reject student-submitted resources.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4">
        {resources.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <div className="mb-3 flex gap-2">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                    {item.type}
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
                <p className="mt-1 text-slate-600">
                  {item.subject} • Uploaded by {item.uploadedBy}
                </p>
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
                  className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default Admin;