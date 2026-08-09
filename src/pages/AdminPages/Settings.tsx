import { useState, type ChangeEvent, type FormEvent } from "react";
import { HiOutlineLockClosed, HiOutlineUserCircle } from "react-icons/hi2";
import Navbar from "../../components/Navbar/Navbar";
import { selectAuth } from "../../store/slice/authSlice";
import { useAppSelector } from "../../hooks";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");
  const { userInfo } = useAppSelector(selectAuth);
  const [formData, setFormData] = useState({adminName:userInfo?.fullName || "",email:userInfo?.email || "",phoneNumber:userInfo?.phoneNumber || "",currentPassword:"",newPassword:"",confirmPassword:""});
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setFormData({...formData,[event.target.name]:event.target.value});
  const handleSubmit = (event: FormEvent) => { event.preventDefault(); alert(activeTab === "profile" ? "Profile settings updated" : "Security settings updated"); };
  const Field = ({label,name,type="text",placeholder}:{label:string;name:keyof typeof formData;type?:string;placeholder?:string}) => <label className="block"><span className="mb-2 block text-xs font-semibold text-pryColor">{label}</span><input type={type} name={name} value={formData[name]} onChange={handleChange} placeholder={placeholder} className="w-full border px-4 py-3" /></label>;

  return <div className="flex min-h-screen flex-col gap-6">
    <Navbar title="Settings" subtitle="Manage your admin identity and account security" />
    <div className="grid gap-6 px-10 pb-16 lg:grid-cols-[300px_1fr]">
      <aside className="admin-panel h-fit bg-pryColor !p-3 text-white">
        <div className="p-5"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-white/45">Workspace settings</p><h2 className="mt-2 font-spaceGrotesk text-2xl font-semibold">Your account</h2><p className="mt-2 text-sm leading-6 text-white/55">Keep your profile accurate and protect administrator access.</p></div>
        <nav className="space-y-1">{([{id:"profile",label:"Profile details",icon:HiOutlineUserCircle},{id:"security",label:"Password & security",icon:HiOutlineLockClosed}] as const).map(item => <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex w-full items-center gap-3 rounded-full px-4 py-3 text-left text-sm transition ${activeTab === item.id ? "bg-white font-semibold text-pryColor" : "text-white/65 hover:bg-white/10 hover:text-white"}`}><item.icon size={18}/>{item.label}</button>)}</nav>
      </aside>
      <section className="admin-panel !p-6 sm:!p-9">
        <div className="mb-8"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-secColor">{activeTab === "profile" ? "Identity" : "Secure access"}</p><h2 className="mt-2 font-spaceGrotesk text-3xl font-semibold tracking-[-.035em]">{activeTab === "profile" ? "Profile details" : "Change password"}</h2><p className="mt-2 max-w-xl text-sm leading-6 text-lightGreyColor">{activeTab === "profile" ? "Information used to identify you throughout the admin workspace." : "Choose a strong, unique password for your Ashobox administrator account."}</p></div>
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
          {activeTab === "profile" ? <><div className="flex items-center gap-4 rounded-2xl bg-[#DCE4E8] p-4"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-pryColor font-spaceGrotesk text-2xl font-semibold text-white">{formData.adminName.charAt(0) || "A"}</div><div><p className="font-semibold">{formData.adminName || "Administrator"}</p><p className="mt-1 text-xs text-lightGreyColor">Ashobox administrator</p></div></div><div className="grid gap-5 sm:grid-cols-2"><Field label="Full name" name="adminName"/><Field label="Phone number" name="phoneNumber"/></div><Field label="Email address" name="email" type="email"/></> : <><Field label="Current password" name="currentPassword" type="password" placeholder="Enter current password"/><div className="grid gap-5 sm:grid-cols-2"><Field label="New password" name="newPassword" type="password"/><Field label="Confirm new password" name="confirmPassword" type="password"/></div><div className="rounded-2xl bg-[#EEF1F3] p-5"><p className="text-sm font-semibold">A strong password should include</p><p className="mt-2 text-xs leading-6 text-lightGreyColor">At least 8 characters, with uppercase and lowercase letters, a number, and a special character.</p></div></>}
          <div className="flex justify-end border-t border-black/[.08] pt-6"><button type="submit" className="rounded-full bg-pryColor px-6 py-3 text-sm font-semibold text-white">{activeTab === "profile" ? "Save profile" : "Update password"}</button></div>
        </form>
      </section>
    </div>
  </div>;
};
export default AdminSettings;
