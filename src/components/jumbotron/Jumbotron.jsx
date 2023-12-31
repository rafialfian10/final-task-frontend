// react bootstrap
import { Form, Image, Row, Col } from "react-bootstrap";

// scss
import "./Jumbotron.scss";

// images
import flower1 from "../../assets/img/flower1.png";
import flower2 from "../../assets/img/flower2.png";

const Jumbotron = () => {
  return (
    <Row className="container-jumbotron">
      <Col>
        <Image src={flower1} className="flower1" />
        <Image src={flower2} className="flower2" />
        <Form.Text className="jumbotron-title">
          With us, you can shop online & help <br /> save your high street at
          the same time
        </Form.Text>
      </Col>
    </Row>
  );
};

export default Jumbotron;
