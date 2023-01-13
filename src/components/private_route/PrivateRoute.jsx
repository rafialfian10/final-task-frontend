import { Navigate, Outlet, useParams } from "react-router-dom";
import './PrivateRoute.scss'

export const PrivateRouteAdmin = ({state}) => {
    
    return <>{state.user.role === "admin" ?  <Outlet/> : <Navigate to="/"/>}</>
}
//------------------------------------

export const PrivateRouteUser = ({state}) => {
    
    return <>{state.user.role === "user" ?  <Outlet/> : <Navigate to="/"/>}</>
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

