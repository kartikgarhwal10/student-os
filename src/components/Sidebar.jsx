import { Link } from "react-router-dom";

const links = [
  ["Dashboard", "/dashboard"],
  ["Attendance", "/attendance"],
  ["CGPA", "/cgpa"],
  ["Assignments", "/assignments"],
  ["Resources", "/resources"],
  ["Contribute", "/contribute"],
  ["Admin", "/admin"],
];

function Sidebar() {
  return (
    <aside className="hidden lg:flex w-64 min-h-screen bg-slate-950 text-white p-6 flex-col">
      <h1 className="text-2xl font-bold mb-8">Student OS</h1>

      <nav className="space-y-2">
        {links.map(([name, path]) => (
          <Link
            key={path}
            to={path}
            className="block rounded-xl px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            {name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;