/* eslint-disable no-unused-vars */
// components react
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useMutation } from "react-query";

// components react bootstrap
import { Nav, Button, Form, Modal } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";

// components
import { UserContext } from "../../context/userContext";

// api
import { API } from "../../config/api";

// css
import "./Login.scss";
import Swal from "sweetalert2";
// ----------------------------------------------------------------

const Login = ({ showLog, setShowLog, handleShowReg, handleShowLog }) => {
  const navigate = useNavigate();

  //context
  const [state, dispatch] = useContext(UserContext);

  // state show password
  const [showPassword, setShowPassword] = useState(false);

  // state form login
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // state error
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleCloseLog = () => setShowLog(false);

  const HandleChangeLogin = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  // function login submit
  const HandleLoginSubmit = useMutation(async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      const messageError = {
        email: "",
        password: "",
      };

      // validasi form email
      if (form.email === "") {
        messageError.email = "Email is required";
      } else {
        messageError.email = "";
      }

      // validasi form password
      if (form.password === "") {
        messageError.password = "Password is required";
      } else {
        messageError.password = "";
      }

      if (messageError.email === "" && messageError.password === "") {
        const body = JSON.stringify(form);
        const response = await API.post("/login", body, config);

        if (response.data.code === 200) {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: response.data.data,
          });

          setShowLog(false);

          Swal.fire({
            text: "Login successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });

          navigate("/");
        }
      } else {
        setError(messageError);
      }
    } catch (err) {
      Swal.fire({
        text: "Login failed (email / password incorrect)",
        icon: "error",
        confirmButtonText: "Ok",
      });
      console.log(err);
    }
  });

  const handleShowRegister = () => {
    handleCloseLog();
    handleShowReg();
  };

  return (
    <>
      <Nav.Link className="login" onClick={handleShowLog}>
        Login
      </Nav.Link>
      <Modal
        show={showLog}
        onHide={handleCloseLog}
        className="modal-login"
        size="lg"
      >
        <Modal.Body className="form-login">
          <h1 className="title-login">Login</h1>
          <Form>
            <Form.Group className="form-group" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={HandleChangeLogin}
              />
              {error.email && !form.email.trim() && (
                <Form.Text className="text-danger">{error.email}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="form-group" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={HandleChangeLogin}
                />
                <div
                  className="position-absolute"
                  style={{
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashFill color="black" size={25} />
                  ) : (
                    <EyeFill color="black" size={25} />
                  )}
                </div>
              </div>
              {error.password && !form.password.trim() && (
                <Form.Text className="text-danger">{error.password}</Form.Text>
              )}
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="button-submit"
              onClick={(e) => HandleLoginSubmit.mutate(e)}
            >
              Submit
            </Button>
            <p>
              Don't have an account?
              <button
                className="btn-show-register"
                type="button"
                onClick={handleShowRegister}
              >
                Click here
              </button>
            </p>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
