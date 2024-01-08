/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// components
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../popup/Popup";

// components redux
import { connect, useDispatch } from "react-redux";
import { FunctionGetBook } from "../../redux/features/BookSlice";
import { FunctionCreateCart } from "../../redux/features/CartSlice";

// components react bootstrap
import { Button, Image, Row, Col, Spinner } from "react-bootstrap";

// css
import "./DescriptionIncrement.scss";
import Swal from "sweetalert2";

// image
import bracket from "../../assets/img/white-bracket.png";
// ---------------------------------------------------------

const DescriptionIncrement = (props) => {
  const { book, loadBook } = props;
  const { bookData, booksData, loadingBook, errorMessageBook } = book;

  // dispatch
  const dispatch = useDispatch();

  const navigate = useNavigate();

  let { id } = useParams();
  id = parseInt(id);

  // state popup
  const [popup, setPopup] = useState(false);

  const handleAddCart = useMutation(async (e) => {
    e.preventDefault();

    const dataBook = {
      book_id: bookData?.id,
    };

    const body = JSON.stringify(dataBook);

    let token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        text: "Please login account",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      navigate("/");
    } else {
      const response = await dispatch(FunctionCreateCart(body));
      if (response && response.data.code === 200) {
        setPopup(true);
      }
      loadBook(id);
    }
  });

  useEffect(() => {
    loadBook(id);
  }, [id]);

  return (
    <>
      <Popup popup={popup} setPopup={setPopup} />
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
          className={`desc-increment-container ${
            window.innerWidth <= 480 ? "w-100" : ""
          }`}
        >
          <h4 className="detail-title-desc-increment">About This Book</h4>
          <Col xs={12} md={12} xl={12}>
            <p className="detail-info-desc-increment">
              {bookData?.description}
            </p>
            <div className="btn-cart">
              <Button
                type="submit"
                className="button-cart"
                onClick={(e) => {
                  handleAddCart.mutate(e);
                }}
              >
                <Image src={bracket} className="img-bracket" /> Add cart
              </Button>
            </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DescriptionIncrement);
