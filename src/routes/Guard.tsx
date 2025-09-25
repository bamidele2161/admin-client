import { type ReactElement } from "react";
import { useAppSelector } from "../hooks";
import { selectAuth } from "../store/slice/authSlice";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactElement;
}

const Guard = ({ children }: ProtectedRouteProps) => {
  const { userInfo } = useAppSelector(selectAuth);

  if (!userInfo?.access_token && userInfo?.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default Guard;
