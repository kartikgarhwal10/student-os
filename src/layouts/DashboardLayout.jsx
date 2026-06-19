import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";


function DashboardLayout({ children }) {
  return (
   <div className="min-h-screen bg-slate-100">
      <div className="flex">
        <Sidebar />

        <main className="w-full p-4 pb-20 md:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
           

            {children}
          </div>
        </main>
      </div>

      <MobileNav />
    </div>
  );
}

export default DashboardLayout;