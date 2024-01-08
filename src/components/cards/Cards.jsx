/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// components react
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// components react bootstrap
import { Swiper, SwiperSlide } from "swiper/react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { Pagination } from "swiper";

// components redux
import { connect, useDispatch } from "react-redux";
import { FunctionGetBooksPromo } from "../../redux/features/BookPromoSlice";
import {
  FunctionCreateCart,
  FunctionGetCarts,
} from "../../redux/features/CartSlice";

// components
import Popup from "../popup/Popup";

// css
import "./Cards.scss";
import "swiper/css";
import "swiper/css/pagination";
import Swal from "sweetalert2";
// -----------------------------------------------------------

const Cards = (props) => {
  const { bookPromo, loadBookPromo, loadCart } = props;
  const { booksPromoData, loadingBookPromo, errorMessageBookPromo } = bookPromo;
  
  // dispatch
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // state popup
  const [popup, setPopup] = useState(false);

  // handle book promo
  const handleBookPromo = async (id) => {
    try {
      let token = localStorage.getItem("token");
      if (!token) {
        //alert
        Swal.fire({
          text: "Please login account",
          icon: "warning",
          confirmButtonText: "Ok",
        });
        navigate("/");
      } else {
        const data = {
          book_id: id,
        };

        const body = JSON.stringify(data);

        const response = await dispatch(FunctionCreateCart(body));
        if (response && response.data.code === 200) {
          setPopup(true);
          loadBookPromo();
          loadCart();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadBookPromo();
    loadCart();
  }, []);

  return (
    <>
      <Popup popup={popup} setPopup={setPopup} />
      {loadingBookPromo ? (
        <div
          className="w-100 position-relative text-center"
          style={{ zIndex: 9999 }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Swiper
          slidesPerView={3}
          spaceBetween={50}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          loop={true}
          className="mySwiper container-card-slider"
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
        >
          {booksPromoData?.map((book, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="container-sub-card-slider">
                  <Card className="book-container-promo">
                    <Card.Img
                      variant="top"
                      src={book?.thumbnail}
                      className="card-image"
                    />
                    <Card.Body className="book-desc">
                      <Card.Title
                        className="book-title"
                        onClick={() => {
                          navigate(`/increment_detail_book/${book?.id}`);
                        }}
                      >
                        {book?.title}
                      </Card.Title>
                      <Form.Text className="author">
                        By. {book?.author}
                      </Form.Text>
                      <Card.Text className="desc">
                        {book?.description.length > 30 &&
                          book?.description.slice(0, 75) + "..."}
                      </Card.Text>
                      <div className="price-container">
                        <Form.Text className="price">
                          IDR. {book?.price.toLocaleString()}
                        </Form.Text>
                        <Button
                          className="btn-book"
                          onClick={() => handleBookPromo(book?.id)}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    bookPromo: state.bookPromo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadBookPromo: () => dispatch(FunctionGetBooksPromo()),
    loadCart: () => dispatch(FunctionGetCarts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
