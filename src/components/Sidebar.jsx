import { NavLink } from "react-router-dom";

const links = [
  ["🏠", "Dashboard", "/dashboard"],
  ["📈", "Attendance", "/attendance"],
  ["🎯", "CGPA", "/cgpa"],
  ["📝", "Assignments", "/assignments"],
  ["📚", "Resources", "/resources"],
  ["⬆️", "Contribute", "/contribute"],
  ["🛡️", "Admin", "/admin"],
];

function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-72 flex-col bg-slate-950 p-6 text-white lg:flex">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Student OS</h1>
        <p className="mt-1 text-sm text-slate-400">by KartikLabs</p>
      </div>

      <nav className="space-y-2">
        {links.map(([icon, name, path]) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <span>{icon}</span>
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto rounded-2xl bg-slate-900 p-4">
        <p className="text-sm font-semibold">Student Productivity</p>
        <p className="mt-1 text-xs text-slate-400">
          Manage academics, resources, and placements.
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;