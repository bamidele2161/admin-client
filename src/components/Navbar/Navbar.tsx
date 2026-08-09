import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { type NavbarProps } from "../../interfaces/Global";
import { selectAuth } from "../../store/slice/authSlice";
import { adminSidebarData } from "../Sidebar/SidebarData";

const Navbar: React.FC<NavbarProps> = ({ title, subtitle }) => {
  const { userInfo } = useAppSelector(selectAuth);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <>
    <header className="admin-navbar relative flex items-center justify-between gap-4 px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
      <div className="flex min-w-0 items-center gap-3">
        <button aria-label="Open navigation" onClick={() => setMenuOpen(true)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white lg:hidden"><HiOutlineBars3 size={20} /></button>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[.2em] text-lightGreyColor">Ashobox operations</p>
          <h1 className="truncate font-spaceGrotesk text-2xl font-semibold leading-none tracking-[-.035em] text-pryColor sm:text-4xl">{title}</h1>
          <p className="mt-2 hidden text-sm font-normal leading-5 text-lightGreyColor sm:block">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-full border border-black/10 bg-white/65 p-1.5 sm:pr-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pryColor sm:h-12 sm:w-12">
          <span className="font-spaceGrotesk text-lg font-semibold text-white">{userInfo?.fullName?.charAt(0) || "A"}</span>
        </div>
        <div className="hidden flex-col sm:flex">
          <p className="text-sm font-semibold text-greyColr">{userInfo?.fullName || "Administrator"}</p>
          <p className="text-xs font-medium text-lightGreyColor">Ashobox admin</p>
        </div>
      </div>

    </header>
    {menuOpen && createPortal(
      <div className="fixed inset-0 z-[200] bg-pryColor/45 backdrop-blur-sm lg:hidden" onClick={() => setMenuOpen(false)}>
        <nav aria-label="Admin navigation" className="h-dvh w-[min(86vw,330px)] overflow-y-auto bg-pryColor p-5 text-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
          <div className="sticky top-0 z-10 mb-7 flex items-center justify-between bg-pryColor pb-3"><div><p className="font-spaceGrotesk text-xl font-semibold">ashobox</p><p className="text-[9px] font-bold uppercase tracking-[.22em] text-white/45">Admin studio</p></div><button aria-label="Close navigation" onClick={() => setMenuOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15"><HiOutlineXMark size={22} /></button></div>
          <ul className="space-y-1.5">{adminSidebarData.map((item) => <li key={item.id}><NavLink to={item.url} onClick={() => setMenuOpen(false)} className={({isActive}) => `flex items-center gap-3 rounded-full px-4 py-3 text-sm ${isActive ? "bg-white font-semibold text-pryColor" : "text-white/75"}`}><item.icon size={18} />{item.title}</NavLink></li>)}</ul>
        </nav>
      </div>,
      document.body
    )}
    </>
  );
};

export default Navbar;
