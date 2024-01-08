/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// components react
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// components redux
import { connect } from "react-redux";
import { FunctionGetBooks } from "../../redux/features/BookSlice";

// components react bootstrap
import { Form, Card, Row, Col, Spinner } from "react-bootstrap";

// css
import "./ListBook.scss";
// ------------------------------------------------------

const ListBook = (props) => {
  const { book, loadBook, search } = props;
  const { bookData, booksData, loadingBook, errorMessageBook } = book;

  const navigate = useNavigate();

  useEffect(() => {
    loadBook();
  }, []);

  return (
    <div className="container-list-book">
      <h4 className="listbook-title">List Book</h4>
      {loadingBook ? (
        <div
          className="w-100 position-relative text-center"
          style={{ zIndex: 9999 }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row xs={1} md={2} xl={5} className="w-100 m-0 g-3">
          <>
            {booksData
              ?.filter((book) => {
                if (search === "") {
                  return !book.is_promo;
                } else if (
                  book?.title.toLowerCase().includes(search.toLowerCase()) ||
                  (book?.author.toLowerCase().includes(search.toLowerCase()) &&
                    !book?.is_promo)
                ) {
                  return book;
                }
              })
              .map((book, i) => (
                <Col key={i}>
                  <Card className="list-book">
                    <Card.Img
                      variant="top"
                      src={book?.thumbnail}
                      className="list-image"
                    />
                    <Card.Body className="list-desc">
                      <div className="page">
                        <p>{Math.max(0, book?.quota)}</p>
                      </div>
                      <Card.Title
                        className="list-title"
                        onClick={() => {
                          navigate(`/increment_detail_book/${book?.id}`);
                        }}
                      >
                        {book?.title}
                      </Card.Title>
                      <Form.Text className="list-artist">
                        By. {book?.author}
                      </Form.Text>
                      <div className="container-list-price">
                        <Form.Text className="list-price">
                          IDR. {book?.price.toLocaleString()}
                        </Form.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </>
        </Row>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    book: state.book,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadBook: () => dispatch(FunctionGetBooks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListBook);
