import { HiEllipsisHorizontal, HiOutlineXMark } from "react-icons/hi2";
import type { ReactNode } from "react";

export const StatusBadge = ({ value }: { value?: string }) => {
  const normalized = (value || "Unknown").toUpperCase();
  const tone = ["APPROVED", "ACTIVE", "DELIVERED", "PAID", "COMPLETED"].includes(normalized)
    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
    : ["REJECTED", "INACTIVE", "CANCELED", "CANCELLED", "FAILED"].includes(normalized)
    ? "bg-red-50 text-red-700 border-red-200"
    : ["PENDING", "PROCESSING", "SHIPPED", "ACTIVE"].includes(normalized)
    ? "bg-amber-50 text-amber-800 border-amber-200"
    : "bg-[#EEF1F3] text-[#566170] border-black/10";
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-[.08em] ${tone}`}>{normalized}</span>;
};

export const ActionButton = ({ onClick, label = "Open actions" }: { onClick: () => void; label?: string }) => (
  <button type="button" aria-label={label} onClick={onClick} className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-[#566170] transition hover:border-[#151A22] hover:bg-[#151A22] hover:text-white">
    <HiEllipsisHorizontal size={20} />
  </button>
);

export const AdminModal = ({ title, eyebrow = "Record actions", onClose, children }: { title: string; eyebrow?: string; onClose: () => void; children: ReactNode }) => (
  <div className="fixed inset-0 z-[100] flex items-end justify-center bg-[#151A22]/55 p-3 backdrop-blur-sm sm:items-center" onMouseDown={onClose}>
    <section role="dialog" aria-modal="true" aria-label={title} onMouseDown={(event) => event.stopPropagation()} className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[1.75rem] bg-[#F8F7F3] p-6 shadow-2xl sm:p-8">
      <header className="mb-7 flex items-start justify-between gap-5">
        <div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#6F8294]">{eyebrow}</p><h2 className="mt-2 font-spaceGrotesk text-2xl font-semibold tracking-[-.03em] text-[#151A22] sm:text-3xl">{title}</h2></div>
        <button type="button" aria-label="Close modal" onClick={onClose} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white"><HiOutlineXMark size={20}/></button>
      </header>
      {children}
    </section>
  </div>
);

export const DetailGrid = ({ items }: { items: Array<{ label: string; value?: ReactNode }> }) => (
  <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-black/[.08] bg-black/[.08] sm:grid-cols-2">
    {items.map((item) => <div key={item.label} className="bg-white p-4"><dt className="text-[10px] font-bold uppercase tracking-[.14em] text-[#6F8294]">{item.label}</dt><dd className="mt-1.5 break-words text-sm font-semibold text-[#151A22]">{item.value || "—"}</dd></div>)}
  </dl>
);
