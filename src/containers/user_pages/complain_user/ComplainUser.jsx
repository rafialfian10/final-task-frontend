// component
import React from "react";

// component react-bootstrap
import { Container, Image, Form } from "react-bootstrap";

// image
import send from "../../../assets/img/send.png";
import defaultPhoto from "../../../assets/img/default-photo.png";
import flower1 from "../../../assets/img/flower1.png";
import flower2 from "../../../assets/img/flower2.png";

// css
import "./ComplainUser.scss";

const ComplainUser = () => {
  return (
    <>
      <Image src={flower1} alt="flower1" className="flower1" />
      <Image src={flower2} alt="flower2" className="flower2" />
      <Container className="container-complain-user">
        <h4>Customer Complain</h4>
        <div className="content-complain-user">
          <div className="message-complain">
            <div className="navbar-message">
              <Image src={defaultPhoto} className="photo-profile-user"></Image>
              <div className="status">
                <Form.Text className="user">Admin Si paling Cepat</Form.Text>
                <Form.Text className="on">
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
          </div>
        </div>
      </Container>
    </>
  );
};

export default ComplainUser;
