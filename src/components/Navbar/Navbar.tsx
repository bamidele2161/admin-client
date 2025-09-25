// import { NotificationIcon } from "../../assets/svg/CustomSVGs";
import { useAppSelector } from "../../hooks";
import { type NavbarProps } from "../../interfaces/Global";
import { selectAuth } from "../../store/slice/authSlice";

const Navbar: React.FC<NavbarProps> = ({ title, subtitle }) => {
  const { userInfo } = useAppSelector(selectAuth);
  console.log(userInfo);
  return (
    <div className="flex justify-between items-center px-10 py-5 bg-white shadow-default">
      <div className="flex flex-col gap-4">
        <h3 className="text-pryColor font-semibold text-[32px] font-bricolage leading-6">
          {title}
        </h3>
        <p className="text-lightGreyColor font-inter leading-4 font-normal text-sm">
          {subtitle}
        </p>
      </div>
      <div className="flex items-center gap-4">
        {userInfo?.role === "VENDOR" && (
          <span
            className={`
         px-3 py-1 rounded-full text-xs font-semibold
         ${
           userInfo?.Vendor?.status === "PENDING"
             ? "bg-yellow-50 text-yellow-700"
             : userInfo?.Vendor?.status === "APPROVED"
             ? "bg-green-50 text-green-700"
             : userInfo?.Vendor?.status === "REJECTED"
             ? "bg-orange-50 text-orange-700"
             : userInfo?.Vendor?.status === "INACTIVE"
             ? "bg-red-50 text-red-700"
             : "bg-gray-50 text-gray-700"
         }
       `}
          >
            {userInfo?.Vendor?.status || "Unknown"}
          </span>
        )}

        <div className="flex gap-4 items-center">
          <div className="image">
            {userInfo?.Vendor?.businessLogo ? (
              <img
                src={""}
                alt="Uploaded Preview"
                className="w-12 h-12 rounded-full mr-4"
              />
            ) : (
              <div className="flex items-center justify-center w-[48px] h-[48px] bg-[#f1f2f3] p-4 rounded-full">
                <h3 className="text-pryColor font-semibold text-xl font-bricolage leading-6">
                  {userInfo?.Vendor?.businessName?.charAt(0) ||
                    userInfo?.businessName?.charAt(0) ||
                    userInfo?.fullName?.charAt(0)}
                </h3>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <p className=" font-semibold text-sm font-inter text-greyColr">
              {userInfo?.fullName}
            </p>
            <div className="flex gap-1 items-center">
              <p className="text-lightGreyColor font-medium font-inter text-xs">
                {userInfo?.Vendor?.businessName || userInfo?.businessName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
