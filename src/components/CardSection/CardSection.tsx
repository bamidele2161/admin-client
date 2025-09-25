import { useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import ProductCard from "../Product/ProductCard";
import { useGetAllMostViewedProductsQuery } from "../../service/product";
import { selectProduct } from "../../store/slice/productSlice";
import { useAppSelector } from "../../hooks";
import SubNavbar from "../Header/SubNavbar";
import ProductCardSkeleton from "../Product/ProductCardSkeleton";
import { motion } from "framer-motion";

export interface FashionSection {
  title: string;
  products: any[];
}

const CardSection = () => {
  const [queryData, setQueryData] = useState<{
    [key: string]: string | number;
  }>({
    type: "most-viewed",
  });

  const { data, isLoading } = useGetAllMostViewedProductsQuery(queryData);

  const fashionSections: FashionSection[] = [
    {
      title: "Curated For You 🔥",
      products: data?.data?.slice(0, 10) || [],
    },
  ];

  return (
    <div className="flex flex-col gap-12 px-4 md:px-10">
      {fashionSections?.map((section, index) => (
        <EventRow
          key={index}
          section={section}
          setQueryData={setQueryData}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

const EventRow: React.FC<{
  section: FashionSection;
  setQueryData: any;
  isLoading: any;
}> = ({ section, setQueryData, isLoading }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { wishlist } = useAppSelector(selectProduct);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const renderProductSkeletons = () => {
    return (
      <div className="flex gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div className="flex-shrink-0 w-[175px] sm:w-[200px] md:w-[225px] lg:w-[250px]">
            <ProductCardSkeleton key={index} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col my-10">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col px-4 md:px-0"
      >
        <h3 className="font-semibold text-2xl md:text-3xl">{section.title}</h3>
        <p className="text-gray-600 mt-1 text-sm">
          Just for you, curated picks you'll love
        </p>
      </motion.div>

      <SubNavbar
        setQueryData={setQueryData}
        list={[
          { id: 1, value: "most-viewed", name: "Most Viewed" },
          { id: 2, value: "trending", name: "Trending" },
          { id: 3, value: "editor-pick", name: "Editor's Pick" },
          { id: 4, value: "best-seller", name: "Best Seller" },
          { id: 5, value: "new-in", name: "New In" },
          { id: 6, value: "most-viewed", name: "Inspired By Wiz" },
          { id: 7, name: "Inspired By Davido" },
          { id: 8, name: "Inspired By Ayra Star" },
          { id: 9, name: "Inspired By Burna" },
          { id: 10, name: "Inspired By Rema" },
        ]}
      />

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 bg-white/80 hover:bg-pryColor hover:text-white shadow-md"
        >
          <HiChevronLeft size={24} />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 bg-white/80 hover:bg-pryColor hover:text-white shadow-md"
        >
          <HiChevronRight size={24} />
        </button>
        <div className="overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar px-4"
          >
            {isLoading ? (
              renderProductSkeletons()
            ) : (
              <>
                {section.products.map((product) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0 w-[175px] sm:w-[200px] md:w-[225px] lg:w-[250px]"
                  >
                    <ProductCard
                      key={product?.id}
                      id={product?.id}
                      image={product?.thumbnails[0]}
                      name={product?.name}
                      brand={product?.vendor.businessName}
                      vendorId={product?.vendor.id}
                      description={product?.description}
                      price={product?.price}
                      rating={product?.rating}
                      stock={product?.stock}
                      showWishlist
                      wishlist={wishlist.includes(product.id)}
                      city={product?.vendor?.city}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSection;
