// components react
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import moment from "moment";

// components react bootstrap
import { Form, Image, Row, Col } from "react-bootstrap";

// api
import { API } from "../../config/api.js";

// css
import "./DetailImage.scss";

// images
import flower1 from "../../assets/img/flower1.png";
import flower2 from "../../assets/img/flower2.png";
// -----------------------------------------------------------------------

const DetailImage = () => {
  let { id } = useParams();
  id = parseInt(id);

  // query data book by id
  let { data: detailBook } = useQuery("bookDetailCache", async () => {
    const response = await API.get(`/book/${id}`);
    return response.data.data;
  });

  return (
    <>
      <Image src={flower1} className="flower1" />
      <Image src={flower2} className="flower2" />
      <Row
        className={`detail-img-container ${
          window.innerWidth <= 480 ? "w-100" : ""
        }`}
      >
        <Col xs={12} md={12} xl={6} className="content-thumbnail">
          <Image
            src={detailBook?.thumbnail}
            className="img-thumbnail"
            alt="thumbnail"
          />
        </Col>
        <Col xs={12} md={12} xl={6} className="detail-book-info">
          <Form.Text className="detail-title">{detailBook?.title}</Form.Text>
          <Form.Text className="detail-artist">
            By. {detailBook?.author}
          </Form.Text>
          <Form.Text className="detail-publication-date">
            Publication date
          </Form.Text>
          <Form.Text className="detail-date">
            {moment(detailBook?.publication_date).format("YYYY-MM-DD")}
          </Form.Text>
          <Form.Text className="detail-pages">Pages</Form.Text>
          <Form.Text className="pages">{detailBook?.pages}</Form.Text>
          <Form.Text className="detail-isbn">ISBN</Form.Text>
          <Form.Text className="isbn">{detailBook?.isbn}</Form.Text>
          <Form.Text className="detail-price">Price</Form.Text>
          <Form.Text className="price">
            IDR. {detailBook?.price.toLocaleString()}
          </Form.Text>
        </Col>
      </Row>
    </>
  );
};

export default DetailImage;
