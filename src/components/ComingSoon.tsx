import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGithubAlt } from "react-icons/fa";

interface NotFoundProps {
  message?: string;
}

const ComingSoon: React.FC<NotFoundProps> = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <FaGithubAlt size={100} color="rgb(9 83 157)" className="mb-4" />
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-pryColor">Coming Soon...</h2>
        <p className="text-lg text-gray-600">
          Oh!, our apologies. The page you’re looking for is unavailable at the
          moment.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 px-6 py-2 bg-pryColor text-white rounded-lg hover:bg-pryColor transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ComingSoon;
