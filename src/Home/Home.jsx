import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// react bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// scss
import "./Home.scss";

// components
import Jumbotron from "../components/jumbotron/Jumbotron";
import Cards from "../components/cards/Cards";
import ListBook from "../components/listBook/ListBook";

const Home = ({state}) => {

  const navigate = useNavigate()

  // jika sewaktu halaman dirender pertama kali ada local storage isAdmin maka navigate
  useEffect(() => {
    state.user.role === "admin" &&
    navigate("/list_transaction");
  });

  return (
    <>
      <Jumbotron/>
      <Cards/>
      <ListBook/>
    </>
  );
};

export default Home;


