// components
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbars from "./components/navbar/Navbar";

// pages
import Home from "./Home/Home";
import IncrementDetailBook from "./containers/user_pages/increment_detail_book/IncrementDetailBook";
import Profile from "./containers/user_pages/profile/Profile";
import AddBook from "./containers/admin_pages/add_book/AddBook";
import ListTransaction from "./containers/admin_pages/list_transaction/ListTransaction";
import DetailBook from "./containers/user_pages/detail_book/DetailBook";
import Cart from "./containers/user_pages/cart/Cart";

function App() {
  return (
    <Router>
      <Navbars/>
      <Routes>
          {/* public */}
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/increment_detail_book" element={<IncrementDetailBook/>}/>
          
          {/* admin */}
          <Route exact path="/add_book" element={<AddBook/>}/>
          <Route exact path="/detail_book" element={<DetailBook/>}/>
          <Route exact path="/list_transaction" element={<ListTransaction/>}/>
          

          {/* user */}
          <Route exact path="/profile" element={<Profile/>}/>
          <Route exact path="/cart" element={<Cart/>}/> 
      </Routes>  
    </Router>
  );
}

export default App;
