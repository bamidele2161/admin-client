import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CartIcon, HeartIcon, UserIcon } from "../../assets/svg/CustomSVGs";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  selectProduct,
  setCurrentShoppingStep,
} from "../../store/slice/productSlice";
import { useGlobalHooks } from "../../hooks/globalHooks";
import { selectAuth } from "../../store/slice/authSlice";
import { navItems } from "../../util";
import { useGetAllProductCategoryQuery } from "../../service/product";
import Search from "../Search/Search";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { BrandIcon, BrandMobileIcon } from "../../assets/svg/Product";
import MegaMenu from "../MegaMenu/MegaMenu";
import { ChevronDown } from "lucide-react";
import UserCard from "./UserCard";

const Header = ({ setQueryData }: { setQueryData: any }) => {
  const { cart } = useAppSelector(selectProduct);
  const navigate = useNavigate();
  const { handleShow } = useGlobalHooks();
  const profileRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(selectAuth);
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const { data } = useGetAllProductCategoryQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openSubCategory, setOpenSubCategory] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  let closeTimeout: any | null = null;

  const cartCount = cart?.reduce((total, item) => total + item.quantity, 0);

  const handleAuth = () => {
    if (userInfo?.role === "CUSTOMER") {
      setOpenProfile(!openProfile);
    } else {
      handleShow("auth");
    }
  };

  const handleMouseEnter = (
    category: string | null,
    isMainCategory = false
  ) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
    }

    if (isMainCategory) {
      setShowCategories(true);
    }
    if (category) {
      setOpenCategory(category);
      setOpenSubCategory(null);
    }
  };

  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => {
      setShowCategories(false);
      setOpenCategory(null);
      setOpenSubCategory(null);
    }, 300); // Reduced timeout for better UX
  };

  const categoryData = data?.data?.reduce((acc: any, category: any) => {
    acc[category.name] = category.subCategories.reduce(
      (subAcc: any, subCategory: any) => {
        subAcc[subCategory.name] = subCategory.items.map((item: any) => ({
          name: item.name,
          id: item.id,
        }));
        return subAcc;
      },
      {}
    );
    return acc;
  }, {});

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white sticky top-0 z-40 w-full border-b">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-pryColor"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
            </button>
          </div>

          <div className="flex items-center gap-6">
            <BrandIcon
              className="lg:h-10 md:h-8 w-auto hidden md:block"
              onClick={() => navigate("/")}
            />

            <BrandMobileIcon
              className="h-8 w-auto md:hidden"
              onClick={() => navigate("/")}
            />

            <nav className="hidden lg:flex">
              <ul className="flex gap-6">
                {navItems.map((item, index) => (
                  <li
                    key={index}
                    className="relative cursor-pointer font-normal text-base"
                    onMouseEnter={() =>
                      index === 1 && handleMouseEnter(null, true)
                    }
                    onMouseLeave={handleMouseLeave}
                  >
                    {index === 1 ? (
                      <div className="text-black hover:text-pryColor hover:font-semibold font-medium transition duration-300 text-sm flex items-center gap-1 mt-[3px]">
                        {item.name}
                        <ChevronDown
                          size={16}
                          className="transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <NavLink
                        to={item.path}
                        className="text-black hover:text-pryColor hover:font-semibold font-medium transition duration-300 text-sm"
                      >
                        {item.name}
                      </NavLink>
                    )}

                    {showCategories && index === 1 && categoryData && (
                      <MegaMenu
                        showCategories={showCategories}
                        categoryData={categoryData}
                        openCategory={openCategory}
                        openSubCategory={openSubCategory}
                        handleMouseEnter={handleMouseEnter}
                        handleMouseLeave={handleMouseLeave}
                        setOpenSubCategory={setOpenSubCategory}
                        navigate={navigate}
                        setShowCategories={setShowCategories}
                        setOpenCategory={setOpenCategory}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Search - Hidden on mobile, shown on tablet and up */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <Search setQueryData={setQueryData} />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div
              className="relative cursor-pointer hidden sm:block"
              onClick={() => navigate("/wishlist")}
            >
              <HeartIcon />
            </div>
            <div
              className="relative cursor-pointer"
              onClick={() => {
                navigate("/shopping");
                dispatch(setCurrentShoppingStep(1));
              }}
            >
              <CartIcon />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="relative cursor-pointer" onClick={handleAuth}>
              {userInfo && userInfo?.role === "CUSTOMER" ? (
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-[#f1f2f3] rounded-full">
                  <h3 className="text-pryColor font-semibold text-sm sm:text-base">
                    {userInfo?.fullName?.charAt(0)}
                  </h3>
                </div>
              ) : (
                <UserIcon className="w-6 h-6" />
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search - Shown only on mobile */}
        <div className="md:hidden py-2">
          <Search setQueryData={setQueryData} />
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white py-4 border-t">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className="block px-4 py-2 text-gray-700 hover:text-pryColor hover:bg-gray-50 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </NavLink>

                  {index === 1 && (
                    <div className="pl-6 mt-1 space-y-1">
                      {Object.keys(categoryData || {}).map((category) => (
                        <div key={category}>
                          <button
                            className="w-full text-left px-4 py-2 text-gray-700 hover:text-pryColor hover:bg-gray-50 rounded-md flex justify-between items-center"
                            onClick={() =>
                              setOpenCategory(
                                openCategory === category ? null : category
                              )
                            }
                          >
                            {category}
                            <svg
                              className={`w-4 h-4 transform ${
                                openCategory === category ? "rotate-90" : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>

                          {openCategory === category && (
                            <div className="pl-4 space-y-1">
                              {Object.keys(categoryData[category] || {}).map(
                                (subCategory) => (
                                  <div key={subCategory}>
                                    <button
                                      className="w-full text-left px-4 py-2 text-gray-700 hover:text-pryColor hover:bg-gray-50 rounded-md flex justify-between items-center"
                                      onClick={() =>
                                        setOpenSubCategory(
                                          openSubCategory === subCategory
                                            ? null
                                            : subCategory
                                        )
                                      }
                                    >
                                      {subCategory}
                                      <svg
                                        className={`w-4 h-4 transform ${
                                          openSubCategory === subCategory
                                            ? "rotate-90"
                                            : ""
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M9 5l7 7-7 7"
                                        />
                                      </svg>
                                    </button>

                                    {openSubCategory === subCategory && (
                                      <div className="pl-4 space-y-1">
                                        {categoryData[category][
                                          subCategory
                                        ].map((item: any) => (
                                          <NavLink
                                            key={item.id}
                                            to="/products"
                                            state={{
                                              subCategoryItemId: item.id,
                                            }}
                                            className="block px-4 py-2 text-gray-700 hover:text-pryColor hover:bg-gray-50 rounded-md"
                                            onClick={() =>
                                              setMobileMenuOpen(false)
                                            }
                                          >
                                            {item.name}
                                          </NavLink>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ))}
              <li>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:text-pryColor hover:bg-gray-50 rounded-md"
                  onClick={() => {
                    navigate("/wishlist");
                    setMobileMenuOpen(false);
                  }}
                >
                  Wishlist
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {openProfile && (
        <div
          ref={profileRef}
          id="user"
          className="absolute right-4 md:right-10 md:m-3 top-[50px] md:top-[67px] w-1/2 md:w-3/12 lg:w-2/12"
        >
          <UserCard />
        </div>
      )}
    </header>
  );
};

export default Header;
