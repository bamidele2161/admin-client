import { MdOutlineLogout } from "react-icons/md";
import { selectAuth } from "../../store/slice/authSlice";
import { useAppSelector } from "../../hooks";
import { LogoutShopper } from "../../util";
import { useNavigate } from "react-router-dom";

const UserCard = () => {
  const { userInfo } = useAppSelector(selectAuth);
  const navigate = useNavigate();

  return (
    <>
      <section className="flex flex-col gap-4 rounded-xl bg-white p-4 text-center shadow-xl justify-center">
        <h3 className="text-pryColor">{userInfo?.userName}</h3>
        <div className="flex w-full justify-center items-center">
          <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#f1f2f3] rounded-full">
            <h3 className="text-pryColor font-semibold text-sm sm:text-3xl">
              {userInfo?.fullName?.charAt(0)}
            </h3>
          </div>
        </div>

        <div>
          <h4 className="text-gray-600">{userInfo?.fullName}</h4>
          <p className="my-2 text-gray-400 text-sm">{userInfo?.phoneNumber}</p>
          <p className="text-gray-400 text-sm">{userInfo?.email}</p>
        </div>
        <button
          onClick={() => LogoutShopper(navigate)}
          className="main-btn flex items-center justify-center rounded-md py-2 bg-negative gap-3 text-white font-semibold"
        >
          {" "}
          <MdOutlineLogout size={24} /> Log Out
        </button>
      </section>
    </>
  );
};

export default UserCard;
