import React from "react";

interface VendorInfoProps {
  vendor: {
    businessName?: string;
    businessLogo?: string;
  };
}

const VendorInfo: React.FC<VendorInfoProps> = ({ vendor }) => {
  if (!vendor) return null;

  return (
    <div className="flex items-center">
      {vendor?.businessLogo ? (
        <img
          src={vendor?.businessLogo}
          alt="Vendor Logo"
          className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-3 md:mr-4"
        />
      ) : (
        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-[#f1f2f3] rounded-full border-2">
          <h3 className="text-pryColor-DEFAULT font-semibold text-lg md:text-xl">
            {vendor?.businessName?.charAt(0)}
          </h3>
        </div>
      )}
      <span className="text-sm md:text-base ml-2 text-greyColr">
        {vendor?.businessName}
      </span>
    </div>
  );
};

export default VendorInfo;
