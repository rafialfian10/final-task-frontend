/* eslint-disable array-callback-return */
/* eslint-disable no-lone-blocks */
// components react
import { useQuery, useMutation } from "react-query";
import { useParams } from "react-router-dom";

// components react bootstrap
import { Button, Form, Image, Row, Col } from "react-bootstrap";

// components
import ListDownload from "../../../components/listDownload/ListDownload";

// api
import { API } from "../../../config/api";

// css
import "./Profile.scss";

// images
import flower1 from "../../../assets/img/flower1.png";
import flower2 from "../../../assets/img/flower2.png";
import message from "../../../assets/img/message.png";
import address from "../../../assets/img/address.png";
import phone from "../../../assets/img/phone.png";
import gender from "../../../assets/img/gender.png";
import defaultPhoto from "../../../assets/img/default-photo.png";
// ----------------------------------------------------------------------

const Profile = () => {
  let { id } = useParams();
  id = parseInt(id);

  // get data user
  let { data: usersProfiles, refetch: refetchProfile } = useQuery(
    "profileCache",
    async () => {
      const response = await API.get(`/users`);
      return response.data.data;
    }
  );

  // handle submit image
  const handleSubmitImage = useMutation(async (e) => {
    try {
      // form data
      let formData = new FormData();
      formData.append("thumbnail", e.target.files[0]);

      // patch
      let response = await API.patch(`/user/${id}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(response);
      if (response.data.code === 200) {
        refetchProfile();
      }
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <>
      <Image src={flower1} alt="flower1" className="flower1" />
      <Image src={flower2} alt="flower2" className="flower2" />
      {usersProfiles?.map((user, i) => {
        {
          if (user.id === id) {
            return (
              <Row className="profile-container" key={i}>
                <h4 className="title-profile">Personal Info</h4>
                <Col
                  xs={12}
                  md={12}
                  lg={6}
                  xl={8}
                  className="content-profile1"
                >
                  <div className="email">
                    <Image src={message} alt="message" />
                    <div className="sub-email">
                      <p className="info1">{user.email}</p>
                      <p className="info2">Email</p>
                    </div>
                  </div>

                  <div className="profile">
                    <Image src={gender} alt="gender" />
                    <div className="sub-profile">
                      <p className="info1">{user.gender}</p>
                      <p className="info2">Gender</p>
                    </div>
                  </div>

                  <div className="phone">
                    <Image src={phone} alt="phone" />
                    <div className="sub-phone">
                      <p className="info1">{user.phone}</p>
                      <p className="info2">Mobile Phone</p>
                    </div>
                  </div>
                  <div className="address">
                    <Image src={address} alt="address" />
                    <div className="sub-address">
                      <p className="info1">{user.address}</p>
                      <p className="info2">Address</p>
                    </div>
                  </div>
                </Col>

                <Col
                  xs={12}
                  md={12}
                  lg={6}
                  xl={4}
                  className="content-profile2"
                >
                  {user.thumbnail !== "" ? (
                    <Image src={user.thumbnail} alt="thumbnail" />
                  ) : (
                    <Image src={defaultPhoto} alt="defaultPhoto" />
                  )}
                  <Form.Control
                    type="file"
                    id="image"
                    className="form-input input-image"
                    name="image"
                    accept="image/*"
                    onChange={handleSubmitImage.mutate}
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
            );
          }
        }
      })}
      <ListDownload />
    </>
  );
};

export default Profile;
