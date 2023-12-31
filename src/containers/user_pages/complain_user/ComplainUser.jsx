// components react
import React from "react";

// component react-bootstrap
import { Image, Form, Row, Col } from "react-bootstrap";

// css
import "./ComplainUser.scss";

// images
import send from "../../../assets/img/send.png";
import defaultPhoto from "../../../assets/img/default-photo.png";
import flower1 from "../../../assets/img/flower1.png";
import flower2 from "../../../assets/img/flower2.png";
//----------------------------------------------------------

const ComplainUser = () => {
  return (
    <>
      <Image src={flower1} alt="flower1" className="flower1" />
      <Image src={flower2} alt="flower2" className="flower2" />
      <Row className="container-complain-user">
        <Col xs={12} md={2} lg={2} xl={2} className="container-list-user">
          <h4 className="title-complain-user">Customer Complain</h4>
          <div className="dropdown-list-user">
            <Image src={defaultPhoto} className="photo-list-user"></Image>
            <Form.Text className="name-list-user">Rafi Alfian</Form.Text>
          </div>
          <div className="dropdown-list-user">
            <Image src={defaultPhoto} className="photo-list-user"></Image>
            <Form.Text className="name-list-user">Alfian Rafi</Form.Text>
          </div>
        </Col>
        <Col xs={12} md={9} lg={9} xl={9} className="container-message-user">
            <div className="navbar-message-user">
              <Image src={defaultPhoto} className="navbar-photo-profile-user"></Image>
              <div className="navbar-status">
                <Form.Text className="navbar-username">Rafi Alfian</Form.Text>
                <Form.Text className="navbar-on">
                  <div></div> Online
                </Form.Text>
              </div>
            </div>

            <div className="content-message">
              <div className="message1">
                <Form.Text className="user-message">
                  Halo Admin, Estimasi pengiriman buku berapa lama ya?
                </Form.Text>
              </div>

              <div className="message2">
                <Form.Text className="admin-message">
                  Halo kak rafi, Estimasi pengiriman ke Alamat kakak 3 hari ya,
                  mohon ditunggu 🙏🏻
                </Form.Text>
              </div>

              <div className="message1">
                <Form.Text className="user-message">Ok, terima kasih</Form.Text>
              </div>

              <div className="message2">
                <Form.Text className="admin-message">
                  Sama - sama kak{" "}
                </Form.Text>
              </div>

              <div className="content-send-message">
                <div className="send-message">
                  <Form.Text>Write your message here...</Form.Text>
                </div>
                <div className="img-send">
                  <Image src={send}></Image>
                </div>
              </div>
            </div>
        </Col>
      </Row>
    </>
  );
};

export default ComplainUser;
