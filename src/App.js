// components
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { UserContext } from "./context/userContext";

// api
import { API, setAuthToken } from "./config/api";

// pages
import Navbars from "./components/navbar/Navbar";
import Home from "./Home/Home";
import IncrementDetailBook from "./containers/user_pages/increment_detail_book/IncrementDetailBook";
import Profile from "./containers/user_pages/profile/Profile";
import AddBook from "./containers/admin_pages/add_book/AddBook";
import ListTransaction from "./containers/admin_pages/list_transaction/ListTransaction";
import DetailBook from "./containers/user_pages/detail_book/DetailBook";
import Cart from "./containers/user_pages/cart/Cart";
import { PageNotFound, PrivateRouteAdmin, PrivateRouteUser } from "./components/private_route/PrivateRoute";
import IncomBook from "./containers/admin_pages/incom_book/IncomBook";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  
  const navigate = useNavigate()

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

  // if(state.isLogin === false) {
  //   navigate('/')
  // } else {
  //   if(state.user.role === 'admin') {
  //     navigate('/list_transaction')
  //   } else if(state.user.role === 'user') {
  //     navigate('/')
  //   }
  // }

  return (
    <>
      <Navbars/>
      <Routes>
          {/* public */}
          <Route exact path="/" element={<Home state={state}/>}/>
          <Route exact path="/increment_detail_book" element={<IncrementDetailBook/>}/>
          
          {/* admin */}
          <Route element={<PrivateRouteAdmin state={state}/>}>
            <Route exact path="/list_transaction" element={<ListTransaction/>}/>
            <Route exact path="/add_book" element={<AddBook/>}/>
            <Route exact path="/incom_book" element={<IncomBook/>}/>
          </Route>
          

          {/* user */}
          <Route element={<PrivateRouteUser state={state}/>}>
            <Route exact path="/profile/:id" element={<Profile/>}/>
            <Route exact path="/detail_book" element={<DetailBook/>}/>
            <Route exact path="/cart" element={<Cart/>}/> 
          </Route>

          <Route exact path="/:pageName" element={<PageNotFound/>} />
      </Routes>  
    </>
  );
}

export default App;
