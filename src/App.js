/* eslint-disable no-unused-vars */
// components
// eslint-disable-next-line no-unused-vars
import { Route, Routes } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "./context/userContext";
import { useQuery } from "react-query";

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
import {
  PageNotFound,
  PrivateRouteAdmin,
  PrivateRouteUser,
} from "./components/private_route/PrivateRoute";
import IncomBook from "./containers/admin_pages/incom_book/IncomBook";
import Profile from "./containers/user_pages/profile/Profile";
import ComplainAdmin from "./containers/admin_pages/complain_admin/ComplainAdmin";
import ComplainUser from "./containers/user_pages/complain_user/ComplainUser";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [state, dispatch] = useContext(UserContext);
  // console.clear();
  // console.log("State :", state);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check_auth");

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data;
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
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

  // state search
  const [search, setSearch] = useState("");

  // state data books
  const [books, setBooks] = useState();

  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  // get books
  let { data, refetch: refetchAllBooks } = useQuery(
    "allBooksCache",
    async () => {
      const response = await API.get(`/books`, config);
      setBooks(response.data.data);
    }
  );

  // handle search
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Navbars search={search} handleSearch={handleSearch} />
      <Routes>
        {/* public */}
        <Route
          exact
          path="/"
          element={<Home books={books} search={search} />}
        />
        <Route
          exact
          path="/increment_detail_book/:id"
          element={<IncrementDetailBook />}
        />

        {/* admin */}
        <Route element={<PrivateRouteAdmin />}>
          <Route
            exact
            path="/list_transaction"
            element={<ListTransaction search={search} />}
          />
          <Route exact path="/add_book" element={<AddBook />} />
          <Route
            exact
            path="/incom_book"
            element={
              <IncomBook
                books={books}
                search={search}
                refetchAllBooks={refetchAllBooks}
              />
            }
          />
          <Route exact path="/complain_admin" element={<ComplainAdmin />} />
        </Route>

        {/* user */}
        <Route element={<PrivateRouteUser />}>
          <Route exact path="/detail_book/:id" element={<DetailBook />} />
          <Route exact path="/cart/:id" element={<Cart />} />
          <Route exact path="/profile/:id" element={<Profile />} />
          <Route exact path="/complain_user" element={<ComplainUser />} />
        </Route>

        <Route exact path="/:pageName" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
