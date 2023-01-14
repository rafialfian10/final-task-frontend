// components
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "./context/userContext";

// api
import { API, setAuthToken } from "./config/api";

// pages
import Navbars from "./components/navbar/Navbar";
import Home from "./Home/Home";
import IncrementDetailBook from "./containers/user_pages/increment_detail_book/IncrementDetailBook";
import AddBook from "./containers/admin_pages/add_book/AddBook";
import ListTransaction from "./containers/admin_pages/list_transaction/ListTransaction";
import DetailBook from "./containers/user_pages/detail_book/DetailBook";
import Cart from "./containers/user_pages/cart/Cart";
import { PageNotFound, PrivateRouteAdmin, PrivateRouteUser } from "./components/private_route/PrivateRoute";
import IncomBook from "./containers/admin_pages/incom_book/IncomBook";
import Profile from "./containers/user_pages/profile/Profile";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {

  // panggil user context(menyimpan data sebagai global state)
  const [state, dispatch] = useContext(UserContext);
  console.clear();
  console.log("State :", state);


  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  }, [state])
  
  const checkUser = async () => {
    try {
      const response = await API.get('/check_auth');

      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      let payload = response.data.data;
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
      checkUser();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbars/>
      <Routes>
          {/* public */}
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/increment_detail_book/:id" element={<IncrementDetailBook/>}/>
          
          
          {/* admin */}
          <Route element={<PrivateRouteAdmin />}>
            <Route exact path="/list_transaction" element={<ListTransaction/>}/>
            <Route exact path="/add_book" element={<AddBook/>}/>
            <Route exact path="/incom_book" element={<IncomBook/>}/>
          </Route>
          

          {/* user */}
          <Route element={<PrivateRouteUser />}>
            <Route exact path="/detail_book/:id" element={<DetailBook/>}/>
            <Route exact path="/cart/:id" element={<Cart/>}/> 
            <Route exact path="/profile/:id" element={<Profile/>}/> 
          </Route>

          <Route exact path="/:pageName" element={<PageNotFound/>} />
      </Routes>  
    </>
  );
}

export default App;
