// components react bootstrap
import {Container, Nav, Navbar, ButtonGroup, Dropdown, Image, Form} from "react-bootstrap";
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
import logo from '../../assets/img/logo.png';
import profile from '../../assets/img/profile.png';
import complain from '../../assets/img/complain.png';
import logout from '../../assets/img/logout.png';
import addbook from '../../assets/img/addbook.png';
import bracket from '../../assets/img/bracket.png';
import saitama from '../../assets/img/saitama.png';
import Login from "../login/Login";
import Register from "../register/Register";
import { useEffect } from "react";

const Navbars = () => {

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
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          text: 'Logout successfully'
       })
      // logout dan hapus token
        dispatch({
          type: "LOGOUT",
        })
        navigate("/");
      }
    })
  };

  // get data user
  let id = state?.user.id;
  let { data: photoProfile} = useQuery('photoProfileCache', async () => {
    const response = await API.get(`/user/${id}`);
    return response.data.data;
  });

  // get order cart user
  let { data: orderCartBracket , refetch: refetchCartBracket} = useQuery('orderCartBracket', async () => {
    const response = await API.get(`/carts`);
    return response.data.data;
  });
    
  refetchCartBracket()

  useEffect(() => {

  },[])

  return (
        <>
          <Navbar expand="lg" className="background-navbar">
            <Container>
                <Navbar.Brand href="/" className="logo">
                <Image src={logo} alt="" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto sub-navbar">
                  {state.isLogin === true ? (
                    <>
                      {state.user.role === "admin" ? (
                        // profile navbar admin
                        <Navbar.Brand>
                          <Image src={saitama} alt=""  className="photo-profile"/>
                          <Dropdown as={ButtonGroup} className="dropdown">
                            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" className="toggle-navbar"/>
                            <Dropdown.Menu className="menu-dropdown">
                              <Dropdown.Item onClick={() => navigate(`/add_book`)}>
                                <p className="text-dropdown"><Image src={addbook} alt=""/>Add Book</p> 
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => navigate(`/incom_book`)}>
                                <p className="text-dropdown"><Image src={addbook} alt=""/>Incom Book</p> 
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => navigate(`/complain_admin`)}>
                                <p className="text-dropdown"><Image src={complain} alt=""/>Complain</p> 
                              </Dropdown.Item>
                              <Dropdown.Item onClick={HandleLogout}>
                                <p className="text-dropdown"><Image src={logout} alt=""/>Logout</p> 
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </Navbar.Brand>
                      ) : (
                        // profile navbar user
                        <Navbar.Brand>
                          <>
                            {/* bracket */}
                            {orderCartBracket === null ? (
                              null
                            ) : (
                              <div className='qty'>{orderCartBracket?.length}</div>
                            )}
                            <Image src={bracket} alt="" className="bracket" onClick={() => navigate(`cart/${state?.user.id}`)}/>
                            <Image src={photoProfile?.thumbnail} className="photo-profile" alt="" />
                              <Dropdown as={ButtonGroup} className="dropdown">
                                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" className="toggle-navbar"/>
                                  <Dropdown.Menu className="menu-dropdown">
                                    <Dropdown.Item onClick={() => navigate(`/profile/${state?.user.id}`)}>
                                      <Form.Text className="text-dropdown"><Image src={profile} alt=""/> Profile</Form.Text> 
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => navigate(`/complain_user`)}>
                                      <Form.Text className="text-dropdown"><Image src={complain} alt=""/> Complain</Form.Text> 
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={HandleLogout}>
                                      <Form.Text className="text-dropdown"><Image src={logout} alt=""/> Logout</Form.Text> 
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                              </Dropdown>
                          </>              
                        </Navbar.Brand>
                      )}
                    </>
                  ) : (
                      <>
                        <Login showLog={showLog} setShowLog={setShowLog} handleShowReg={handleShowReg} handleShowLog={handleShowLog}/>
                        <Register showReg={showReg} setShowReg={setShowReg} handleShowReg={handleShowReg} setShowLog={setShowLog} />
                      </>
                  )}   
                  </Nav>
                </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
  )
}

export default Navbars
