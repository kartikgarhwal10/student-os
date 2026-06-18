import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

function Attendance() {
  const [subject, setSubject] = useState("");
  const [totalClasses, setTotalClasses] = useState("");
  const [attendedClasses, setAttendedClasses] = useState("");
  const [requiredPercentage, setRequiredPercentage] = useState(75);

  const total = Number(totalClasses);
  const attended = Number(attendedClasses);
  const required = Number(requiredPercentage);

  const currentPercentage =
    total > 0 ? ((attended / total) * 100).toFixed(2) : 0;

  let requiredClasses = 0;
  let bunkableClasses = 0;

  if (total > 0 && attended >= 0) {
    if (Number(currentPercentage) < required) {
      requiredClasses = Math.ceil(
        (required * total - 100 * attended) / (100 - required)
      );
    } else {
      bunkableClasses = Math.floor(
        (100 * attended - required * total) / required
      );
    }
  }

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Attendance Calculator
        </h1>
        <p className="mt-2 text-slate-600">
          Track attendance and calculate safe bunks.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Enter Details</h2>

          <div className="mt-5 space-y-4">
            <input
              type="text"
              placeholder="Subject Name"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3"
            />

            <input
              type="number"
              placeholder="Total Classes"
              value={totalClasses}
              onChange={(e) => setTotalClasses(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3"
            />

            <input
              type="number"
              placeholder="Attended Classes"
              value={attendedClasses}
              onChange={(e) => setAttendedClasses(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3"
            />

            <input
              type="number"
              placeholder="Required Percentage"
              value={requiredPercentage}
              onChange={(e) => setRequiredPercentage(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3"
            />
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
          <h2 className="text-xl font-bold">Result</h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-slate-900 p-4">
              <p className="text-sm text-slate-400">Subject</p>
              <h3 className="text-2xl font-bold">
                {subject || "Not added"}
              </h3>
            </div>

            <div className="rounded-2xl bg-slate-900 p-4">
              <p className="text-sm text-slate-400">Current Attendance</p>
              <h3 className="text-4xl font-bold">{currentPercentage}%</h3>
            </div>

            <div className="rounded-2xl bg-slate-900 p-4">
              <p className="text-sm text-slate-400">Status</p>
              <h3 className="text-xl font-bold">
                {Number(currentPercentage) >= required
                  ? `Safe ✅ You can bunk ${bunkableClasses} classes`
                  : `Low ⚠️ Attend next ${requiredClasses} classes`}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Attendance;