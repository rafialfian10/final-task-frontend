/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// components react
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

// components redux
import { connect } from "react-redux";
import { FunctionGetBook } from "../../redux/features/BookSlice.js";

// components react bootstrap
import { Form, Image, Row, Col, Spinner } from "react-bootstrap";

// css
import "./DetailImage.scss";

// images
import flower1 from "../../assets/img/flower1.png";
import flower2 from "../../assets/img/flower2.png";
// -----------------------------------------------------------------------

const DetailImage = (props) => {
  const { book, loadBook } = props;
  const { bookData, booksData, loadingBook, errorMessageBook } = book;

  let { id } = useParams();
  id = parseInt(id);

  useEffect(() => {
    loadBook(id);
  }, [id]);

  return (
    <>
      <Image src={flower1} className="flower1" />
      <Image src={flower2} className="flower2" />
      {loadingBook ? (
        <div
          className="position-fixed top-50 start-50 translate-middle"
          style={{ zIndex: 9999 }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row
          className={`detail-img-container ${
            window.innerWidth <= 480 ? "w-100" : ""
          }`}
        >
          <Col xs={12} md={12} xl={6} className="content-thumbnail">
            <Image
              src={bookData?.thumbnail}
              className="img-thumbnail"
              alt="thumbnail"
            />
          </Col>
          <Col xs={12} md={12} xl={6} className="detail-book-info">
            <Form.Text className="detail-title">{bookData?.title}</Form.Text>
            <Form.Text className="detail-artist">
              By. {bookData?.author}
            </Form.Text>
            <Form.Text className="detail-publication-date">
              Publication date
            </Form.Text>
            <Form.Text className="detail-date">
              {moment(bookData?.publication_date).format("YYYY-MM-DD")}
            </Form.Text>
            <Form.Text className="detail-pages">Pages</Form.Text>
            <Form.Text className="pages">{bookData?.pages}</Form.Text>
            <Form.Text className="detail-isbn">ISBN</Form.Text>
            <Form.Text className="isbn">{bookData?.isbn}</Form.Text>
            <Form.Text className="detail-price">Price</Form.Text>
            <Form.Text className="price">
              {bookData?.price
                ? `IDR. ${bookData.price.toLocaleString()}`
                : "Price not available"}
            </Form.Text>
          </Col>
        </Row>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    book: state.book,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadBook: (id) => dispatch(FunctionGetBook(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailImage);
