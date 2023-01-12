import { Navigate, Outlet, useParams } from "react-router-dom";
import './PrivateRoute.scss'

export const PrivateRouteAdmin = () => {
    //  jika isAdmin di local storage == true maka navigate ke list transaction
    // return <>{!state.user.role === "admin" ? <Navigate to="/"/> : <Outlet/>} </>
}
//------------------------------------

export const PrivateRouteUser = () => {
  
    // return <>{!state.user.role === "user" ? <Navigate to="/"/> : <Outlet/>}</>
}
//--------------------------------------

export const PageNotFound = () => {
    const params = useParams;
    let message = `"${params.pageName}" page not found!`;
    // if (params.pageName == "about") {
    //   message = "You need to be logged in to access this page.";
    // }
  
    return <p className="pages-not-found">{message}</p>;
  }

