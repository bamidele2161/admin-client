import { NavLink, useNavigate } from "react-router-dom";
import { adminSidebarData, SidebarData } from "./SidebarData";
import { LogoutIcon } from "../../assets/svg/CustomSVGs";
import { type SidebarDataProps } from "../../interfaces/Global";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import { VendorBrandIcon } from "../../assets/svg/Product";
import { LogoutAdmin, LogoutUser } from "../../util";
import { useAppSelector } from "../../hooks";
import { selectAuth } from "../../store/slice/authSlice";

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const { userInfo } = useAppSelector(selectAuth);

  const features = userInfo?.role === "VENDOR" ? SidebarData : adminSidebarData;
  return (
    <main
      className={`sidebar-container relative flex h-dvh flex-col overflow-y-auto overflow-x-hidden transition-[width] duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-64"
      } bg-pryColor text-white`}
    >
      <button
        type="button"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="fixed top-16 z-[60] flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-[#242B35] shadow-lg transition-[left,background-color] duration-300 hover:bg-[#313946]"
        style={{ left: collapsed ? "4rem" : "15rem" }}
        onClick={toggleSidebar}
      >
        {collapsed ? <HiOutlineChevronRight size={16} /> : <HiOutlineChevronLeft size={16} />}
      </button>

      <div className="flex flex-col gap-4 p-5 pb-3">
        <div
          className={`flex items-center gap-3 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <VendorBrandIcon className="w-12" />
          {!collapsed && (
            <div><h1 className="font-spaceGrotesk text-xl font-semibold tracking-tight text-white">ashobox</h1><p className="mt-0.5 text-[9px] font-bold uppercase tracking-[.22em] text-white/45">Admin studio</p></div>
          )}
        </div>

        <div
          className={`mt-7 border-t border-white/10 pt-5 ${
            collapsed ? "px-0" : "px-2"
          }`}
        >
          <ul className="flex flex-col gap-1.5">
            {features.map((item: SidebarDataProps) => (
              <li key={item.id}>
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    `flex items-center rounded-full transition-all duration-300 ease-in-out px-3 py-2.5 hover:bg-white/10 ${
                      isActive
                        ? "bg-white text-pryColor font-semibold shadow-md"
                        : "text-white font-normal"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <div
                      className={`flex items-center ${
                        collapsed ? "justify-center" : "justify-between w-full"
                      }`}
                    >
                      <div
                        className={`flex items-center ${
                          collapsed ? "justify-center" : "gap-3"
                        }`}
                      >
                        <div className="flex-shrink-0">
                          <item.icon size={18} color={isActive ? "#151A22" : "currentColor"} />
                        </div>

                        {!collapsed && (
                          <span
                            className={`text-sm transition-all ${
                              isActive ? "opacity-100" : "opacity-90"
                            }`}
                          >
                            {item.title}
                          </span>
                        )}
                      </div>

                      {!collapsed && isActive && (
                        <div className="h-1.5 w-1.5 rounded-full bg-secColor"></div>
                      )}
                    </div>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="mt-auto shrink-0 cursor-pointer border-t border-white/10 p-5"
        onClick={() =>
          userInfo?.role === "VENDOR"
            ? LogoutUser(navigate)
            : LogoutAdmin(navigate)
        }
      >
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          }`}
        >
          <div className="flex-shrink-0">
            <LogoutIcon />
          </div>

          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </div>
      </div>
    </main>
  );
};

export default Sidebar;
