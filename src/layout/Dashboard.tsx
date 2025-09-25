import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { type DashboardLayoutProps } from "../interfaces/Global";

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };
  return (
    <main className="w-full gap-8 flex flex-col bg-white">
      <div className="flex">
        <section
          className={`fixed left-0 top-0 transition-all duration-300 ${
            collapsed ? "w-20" : "w-64"
          } min-h-screen border-r bg-[#254A76]`}
        >
          <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />{" "}
        </section>

        <aside
          style={{
            marginLeft: collapsed ? "5rem" : "16rem",
          }}
          className="w-full overflow-y-auto bg-pryColor-Lighter transition-all duration-300"
        >
          {children}
        </aside>
      </div>
    </main>
  );
};

export default DashboardLayout;
