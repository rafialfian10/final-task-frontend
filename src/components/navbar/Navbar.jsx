// components react
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { useQuery } from "react-query";

// components react bootstrap
import {
  Container,
  Nav,
  Navbar,
  Image,
  Form,
  InputGroup,
  Button,
  Row,
  Col,
  NavDropdown,
} from "react-bootstrap";

// components
import { UserContext } from "../../context/userContext";

// api
import { API } from "../../config/api";

// css
import "./Navbar.scss";
import Swal from "sweetalert2";

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
// -------------------------------------------------------------

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
    const response = await API.get(`/user/${state.user.id}`);
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

  useEffect(() => {
    refetchCart();
    refetchUser();
  });

  return (
    <>
      <Navbar expand="lg" className="background-navbar">
        <Container
          className={`container ${
            window.innerWidth <= 900 ? " flex-row-reverse" : ""
          }`}
        >
          <Row className="m-0">
            <Col xs={12}>
              <Navbar.Brand href="/" className="logo">
                <Image src={logo} alt="logo" width={100} />
              </Navbar.Brand>
            </Col>
          </Row>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              navbarScroll
              className={`container-navbar ${
                window.innerWidth <= 900 ? "mt-3" : ""
              }`}
            >
              <Row
                className={`container-sub-navbar ${
                  window.innerWidth <= 900 ? "flex-start flex-column gap-2" : ""
                }`}
              >
                <Col xs={12} md={5} className="col">
                  {/* search */}
                  <Navbar.Brand className="w-100">
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
                </Col>

                <Col
                  xs={12}
                  md={4}
                  className={`col-profile ${
                    window.innerWidth <= 900 ? "justify-content-start" : ""
                  }`}
                >
                  {state.isLogin === true ? (
                    <>
                      {state.user.role === "admin" ? (
                        // profile navbar admin
                        <Navbar.Brand>
                          {user !== undefined && user.photo !== "" ? (
                            <Image
                              src={user.photo}
                              className="photo-profile"
                              alt="photo-profile"
                            />
                          ) : (
                            <Image
                              src={admin}
                              className="photo-profile"
                              alt="photo-profile"
                            />
                          )}
                          <NavDropdown
                            id="basic-nav-dropdown"
                            className="dropdown"
                          >
                            <NavDropdown.Item
                              onClick={() => navigate(`/profile_admin/${user?.id}`)}
                            >
                              <Navbar.Text className="text-dropdown">
                                <Image
                                  src={profile}
                                  alt="profile"
                                  className="icon"
                                />{" "}
                                Profile
                              </Navbar.Text>
                            </NavDropdown.Item>
                            <NavDropdown.Item
                              onClick={() => navigate(`/add_book`)}
                            >
                              <Navbar.Text className="text-dropdown">
                                <Image
                                  src={addbook}
                                  alt="add-book"
                                  className="icon"
                                />
                                Add Book
                              </Navbar.Text>
                            </NavDropdown.Item>
                            <NavDropdown.Item
                              onClick={() => navigate(`/incom_book`)}
                            >
                              <Navbar.Text className="text-dropdown">
                                <Image
                                  src={addbook}
                                  alt="add-book"
                                  className="icon"
                                />
                                Incom Book
                              </Navbar.Text>
                            </NavDropdown.Item>
                            <NavDropdown.Item
                              onClick={() => navigate(`/complain_admin`)}
                            >
                              <Navbar.Text className="text-dropdown">
                                <Image
                                  src={complain}
                                  alt="complain"
                                  className="icon"
                                />
                                Complain
                              </Navbar.Text>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={HandleLogout}>
                              <Navbar.Text className="text-dropdown">
                                <Image
                                  src={logout}
                                  alt="logout"
                                  className="icon"
                                />
                                Logout
                              </Navbar.Text>
                            </NavDropdown.Item>
                          </NavDropdown>
                        </Navbar.Brand>
                      ) : (
                        // profile navbar user
                        <Navbar.Brand>
                          <>
                            {/* bracket */}
                            {orderCart === null ? null : (
                              <div className="container-bracket">
                                <span className="qty">{orderCart?.length}</span>
                                <Image
                                  src={bracket}
                                  alt="bracket"
                                  className="bracket-img"
                                  onClick={() =>
                                    navigate(`cart/${state?.user.id}`)
                                  }
                                />
                              </div>
                            )}

                            {/* profile */}
                            {user !== undefined && user.photo !== "" ? (
                              <Image
                                src={user.photo}
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

                            <NavDropdown
                              id="basic-nav-dropdown"
                              className="dropdown"
                            >
                              <NavDropdown.Item
                                onClick={() => navigate(`/profile/${user?.id}`)}
                              >
                                <Navbar.Text className="text-dropdown">
                                  <Image
                                    src={profile}
                                    alt="profile"
                                    className="icon"
                                  />{" "}
                                  Profile
                                </Navbar.Text>
                              </NavDropdown.Item>
                              <NavDropdown.Item
                                onClick={() => navigate(`/complain_user`)}
                              >
                                <Navbar.Text className="text-dropdown">
                                  <Image
                                    src={complain}
                                    alt="complain"
                                    className="icon"
                                  />{" "}
                                  Complain
                                </Navbar.Text>
                              </NavDropdown.Item>
                              <NavDropdown.Divider />
                              <NavDropdown.Item onClick={HandleLogout}>
                                <Navbar.Text className="text-dropdown">
                                  <Image
                                    src={logout}
                                    alt="logout"
                                    className="icon"
                                  />{" "}
                                  Logout
                                </Navbar.Text>
                              </NavDropdown.Item>
                            </NavDropdown>
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
                </Col>
              </Row>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navbars;
