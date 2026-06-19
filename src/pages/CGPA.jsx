import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { supabase } from "../lib/supabaseClient";

const gradePoints = {
  O: 10,
  "A+": 9,
  A: 8,
  "B+": 7,
  B: 6,
  C: 5,
  F: 0,
};

function CGPA() {
  const [subjects, setSubjects] = useState([
    { name: "", credits: "", grade: "A" },
  ]);

  const [semester, setSemester] = useState("");
  const [savedCgpa, setSavedCgpa] = useState([]);

  const addSubject = () => {
    setSubjects([...subjects, { name: "", credits: "", grade: "A" }]);
  };

  const updateSubject = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  const removeSubject = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const totalCredits = subjects.reduce(
    (sum, subject) => sum + Number(subject.credits || 0),
    0
  );

  const totalPoints = subjects.reduce((sum, subject) => {
    return sum + Number(subject.credits || 0) * gradePoints[subject.grade];
  }, 0);

  const sgpa =
    totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";

  const fetchCgpa = async () => {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData?.user) return;

    const { data } = await supabase
      .from("cgpa")
      .select("*")
      .eq("user_id", userData.user.id)
      .order("created_at", { ascending: false });

    if (data) {
      setSavedCgpa(data);
    }
  };

  useEffect(() => {
    fetchCgpa();
  }, []);

  const saveCgpa = async () => {
    if (!semester) {
      alert("Please enter semester");
      return;
    }

    if (totalCredits === 0) {
      alert("Please add subject credits");
      return;
    }

    const { data: userData } = await supabase.auth.getUser();

    if (!userData?.user) {
      alert("Please login first");
      return;
    }

    const { error } = await supabase.from("cgpa").insert({
      user_id: userData.user.id,
      semester: Number(semester),
      sgpa: Number(sgpa),
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("SGPA saved successfully");
    setSemester("");
    fetchCgpa();
  };

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-slate-900">CGPA Planner</h1>
        <p className="mt-2 text-slate-600">
          Calculate SGPA using subject credits and grades.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <h2 className="text-xl font-bold text-slate-900">Subjects</h2>

            <button
              onClick={addSubject}
              className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white"
            >
              + Add Subject
            </button>
          </div>

          <input
            type="number"
            placeholder="Semester Number"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="mt-5 w-full rounded-xl border border-slate-300 p-3"
          />

          <div className="mt-5 space-y-4">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-3 rounded-2xl bg-slate-100 p-4 md:grid-cols-4"
              >
                <input
                  type="text"
                  placeholder="Subject"
                  value={subject.name}
                  onChange={(e) =>
                    updateSubject(index, "name", e.target.value)
                  }
                  className="rounded-xl border border-slate-300 p-3 md:col-span-2"
                />

                <input
                  type="number"
                  placeholder="Credits"
                  value={subject.credits}
                  onChange={(e) =>
                    updateSubject(index, "credits", e.target.value)
                  }
                  className="rounded-xl border border-slate-300 p-3"
                />

                <select
                  value={subject.grade}
                  onChange={(e) =>
                    updateSubject(index, "grade", e.target.value)
                  }
                  className="rounded-xl border border-slate-300 p-3"
                >
                  {Object.keys(gradePoints).map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>

                {subjects.length > 1 && (
                  <button
                    onClick={() => removeSubject(index)}
                    className="rounded-xl bg-red-100 p-3 font-semibold text-red-600 md:col-span-4"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
          <h2 className="text-xl font-bold">Result</h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-slate-900 p-4">
              <p className="text-sm text-slate-400">Total Credits</p>
              <h3 className="text-3xl font-bold">{totalCredits}</h3>
            </div>

            <div className="rounded-2xl bg-slate-900 p-4">
              <p className="text-sm text-slate-400">SGPA</p>
              <h3 className="text-5xl font-bold">{sgpa}</h3>
            </div>

            <button
              onClick={saveCgpa}
              className="w-full rounded-xl bg-green-600 p-3 font-semibold text-white"
            >
              Save SGPA
            </button>

            <p className="text-sm text-slate-400">
              Grade points: O=10, A+=9, A=8, B+=7, B=6, C=5, F=0
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Saved SGPA History</h2>

        <div className="mt-4 space-y-3">
          {savedCgpa.length === 0 ? (
            <p className="text-slate-500">No SGPA records saved yet.</p>
          ) : (
            savedCgpa.map((item) => (
              <div key={item.id} className="rounded-2xl bg-slate-100 p-4">
                <h3 className="font-bold">Semester {item.semester}</h3>
                <p className="text-slate-600">SGPA: {item.sgpa}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CGPA;