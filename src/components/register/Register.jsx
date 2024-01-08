// components react
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useState } from "react";

// components react bootstrap
import { Nav, Button, Form, Modal } from "react-bootstrap";
import {
  EyeFill,
  EyeSlashFill,
  ExclamationTriangleFill,
} from "react-bootstrap-icons";

// api
import { API } from "../../config/api";

// css
import "./Register.scss";
import Swal from "sweetalert2";
// -------------------------------------------

const Register = ({ showReg, setShowReg, setShowLog, handleShowReg }) => {
  const navigate = useNavigate();

  // state show password & confirm password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // state form register
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    passwordValidation: "",
    gender: "",
    phone: "",
    address: "",
  });

  // state error
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    passwordValidation: "",
    gender: "",
    phone: "",
    address: "",
  });

  const handleCloseReg = () => setShowReg(false);

  const HandleChangeRegister = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });

    // Check password validation
    if (event.target.name === "password") {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

      if (!event.target.value) {
        // Jika form password kosong, munculkan pesan "Password is required"
        setError((prevError) => ({
          ...prevError,
          passwordValidation: "",
          password: "Password is required",
        }));
      } else if (!passwordRegex.test(event.target.value)) {
        // Jika password tidak sesuai dengan validasi regex
        setError((prevError) => ({
          ...prevError,
          passwordValidation:
            "Password must contain at least one uppercase and lowercase letter, one digit, and be at least 8 characters long.",
          password: "",
        }));
      } else {
        setError((prevError) => ({
          ...prevError,
          passwordValidation: "",
          password: "",
        }));
      }
    }

    // Check confirm password
    if (event.target.name === "confirmPassword") {
      if (!event.target.value && form.password.trim()) {
        // Jika form confirm password kosong dan password tidak kosong, munculkan pesan "Confirm password is required"
        setError((prevError) => ({
          ...prevError,
          confirmPassword: "Confirm password is required",
        }));
      } else if (event.target.value !== form.password) {
        // Jika confirm password tidak sama dengan password
        setError((prevError) => ({
          ...prevError,
          confirmPassword: "Password does not match",
        }));
      } else {
        setError((prevError) => ({
          ...prevError,
          confirmPassword: "",
        }));
      }
    }
  };

  const HandleRegisterSubmit = useMutation(async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const messageError = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        passwordValidation: "",
        gender: "",
        phone: "",
        address: "",
      };

      // validasi form name
      if (form.name === "") {
        messageError.name = "Fullname is required";
      } else {
        messageError.name = "";
      }

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

      // validasi form confirm password
      if (form.confirmPassword === "") {
        messageError.confirmPassword = "Confirm password is required";
      } else {
        messageError.confirmPassword = "";
      }

      // validasi form gender
      if (form.gender === "") {
        messageError.gender = "Gender is required";
      } else {
        messageError.gender = "";
      }

      // validasi form phone
      if (form.phone === "") {
        messageError.phone = "Phone is required";
      } else {
        messageError.phone = "";
      }

      // validasi form address
      if (form.address === "") {
        messageError.address = "Address is required";
      } else {
        messageError.address = "";
      }

      if (
        messageError.name === "" &&
        messageError.email === "" &&
        messageError.password === "" &&
        messageError.confirmPassword === "" &&
        messageError.passwordValidation === "" &&
        messageError.gender === "" &&
        messageError.phone === "" &&
        messageError.address === ""
      ) {
        const body = JSON.stringify(form);

        const response = await API.post("/register", body, config);
        if (response.data.code === 200) {
          Swal.fire({
            text: "Register successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });

          navigate("/");
          setShowReg(false);
          setShowLog(true);
          setForm({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            gender: "",
            phone: "",
            address: "",
          });
        }
      } else {
        setError(messageError);
      }
    } catch (err) {
      Swal.fire({
        text: "Register failed",
        icon: "error",
        confirmButtonText: "Ok",
      });
      console.log(err);
    }
  });

  return (
    <>
      <Nav.Link className="register" onClick={handleShowReg}>
        Register
      </Nav.Link>
      <Modal
        show={showReg}
        onHide={handleCloseReg}
        className="modal-register"
        size="lg"
      >
        <Modal.Body className="modal-body-register">
          <h1 className="title-register">Register</h1>
          <Form onSubmit={HandleRegisterSubmit.mutate}>
            <Form.Group className="form-group" controlId="formBasicEmail">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={HandleChangeRegister}
              />
              {error.name && !form.name.trim() && (
                <Form.Text className="text-danger">{error.name}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="form-group" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                autoComplete="off"
                onChange={HandleChangeRegister}
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
                  autoComplete="off"
                  onChange={HandleChangeRegister}
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
              {error.passwordValidation && !form.passwordValidation.trim() && (
                <Form.Text className="text-danger">
                  <ExclamationTriangleFill color="red" size={25} />{" "}
                  {error.passwordValidation}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="form-group" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  onChange={HandleChangeRegister}
                />
                <div
                  className="position-absolute"
                  style={{
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeSlashFill color="black" size={25} />
                  ) : (
                    <EyeFill color="black" size={25} />
                  )}
                </div>
              </div>
              {error.confirmPassword && (
                <Form.Text className="text-danger">
                  {error.confirmPassword}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="form-group form-dropdown">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="gender"
                className="form-input"
                onChange={HandleChangeRegister}
              >
                <option value=""></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Select>
              {error.gender && !form.gender.trim() && (
                <Form.Text className="text-danger">{error.gender}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="form-group" controlId="formBasicPassword">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                onChange={HandleChangeRegister}
              />
              {error.phone && !form.phone.trim() && (
                <Form.Text className="text-danger">{error.phone}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="form-group" controlId="formBasicEmail">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                onChange={HandleChangeRegister}
              />
              {error.address && !form.address.trim() && (
                <Form.Text className="text-danger">{error.address}</Form.Text>
              )}
            </Form.Group>
            <Button type="submit" className="button-submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Register;
