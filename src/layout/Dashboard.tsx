import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { type DashboardLayoutProps } from "../interfaces/Global";

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };
  return (
    <main className="admin-shell min-h-screen w-full bg-pryColor-Lighter">
      <div className="min-w-0">
        <section
          className={`fixed inset-y-0 left-0 z-50 hidden transition-[width] duration-300 lg:block ${
            collapsed ? "w-20" : "w-64"
          }`}
        >
          <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />{" "}
        </section>

        <aside className={`min-h-screen min-w-0 overflow-x-hidden bg-pryColor-Lighter transition-[margin] duration-300 ${collapsed ? "lg:ml-20" : "lg:ml-64"}`}>
          {children}
        </aside>
      </div>
    </main>
  );
};

export default DashboardLayout;
