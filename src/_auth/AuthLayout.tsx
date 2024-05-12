import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
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
