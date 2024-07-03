import { useUserContext } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { isAuthenticated, isStudent } = useUserContext();

  return (
    <>
      {isAuthenticated ? (
        isStudent ? (
          <Navigate to="/student" />
        ) : (
          <Navigate to="/teacher" />
        )
      ) : (
        <>
          <section className="flex justify-center flex-1 py-10 px-7">
            <Outlet />
          </section>
        </>
      )}
    </>
  );
};

export default AuthLayout;
