import { ChevronRight } from "lucide-react";

interface MegaMenuProps {
  showCategories: boolean;
  categoryData: any;
  openCategory: string | null;
  openSubCategory: string | null;
  handleMouseEnter: (category: string | null, isMainCategory?: boolean) => void;
  handleMouseLeave: () => void;
  setOpenSubCategory: (subCategory: string | null) => void;
  navigate: (path: string, options?: any) => void;
  setShowCategories: (show: boolean) => void;
  setOpenCategory: (category: string | null) => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({
  //   showCategories,
  categoryData,
  openCategory,
  openSubCategory,
  handleMouseEnter,
  handleMouseLeave,
  setOpenSubCategory,
  navigate,
  setShowCategories,
  setOpenCategory,
}) => {
  return (
    <div
      className="absolute left-0 top-[44px] mt-2 bg-white shadow-xl rounded-md border border-gray-200 z-50 overflow-hidden w-[800px] flex"
      onMouseEnter={() => handleMouseEnter(null, true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Categories Column */}
      <div className="w-1/4 bg-gray-50 border-r border-gray-200 max-h-[450px] overflow-y-auto">
        <ul className="py-2">
          {Object.keys(categoryData || {}).map((category) => (
            <li
              key={category}
              className={`px-4 py-3 hover:bg-gray-100 cursor-pointer transition duration-200 ${
                openCategory === category ? "bg-gray-100 font-medium" : ""
              }`}
              onMouseEnter={() => handleMouseEnter(category)}
            >
              <div className="flex justify-between items-center w-full">
                <span className="text-sm">{category}</span>
                <ChevronRight size={16} className="text-gray-600" />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Sub-Categories Column */}
      {openCategory && (
        <div className="w-1/4 border-r border-gray-200 max-h-[450px] overflow-y-auto">
          <h3 className="font-medium px-4 py-2 border-b border-gray-200 bg-gray-50 text-sm">
            {openCategory}
          </h3>
          <ul className="py-2">
            {Object.keys(categoryData[openCategory] || {}).map(
              (subCategory) => (
                <li
                  key={subCategory}
                  className={`px-4 py-3 hover:bg-gray-100 cursor-pointer transition duration-200 ${
                    openSubCategory === subCategory
                      ? "bg-gray-100 font-medium"
                      : ""
                  }`}
                  onMouseEnter={() => setOpenSubCategory(subCategory)}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-sm">{subCategory}</span>
                    <ChevronRight size={16} className="text-gray-600" />
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      )}

      {/* Items Column */}
      {openCategory && openSubCategory && (
        <div className="w-2/4 max-h-[450px] overflow-y-auto">
          <h3 className="font-medium px-4 py-2 border-b border-gray-200 bg-gray-50 text-sm">
            {openSubCategory}
          </h3>
          <ul className="py-2 grid grid-cols-2 gap-1">
            {categoryData[openCategory]?.[openSubCategory]?.map((item: any) => (
              <li
                key={item.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition duration-200"
                onClick={() => {
                  navigate("/", {
                    state: { subCategoryItemId: item.id },
                  });
                  setShowCategories(false);
                  setOpenCategory(null);
                  setOpenSubCategory(null);
                }}
              >
                <span className="text-sm">{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Empty State for Third Column */}
      {openCategory && !openSubCategory && (
        <div className="w-2/4 flex items-center justify-center text-gray-500">
          <div className="text-center p-6">
            <p>Select a subcategory</p>
          </div>
        </div>
      )}

      {/* Empty State when No Category Selected */}
      {!openCategory && (
        <div className="w-3/4 flex items-center justify-center text-gray-500">
          <div className="text-center p-6">
            <p>Select a category to browse items</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MegaMenu;
