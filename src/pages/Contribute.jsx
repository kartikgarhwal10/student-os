import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

function Contribute() {
  const [resourceType, setResourceType] = useState("Notes");

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Contribute Resource
        </h1>
        <p className="mt-2 text-slate-600">
          Share notes, PDFs, PYQs, viva questions, assignments, or useful links.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-xl font-bold text-slate-900">
            Resource Details
          </h2>

          <div className="mt-5 space-y-4">
            <input
              type="text"
              placeholder="Resource Title"
              className="w-full rounded-xl border border-slate-300 p-3"
            />

            <input
              type="text"
              placeholder="Subject Name"
              className="w-full rounded-xl border border-slate-300 p-3"
            />

            <select
              value={resourceType}
              onChange={(e) => setResourceType(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3"
            >
              <option>Notes</option>
              <option>PYQ</option>
              <option>Assignment</option>
              <option>Viva Questions</option>
              <option>Useful Link</option>
              <option>Placement Resource</option>
            </select>

            <textarea
              placeholder="Short description"
              rows="4"
              className="w-full rounded-xl border border-slate-300 p-3"
            />

            <input
              type="file"
              className="w-full rounded-xl border border-slate-300 p-3"
            />

            <input
              type="url"
              placeholder="External Link (optional)"
              className="w-full rounded-xl border border-slate-300 p-3"
            />

            <button className="w-full rounded-xl bg-blue-600 p-3 font-semibold text-white">
              Submit for Review
            </button>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
          <h2 className="text-xl font-bold">How it works?</h2>

          <div className="mt-5 space-y-4 text-slate-300">
            <p>1. Student uploads resource.</p>
            <p>2. Resource goes into pending review.</p>
            <p>3. Admin verifies quality.</p>
            <p>4. Approved resource becomes public.</p>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-900 p-4">
            <p className="text-sm text-slate-400">Selected Type</p>
            <h3 className="mt-1 text-2xl font-bold">{resourceType}</h3>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Contribute;