/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// components react
import { useMutation } from "react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// components redux
import { connect } from "react-redux";
import {
  FunctionGetBooks,
  FunctionDeleteBook,
} from "../../../redux/features/BookSlice";

// component react bootstrap
import {
  Form,
  Card,
  Dropdown,
  Image,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";

// components
import ModalPromo from "../modal_promo/ModalPromo";
import ModalUpdateBook from "../modal_update_book/ModalUpdateBook";

// css
import "./IncomBook.scss";
import Swal from "sweetalert2";

// images
import titik3 from "../../../assets/img/titik3.png";
import flower1 from "../../../assets/img/flower1.png";
import flower2 from "../../../assets/img/flower2.png";
// -----------------------------------------------------------------

const IncomBook = (props) => {
  const { books, deleteBook, loadBook, search } = props;
  const { bookData, booksData, loading, errorMessage } = books;

  const navigate = useNavigate();

  // state value
  const [value, setValue] = useState();

  // state modal promo
  const [modalPromo, setModalPromo] = useState(false);

  // state modal update book
  const [modalUpdate, setModalUpdate] = useState(false);

  // state id trip
  const [bookId, setBookId] = useState();

  // handle delete book
  const handleDeleteBook = useMutation(async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await deleteBook(id);
          if (response && response.data.code === 200) {
            Swal.fire({
              text: "Book successfully deleted",
              icon: "success",
              confirmButtonText: "Ok",
            });
            loadBook();
            navigate("/incom_book");
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  });

  useEffect(() => {
    loadBook();
  }, []);

  return (
    <>
      <Image src={flower1} alt="flower1" className="flower1" />
      <Image src={flower2} alt="flower2" className="flower2" />
      <ModalUpdateBook
        modalUpdate={modalUpdate}
        setModalUpdate={setModalUpdate}
        value={value}
        bookId={bookId}
        loadBook={loadBook}
      />
      <ModalPromo
        modalPromo={modalPromo}
        setModalPromo={setModalPromo}
        value={value}
        bookId={bookId}
        loadBook={loadBook}
      />
      <div className="container-incom-book">
        <h4 className="incom-book-title">Incom Book</h4>
        {!loading ? (
          <div
            className="position-fixed top-50 start-50 translate-middle border border-dark"
            style={{ zIndex: 9999 }}
          >
            <Spinner animation="border" role="status" className="border border-danger">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Row xs={1} md={2} xl={5} className="w-100 m-0 g-3">
            {booksData
              ?.filter((book) => {
                if (search === "") {
                  return book;
                } else if (
                  book?.title.toLowerCase().includes(search.toLowerCase()) ||
                  book?.author.toLowerCase().includes(search.toLowerCase())
                ) {
                  return book;
                }
                return false;
              })
              .map((book, i) => {
                return (
                  <Col key={i}>
                    <Card className="list-incom-book">
                      <Dropdown className="dropdown-incom-book">
                        <Image src={titik3} alt="titik3" className="titik3" />
                        <Dropdown.Toggle
                          id="dropdown-autoclose-true"
                          className="toggle-incom-book"
                        ></Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu-incom-book">
                          <Dropdown.Item
                            onClick={() => {
                              setBookId(book.id);
                              setModalUpdate(true);
                              setValue(book);
                            }}
                          >
                            Update Book
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              setBookId(book.id);
                              setModalPromo(true);
                              setValue(book);
                            }}
                          >
                            Set Discount
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              setBookId(book.id);
                              handleDeleteBook.mutate(book.id);
                            }}
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      <Card.Img
                        variant="top"
                        src={book.thumbnail}
                        className="incom-book-image"
                      />
                      <Card.Body className="incom-book-desc">
                        <Card.Title className="incom-book-title">
                          {book.title}
                        </Card.Title>
                        <Form.Text className="incom-book-artist">
                          By. {book.author}
                        </Form.Text>
                        <Form.Text className="incom-book-price">
                          IDR. {book.price.toLocaleString()}
                        </Form.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    books: state.book,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadBook: () => dispatch(FunctionGetBooks()),
    deleteBook: (id) => dispatch(FunctionDeleteBook(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomBook);
