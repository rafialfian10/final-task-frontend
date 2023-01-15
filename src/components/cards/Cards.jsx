/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
// components react bootstrap
import { Button, Card, Form } from "react-bootstrap";
import { Pagination } from "swiper";

// component
import { useQuery } from "react-query";

// api
import { API } from "../../config/api";

// scss
import "./Cards.scss";
import "swiper/css";
import "swiper/css/pagination";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

const Cards = () => {

    let { data: bookPromo} = useQuery('booksPromoCache', async () => {
        const response = await API.get(`/books`);
        return response.data.data;
    });

    return (
        <>
            <Swiper slidesPerView={3} spaceBetween={30} pagination={{ clickable: true}} modules={[Pagination]}className="mySwiper container-card">
                <SwiperSlide className="sub-content-card">
                    {bookPromo?.map((book, i) => {
                        {if(book.discount > 0) {
                            return (
                                <Card className="book-container-promo">
                                    <Card.Img variant="top" src={book.thumbnail} className="card-image" />
                                    <Card.Body className="book-desc">
                                        <Card.Title className="book-title">{book.title}</Card.Title>
                                        <Form.Text className="author">By. {book.author}</Form.Text>
                                        <Card.Text className="desc">{book.description}</Card.Text>
                                        <div className="price-container">
                                            <Form.Text className="price">Rp. {book.price.toLocaleString()}</Form.Text>
                                            <Button className="btn-book">Add to Cart</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            )
                        }}
                    })}    
                </SwiperSlide>
            </Swiper>
        </> 
  );
};

export default Cards;

        

      
