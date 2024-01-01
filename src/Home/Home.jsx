// components react
import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// react bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// components
import Jumbotron from "../components/jumbotron/Jumbotron";
import Cards from "../components/cards/Cards";
import ListBook from "../components/listBook/ListBook";
import { UserContext } from "../context/userContext";

// css
import "./Home.scss";
// ----------------------------------------------------

const Home = ({ books, search }) => {
  const [myContext] = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    myContext.user.role === "admin" && navigate("/list_transaction");
  });

  return (
    <>
      <Jumbotron />
      <Cards />
      <ListBook books={books} search={search} />
    </>
  );
};

export default Home;
