// components react bootstrap
import {Container, Nav, Navbar, Button, Form, Modal, ButtonGroup, Dropdown, Image} from "react-bootstrap";
import Swal from "sweetalert2";

// components
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
// import { useMutation } from "react-query";
// import { UserContext } from "../../context/userContext";

// css
import "./Navbar.scss";
import "./Login.scss";
import "./Register.scss";

// api
import { API } from "../../config/api";

// image
import logo from '../../assets/img/logo.png';
import profile from '../../assets/img/profile.png';
import complain from '../../assets/img/complain.png';
import logout from '../../assets/img/logout.png';
import addbook from '../../assets/img/addbook.png';
import bracket from '../../assets/img/bracket.png';
import saitama from '../../assets/img/saitama.png';
import deaultphoto from '../../assets/img/default-photo.png';



const Navbars = () => {
    const navigate = useNavigate()

    // Login modal login
    const [showReg, setShowReg] = useState(false);
  
    const handleCloseReg = () => setShowReg(false);
    const handleShowReg = () => setShowReg(true);
    // End login modal login
  
    // modal register
    const [showLog, setShowLog] = useState(false);
  
    const handleCloseLog = () => setShowLog(false);
    const handleShowLog = () => setShowLog(true);
    // End modal register
    //---------------------------------------------------------------
  
    // function handle register
    const handleRegister = (e) => {
      e.preventDefault();
      setShowLog(false);
      setShowReg(true);
    };
    // end function handle register
    //-------------------------------------------------------------
  
    // Process register
    const [formReg, setFormReg] = useState({
      name: "",
      email: "",
      password: "",
      gender: "",
      phone: "",
      address: "",
      image: "",
    });
    //---------------------------------------------------------------------
  
    // process login
    const [formlogin, setFormLogin] = useState({
      email: "",
      password: "",
    });
   
    return (
        <>
            <Navbar expand="lg" className="background-navbar">
            <Container>
                <Navbar.Brand href="/" className="logo">
                <img src={logo} alt="" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto sub-navbar">
                    {/* profile navbar */}
                        <Navbar.Brand>
                            <img src={bracket} alt=""  className="bracket"/>
                            <img src={saitama} alt=""  className="photo-profile"/>
                            <Dropdown as={ButtonGroup} className="dropdown">
                                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" className="toggle-navbar"/>
                                <Dropdown.Menu className="menu-dropdown">
                                <Dropdown.Item onClick={() => navigate(`/incom_trip`)}>
                                    <img src={addbook} alt="" />
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => navigate(`/list_country`)}>
                                    <img src={complain} alt="" className="d-inline" />
                                    <p className="text-country">Country</p>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <img src={logout} alt="" />
                                </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Navbar.Brand>
                        
                        <Navbar.Brand>
                            {/* <img src={user.image} className="photo-profile" alt="" /> */}
                            <Dropdown as={ButtonGroup} className="dropdown">
                                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" className="toggle-navbar"/>
                                <Dropdown.Menu className="menu-dropdown">
                                    <Dropdown.Item onClick={() => navigate(`/profile/`)}>
                                        <img src={profile} alt="" />
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => navigate(`/payment/`)}>
                                        <img src={complain} alt="" />
                                    </Dropdown.Item>
                                    <Dropdown.Item >
                                        <img src={logout} alt="" />
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Navbar.Brand>
                    {/* // end profile navbar */}
                        
                        {/* modal login */}
                        {/* <Nav.Link className="login" onClick={handleShowLog}>Login</Nav.Link>
                        <Modal show={showLog} onHide={handleCloseLog} className="modal-login" size="lg">
                            <Modal.Body className="form-login">
                            <h1 className="title-login">Login</h1>
                            <Form>
                                <Form.Group className="form-group" controlId="formBasicEmail"> 
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email"/>
                                </Form.Group>
                                <Form.Group className="form-group" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password"/>
                                </Form.Group>
                                <Button variant="primary" type="submit" className="button-submit">Submit</Button>
                                <p>Don't have an account?<button className="btn-show-register" onClick={handleRegister}>Click here</button></p>
                            </Form>
                            </Modal.Body>
                        </Modal> */}
                        {/* end modal login */}  

                        {/* modal register */}
                        {/* <Nav.Link className="register" onClick={handleShowReg}> Register </Nav.Link>
                        <Modal show={showReg} onHide={handleCloseReg} className="modal-register" size="lg">
                            <Modal.Body className="modal-body-register">
                            <h1 className="title-register">Register</h1>
                            <Form>
                                <Form.Group className="form-group" controlId="formBasicEmail">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" name="name"/>
                                </Form.Group>
                                <Form.Group className="form-group" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email"/>
                                </Form.Group>
                                <Form.Group className="form-group" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password"/>
                                </Form.Group>
                                <Form.Group className="form-group form-dropdown">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select aria-label="Default select example" name="gender" className="form-input" >
                                    <option value=""></option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </Form.Select>
                                </Form.Group>
                                <Form.Group className="form-group" controlId="formBasicPassword">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" name="phone" />
                                </Form.Group>
                                <Form.Group className="form-group" controlId="formBasicEmail">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" name="address" />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="button-submit">Submit</Button>
                            </Form>
                            </Modal.Body>
                        </Modal> */}
                        {/* end modal register */}       
                    </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </>
    )
}

export default Navbars
