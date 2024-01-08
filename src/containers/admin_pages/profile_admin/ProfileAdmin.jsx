/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// components react
import { useEffect } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";

// components redux
import { connect, useDispatch } from "react-redux";
import { FunctionGetTransactionsUser } from "../../../redux/features/TransactionSlice";
import {
  FunctionGetUser,
  FunctionUpdateUser,
} from "../../../redux/features/UserSlice";

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
  console.log(props);
  const { user, loadUser } = props;
  const { userData, usersData, loadingUser, errorMessageUser } = user;

  // dispatch
  const dispatch = useDispatch();

  let { id } = useParams();
  id = parseInt(id);

  // handle update photo
  const handleUpdatePhoto = useMutation(async (e) => {
    try {
      let formData = new FormData();
      formData.append("thumbnail", e.target.files[0]);

      const response = await dispatch(FunctionUpdateUser(formData, id));
      if (response && response.data.code === 200) {
        Swal.fire({
          text: "Photo successfully updated",
          icon: "success",
          confirmButtonText: "Ok",
        });
        loadUser(id);
      }
    } catch (err) {
      console.log(err);
    }
  });

  useEffect(() => {
    loadUser(id);
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
          <h4 className="title-profile">Personal Info</h4>
          <Col xs={12} md={12} lg={6} xl={8} className="content-profile1">
            <div className="email">
              <Image src={message} alt="message" />
              <div className="sub-email">
                <p className="info1">{userData.email}</p>
                <p className="info2">Email</p>
              </div>
            </div>

            <div className="profile">
              <Image src={gender} alt="gender" />
              <div className="sub-profile">
                <p className="info1">{userData.gender}</p>
                <p className="info2">Gender</p>
              </div>
            </div>

            <div className="phone">
              <Image src={phone} alt="phone" />
              <div className="sub-phone">
                <p className="info1">{userData.phone}</p>
                <p className="info2">Mobile Phone</p>
              </div>
            </div>
            <div className="address">
              <Image src={address} alt="address" />
              <div className="sub-address">
                <p className="info1">{userData.address}</p>
                <p className="info2">Address</p>
              </div>
            </div>
          </Col>

          <Col xs={12} md={12} lg={6} xl={4} className="content-profile2">
            {userData.thumbnail !== "" ? (
              <Image src={userData.thumbnail} alt="thumbnail" />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: (id) => dispatch(FunctionGetUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAdmin);
