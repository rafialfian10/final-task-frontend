/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// components react
import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";

// components redux
import { connect, useDispatch } from "react-redux";
import {
  FunctionGetUser,
  FunctionUpdateUser,
} from "../../../redux/features/UserSlice";
import { FunctionGetTransactionsUser } from "../../../redux/features/TransactionSlice";

// components react bootstrap
import { Button, Form, Image, Row, Col, Spinner } from "react-bootstrap";

// components
import ListDownload from "../../../components/listDownload/ListDownload";

// css
import "./ProfileAdmin.scss";
import Swal from "sweetalert2";

// images
import flower1 from "../../../assets/img/flower1.png";
import flower2 from "../../../assets/img/flower2.png";
import message from "../../../assets/img/message.png";
import address from "../../../assets/img/address.png";
import phone from "../../../assets/img/phone.png";
import gender from "../../../assets/img/gender.png";
import defaultPhoto from "../../../assets/img/default-photo.png";
// ----------------------------------------------------------------------

const ProfileAdmin = (props) => {
  const { user, loadUser, transactions, loadTransactionsUser } = props;
  const { userData, usersData, loadingUser, errorMessageUser } = user;
  const {
    transactionData,
    transactionsData,
    loadingTransaction,
    errorMessageTransaction,
  } = transactions;

  // dispatch
  const dispatch = useDispatch();

  let { id } = useParams();
  id = parseInt(id);

  //state form
  const [form, setForm] = useState({
    name: "",
    email: "",
    gender: "",
    phone: "",
    address: "",
  });

  // state error
  const [error, setError] = useState({
    name: "",
    email: "",
    gender: "",
    phone: "",
    address: "",
  });

  // state edit mode
  const [editMode, setEditMode] = useState(false);

  // handle edit mode
  const handleToggleEditMode = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
  };

  // handle cancel edit mode
  const handleCancelEditMode = (e) => {
    e.preventDefault();
    setEditMode(false);
  };

  // handle change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // handle update profile
  const handleUpdateProfile = useMutation(async () => {
    try {
      const messageError = {
        name: "",
        email: "",
        gender: "",
        phone: "",
        address: "",
      };

      // validasi email
      if (form.email === "") {
        messageError.email = "Email is required";
      } else {
        messageError.email = "";
      }

      // validasi gender
      if (form.gender === "") {
        messageError.gender = "Gender is required";
      } else {
        messageError.gender = "";
      }

      // validasi phone
      if (form.phone === "") {
        messageError.phone = "Phone is required";
      } else {
        messageError.phone = "";
      }

      // validasi address
      if (form.address === "") {
        messageError.address = "Address is required";
      } else {
        messageError.address = "";
      }

      if (
        messageError.email === "" &&
        messageError.gender === "" &&
        messageError.phone === "" &&
        messageError.address === ""
      ) {
        const formData = new FormData();
        formData.append("email", form.email);
        formData.append("gender", form.gender);
        formData.append("phone", form.phone);
        formData.append("address", form.address);

        const response = await dispatch(FunctionUpdateUser(formData, id));
        if (response && response.data.code === 200) {
          Swal.fire({
            text: "Profile successfully updated",
            icon: "success",
            confirmButtonText: "Ok",
          });
          setEditMode(false);
          loadUser(id);
          loadTransactionsUser();
        }
      } else {
        setError(messageError);
      }
    } catch (err) {
      console.log(err);
    }
  });

  // handle update photo
  const handleUpdatePhoto = useMutation(async (e) => {
    try {
      let formData = new FormData();
      formData.append("photo", e.target.files[0]);

      const response = await dispatch(FunctionUpdateUser(formData, id));
      if (response && response.data.code === 200) {
        Swal.fire({
          text: "Photo successfully updated",
          icon: "success",
          confirmButtonText: "Ok",
        });
        loadUser(id);
        loadTransactionsUser();
      }
    } catch (err) {
      console.log(err);
    }
  });

  useEffect(() => {
    setForm({
      name: userData?.name || "",
      email: userData?.email || "",
      gender: userData?.gender || "",
      phone: userData?.phone || "",
      address: userData?.address || "",
    });
  }, [userData]);

  useEffect(() => {
    loadUser(id);
    loadTransactionsUser();
  }, [id]);

  return (
    <>
      <Image src={flower1} alt="flower1" className="flower1" />
      <Image src={flower2} alt="flower2" className="flower2" />
      {loadingUser ? (
        <div
          className="position-fixed top-50 start-50 translate-middle"
          style={{ zIndex: 9999 }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row className="profile-container">
          <Col xs={12} md={12} lg={6} xl={8} className="content-profile1">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateProfile.mutate(e);
              }}
            >
              <div className="title-container">
                <h4 className="title-profile">Personal Info</h4>
                {editMode ? (
                  <div>
                    <Button type="submit" className="btn-edit-profile me-2">
                      Save
                    </Button>
                    <Button type="submit" className="btn-edit-profile" onClick={(e) => handleCancelEditMode(e)}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    className="btn-edit-profile"
                    onClick={(e) => handleToggleEditMode(e)}
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
              <Form.Group>
                <div className="email">
                  <Image src={message} alt="message" />
                  <div className="sub-email">
                    {error.email && !form.email.trim() && (
                      <Form.Text className="text-danger">
                        {error.email}
                      </Form.Text>
                    )}
                    <Form.Control
                      readOnly={!editMode}
                      type="email"
                      name="email"
                      className={`form-input info1 ${
                        editMode ? "editable" : ""
                      }`}
                      value={form?.email}
                      onChange={handleChange}
                    />
                    <Form.Label className="info2">Email</Form.Label>
                  </div>
                </div>

                <div className="gender">
                  <Image src={gender} alt="gender" />
                  <div className="sub-gender">
                    {error.gender && !form.gender.trim() && (
                      <Form.Text className="text-danger">
                        {error.gender}
                      </Form.Text>
                    )}
                    <Form.Select
                      disabled={!editMode}
                      aria-label="Default select example"
                      name="gender"
                      className={`form-input info1 ${
                        editMode ? "editable" : ""
                      }`}
                      value={form?.gender || ""}
                      onChange={handleChange}
                    >
                      <option value=""></option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Form.Select>
                    <Form.Label className="info2">Gender</Form.Label>
                  </div>
                </div>

                <div className="phone">
                  <Image src={phone} alt="phone" />
                  <div className="sub-phone">
                    {error.phone && !form.phone.trim() && (
                      <Form.Text className="text-danger">
                        {error.phone}
                      </Form.Text>
                    )}
                    <Form.Control
                      readOnly={!editMode}
                      type="text"
                      name="phone"
                      className={`form-input info1 ${
                        editMode ? "editable" : ""
                      }`}
                      value={form?.phone}
                      onChange={handleChange}
                    />
                    <Form.Label className="info2">Mobile Phone</Form.Label>
                  </div>
                </div>

                <div className="address">
                  <Image src={address} alt="address" />
                  <div className="sub-address">
                    {error.address && !form.address.trim() && (
                      <Form.Text className="text-danger">
                        {error.address}
                      </Form.Text>
                    )}
                    <Form.Control
                      readOnly={!editMode}
                      type="text"
                      name="address"
                      className={`form-input info1 ${
                        editMode ? "editable" : ""
                      }`}
                      value={form?.address}
                      onChange={handleChange}
                    />
                    <Form.Label className="info2">Address</Form.Label>
                  </div>
                </div>
              </Form.Group>
            </Form>
          </Col>

          <Col xs={12} md={12} lg={6} xl={4} className="content-profile2">
            {userData?.photo !== "" ? (
              <Image src={userData?.photo} alt="photo" />
            ) : (
              <Image src={defaultPhoto} alt="defaultPhoto" />
            )}
            <Form.Control
              type="file"
              id="image"
              className="form-input input-image"
              name="image"
              accept="image/*"
              onChange={handleUpdatePhoto.mutate}
            />
            <Button
              onClick={() => {
                document.getElementById("image").click();
              }}
            >
              Change Photo Profile
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    transactions: state.transaction,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: (id) => dispatch(FunctionGetUser(id)),
    loadTransactionsUser: () => dispatch(FunctionGetTransactionsUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAdmin);
