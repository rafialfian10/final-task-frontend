// components react
import { useContext } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";

// components
import { UserContext } from "../../context/userContext";

// css
import "./PrivateRoute.scss";
// ----------------------------------------

export const PrivateRouteAdmin = () => {
  const [myContext] = useContext(UserContext);
  return (
    <>
      {!localStorage.getItem("token") ? (
        <Navigate to="/" />
      ) : myContext?.isLogin && myContext.user?.role === "admin" ? (
        <Outlet />
      ) : (
        myContext?.isLogin &&
        myContext.user.role === "user" && <Navigate to="/" />
      )}
    </>
  );
};

export const PrivateRouteUser = () => {
  const [myContext] = useContext(UserContext);
  return (
    <>
      {!localStorage.getItem("token") ? (
        <Navigate to="/" />
      ) : myContext?.isLogin && myContext.user?.role === "user" ? (
        <Outlet />
      ) : (
        myContext?.isLogin &&
        myContext.user.role === "admin" && <Navigate to="/" />
      )}
    </>
  );
};

export const PageNotFound = () => {
  const params = useParams;
  let message = `"${params.pageName}`;
  if (message) {
    return <p className="pages-not-found">404 Page not found</p>;
  }
};
