import { Link } from "react-router-dom";

function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around border-t bg-white p-3 lg:hidden">
      <Link to="/dashboard" className="text-sm">Home</Link>
      <Link to="/attendance" className="text-sm">Attend</Link>
      <Link to="/cgpa" className="text-sm">CGPA</Link>
      <Link to="/resources" className="text-sm">Notes</Link>
    </nav>
  );
}

export default MobileNav;