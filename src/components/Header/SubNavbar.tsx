import { type SetStateAction, type Dispatch, useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface CategoryProps {
  // setQueryData?: React.Dispatch<React.SetStateAction<string>>;
  // home?: boolean;
  setQueryData: Dispatch<SetStateAction<{ [key: string]: string | number }>>;
  list: any;
}

const SubNavbar: React.FC<CategoryProps> = ({ setQueryData, list }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<any>();
  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 200;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleCategoryClick = (category: {
    name: string;
    value: string;
    id: number;
  }) => {
    setActiveTab(category);
    setQueryData((prev) => ({
      ...prev,
      subCategoryItemId: category.id,
      offset: 0,
      limit: 5,
      type: category.value,
    }));
  };

  return (
    <div className="relative px-4 py-4">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 bg-white/80 hover:bg-pryColor hover:text-white shadow-md"
      >
        <HiChevronLeft size={20} />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 bg-white/80 hover:bg-pryColor hover:text-white shadow-md"
      >
        <HiChevronRight size={20} />
      </button>

      <div className="overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scroll-smooth no-scrollbar px-10"
        >
          {list?.map((category: any) => (
            <div
              key={category.id}
              className={`${
                category.id === activeTab?.id
                  ? "bg-pryColor text-white"
                  : "bg-secColor-Light text-pryColor"
              } flex-shrink-0 border rounded-3xl px-4 py-2 cursor-pointer hover:bg-pryColor hover:text-white transition-colors`}
              onClick={() => handleCategoryClick(category)}
            >
              <p className="whitespace-nowrap text-sm md:text-sm">
                {category?.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubNavbar;
