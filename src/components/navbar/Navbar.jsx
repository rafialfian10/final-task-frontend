// components react bootstrap
import {
  Container,
  Nav,
  Navbar,
  ButtonGroup,
  Dropdown,
  Image,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import Swal from "sweetalert2";

// components
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { UserContext } from "../../context/userContext";

// css
import "./Navbar.scss";

// api
import { API } from "../../config/api";

// images
import logo from "../../assets/img/logo.png";
import profile from "../../assets/img/profile.png";
import complain from "../../assets/img/complain.png";
import logout from "../../assets/img/logout.png";
import addbook from "../../assets/img/addbook.png";
import bracket from "../../assets/img/bracket.png";
import admin from "../../assets/img/admin.png";
import defaultPhoto from "../../assets/img/default-photo.png";
import Login from "../login/Login";
import Register from "../register/Register";

const Navbars = ({ search, handleSearch }) => {
  const navigate = useNavigate();

  // user context
  const [state, dispatch] = useContext(UserContext);

  // Handle Login
  const [showLog, setShowLog] = useState(false);
  const handleShowLog = () => setShowLog(true);

  // Handle Register
  const [showReg, setShowReg] = useState(false);
  const handleShowReg = () => setShowReg(true);

  // function logout
  const HandleLogout = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          text: "Logout successfully",
        });

        dispatch({
          type: "LOGOUT",
        });
        navigate("/");
      }
    });
  };

  // get data user
  let { data: user, refetch: refetchUser } = useQuery("userCache", async () => {
    const response = await API.get(`/user`);
    return response.data.data;
  });

  // get order cart user
  let { data: orderCart, refetch: refetchCart } = useQuery(
    "cartCache",
    async () => {
      const response = await API.get(`/carts`);
      return response.data.data;
    }
  );

  refetchCart();
  refetchUser();

  // useEffect(() => {
  //   orderCart && refetchCart();
  //   user && refetchUser()
  // });

  return (
    <>
      <Navbar expand="lg" className="background-navbar">
        <Container>
          <Navbar.Brand href="/" className="logo">
            <Image src={logo} alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto sub-navbar">
              {/* search */}
              <Navbar.Brand>
                <InputGroup className="search">
                  <Form.Control
                    aria-label="Recipient's username"
                    placeholder="Search..."
                    aria-describedby="basic-addon2"
                    onChange={(value) => handleSearch(value)}
                    value={search}
                  />
                  <Button className="btn-search">Search</Button>
                </InputGroup>
              </Navbar.Brand>

              {state.isLogin === true ? (
                <>
                  {state.user.role === "admin" ? (
                    // profile navbar admin
                    <Navbar.Brand>
                      {/* image */}
                      {user !== undefined && user.thumbnail !== "" ? (
                        <Image
                          src={user.thumbnail}
                          className="photo-profile"
                          alt="photo-profile"
                        />
                      ) : (
                        <Image src={admin} className="photo-profile" alt="photo-profile" />
                      )}
                      <Dropdown as={ButtonGroup} className="dropdown">
                        <Dropdown.Toggle
                          split
                          variant="success"
                          id="dropdown-split-basic"
                          className="toggle-navbar"
                        />
                        <Dropdown.Menu className="menu-dropdown">
                          <Dropdown.Item onClick={() => navigate(`/add_book`)}>
                            <p className="text-dropdown">
                              <Image src={addbook} alt="add-book" />
                              Add Book
                            </p>
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => navigate(`/incom_book`)}
                          >
                            <p className="text-dropdown">
                              <Image src={addbook} alt="add-book" />
                              Incom Book
                            </p>
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => navigate(`/complain_admin`)}
                          >
                            <p className="text-dropdown">
                              <Image src={complain} alt="complain" />
                              Complain
                            </p>
                          </Dropdown.Item>
                          <Dropdown.Item onClick={HandleLogout}>
                            <p className="text-dropdown">
                              <Image src={logout} alt="logout" />
                              Logout
                            </p>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Navbar.Brand>
                  ) : (
                    // profile navbar user
                    <Navbar.Brand>
                      <>
                        {/* bracket */}
                        {orderCart === null ? null : (
                          <div className="qty">{orderCart?.length}</div>
                        )}
                        <Image
                          src={bracket}
                          alt="bracket"
                          className="bracket"
                          onClick={() => navigate(`cart/${state?.user.id}`)}
                        />

                        {/* image */}
                        {user !== undefined && user.thumbnail !== "" ? (
                          <Image
                            src={user.thumbnail}
                            className="photo-profile"
                            alt="photo-profile"
                          />
                        ) : (
                          <Image
                            src={defaultPhoto}
                            className="photo-profile"
                            alt="default-photo"
                          />
                        )}

                        <Dropdown as={ButtonGroup} className="dropdown">
                          <Dropdown.Toggle
                            split
                            variant="success"
                            id="dropdown-split-basic"
                            className="toggle-navbar"
                          />
                          <Dropdown.Menu className="menu-dropdown">
                            <Dropdown.Item
                              onClick={() => navigate(`/profile/${user?.id}`)}
                            >
                              <Form.Text className="text-dropdown">
                                <Image src={profile} alt="profile" /> Profile
                              </Form.Text>
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => navigate(`/complain_user`)}
                            >
                              <Form.Text className="text-dropdown">
                                <Image src={complain} alt="complain" /> Complain
                              </Form.Text>
                            </Dropdown.Item>
                            <Dropdown.Item onClick={HandleLogout}>
                              <Form.Text className="text-dropdown">
                                <Image src={logout} alt="logout" /> Logout
                              </Form.Text>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </>
                    </Navbar.Brand>
                  )}
                </>
              ) : (
                <>
                  <Login
                    showLog={showLog}
                    setShowLog={setShowLog}
                    handleShowReg={handleShowReg}
                    handleShowLog={handleShowLog}
                  />
                  <Register
                    showReg={showReg}
                    setShowReg={setShowReg}
                    handleShowReg={handleShowReg}
                    setShowLog={setShowLog}
                  />
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navbars;
