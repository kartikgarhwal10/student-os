import DashboardLayout from "../layouts/DashboardLayout";

const resources = [
  {
    title: "Compiler Construction Notes",
    subject: "Compiler Construction",
    type: "Notes",
    status: "Approved",
  },
  {
    title: "DBMS Previous Year Paper",
    subject: "DBMS",
    type: "PYQ",
    status: "Approved",
  },
  {
    title: "Java Viva Questions",
    subject: "Java",
    type: "Viva",
    status: "Approved",
  },
];

function Resources() {
  return (
    <DashboardLayout>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Notes & PYQ Hub
          </h1>
          <p className="mt-2 text-slate-600">
            Access approved notes, PYQs, viva questions, and study resources.
          </p>
        </div>

        <a
          href="/contribute"
          className="rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white"
        >
          + Contribute
        </a>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {resources.map((item, index) => (
          <div key={index} className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                {item.type}
              </span>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                {item.status}
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-900">{item.title}</h2>
            <p className="mt-2 text-slate-600">{item.subject}</p>

            <button className="mt-5 w-full rounded-xl bg-slate-950 p-3 font-semibold text-white">
              View Resource
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default Resources;