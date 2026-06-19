import { NavLink } from "react-router-dom";

const links = [
  ["🏠", "Home", "/dashboard"],
  ["📈", "Attend", "/attendance"],
  ["🎯", "CGPA", "/cgpa"],
  ["📚", "Notes", "/resources"],
];

function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white px-3 py-2 shadow-lg lg:hidden">
      <div className="flex justify-around">
        {links.map(([icon, name, path]) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center rounded-xl px-3 py-2 text-xs font-medium ${
                isActive ? "bg-blue-100 text-blue-700" : "text-slate-500"
              }`
            }
          >
            <span className="text-lg">{icon}</span>
            <span>{name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default MobileNav;