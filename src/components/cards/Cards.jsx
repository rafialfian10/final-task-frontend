// components react bootstrap
import { Button, Card, Form } from "react-bootstrap";
import { Pagination } from "swiper";

// scss
import "./Cards.scss";
import "swiper/css";
import "swiper/css/pagination";

// images
import book1 from "../../assets/img/book1.png";
import book2 from "../../assets/img/book2.png";

// Import Swiper React components
// import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const Cards = () => {

  return (
    <>
    <Swiper slidesPerView={3} spaceBetween={30} pagination={{ clickable: true}} modules={[Pagination]}className="mySwiper container-card">
        <SwiperSlide className="sub-content-card">
             <Card className="book-container">
                 <Card.Img variant="top" src={book1} className="card-image" />
                 <Card.Body className="book-desc">
                     <Card.Title className="book-title">Sebuah Seni untuk Bersikap Bodo Amat</Card.Title>
                     <Form.Text className="artist">By. Mark Manson</Form.Text>
                     <Card.Text className="desc">Selama beberapa tahun belakangan, Mark Manson—melalui blognya yang sangat populer tel ...</Card.Text>
                     <div className="price-container">
                        <Form.Text className="price">Rp. 59.000</Form.Text>
                         <Button className="btn-book">Add to Cart</Button>
                     </div>
                 </Card.Body>
             </Card>
        </SwiperSlide>

        <SwiperSlide className="sub-content-card">
             <Card className="book-container">
                 <Card.Img variant="top" src={book1} className="card-image" />
                 <Card.Body className="book-desc">
                     <Card.Title className="book-title">Sebuah Seni untuk Bersikap Bodo Amat</Card.Title>
                     <Form.Text className="artist">By. Mark Manson</Form.Text>
                     <Card.Text className="desc">Selama beberapa tahun belakangan, Mark Manson—melalui blognya yang sangat populer tel ...</Card.Text>
                     <div className="price-container">
                        <Form.Text className="price">Rp. 59.000</Form.Text>
                         <Button className="btn-book">Add to Cart</Button>
                     </div>
                 </Card.Body>
             </Card>
        </SwiperSlide>

        <SwiperSlide className="sub-content-card">
            <Card className="book-container">
                <Card.Img variant="top" src={book2} className="card-image" />
                <Card.Body className="book-desc">
                    <Card.Title className="book-title">Warm Heart</Card.Title>
                    <Form.Text className="artist">By. Valerie Patkar</Form.Text>
                    <Card.Text className="desc">Dua insan manusia harus terjebak dalam dilema cinta yang memaksa salah satu dari mereka pergi me ...</Card.Text>
                    <div className="price-container">
                        <Form.Text className="price">Rp. 59.000</Form.Text>
                        <Button className="btn-book">Add to Cart</Button>
                    </div>
                </Card.Body>
            </Card>
        </SwiperSlide>

        <SwiperSlide className="sub-content-card">
             <Card className="book-container">
                 <Card.Img variant="top" src={book1} className="card-image" />
                 <Card.Body className="book-desc">
                     <Card.Title className="book-title">Sebuah Seni untuk Bersikap Bodo Amat</Card.Title>
                     <Form.Text className="artist">By. Mark Manson</Form.Text>
                     <Card.Text className="desc">Selama beberapa tahun belakangan, Mark Manson—melalui blognya yang sangat populer tel ...</Card.Text>
                     <div className="price-container">
                        <Form.Text className="price">Rp. 59.000</Form.Text>
                         <Button className="btn-book">Add to Cart</Button>
                     </div>
                 </Card.Body>
             </Card>
        </SwiperSlide>

        <SwiperSlide className="sub-content-card">
             <Card className="book-container">
                 <Card.Img variant="top" src={book1} className="card-image" />
                 <Card.Body className="book-desc">
                     <Card.Title className="book-title">Sebuah Seni untuk Bersikap Bodo Amat</Card.Title>
                     <Form.Text className="artist">By. Mark Manson</Form.Text>
                     <Card.Text className="desc">Selama beberapa tahun belakangan, Mark Manson—melalui blognya yang sangat populer tel ...</Card.Text>
                     <div className="price-container">
                        <Form.Text className="price">Rp. 59.000</Form.Text>
                         <Button className="btn-book">Add to Cart</Button>
                     </div>
                 </Card.Body>
             </Card>
        </SwiperSlide>

        <SwiperSlide className="sub-content-card">
            <Card className="book-container">
                <Card.Img variant="top" src={book2} className="card-image" />
                <Card.Body className="book-desc">
                    <Card.Title className="book-title">Warm Heart</Card.Title>
                    <Form.Text className="artist">By. Valerie Patkar</Form.Text>
                    <Card.Text className="desc">Dua insan manusia harus terjebak dalam dilema cinta yang memaksa salah satu dari mereka pergi me ...</Card.Text>
                    <div className="price-container">
                        <Form.Text className="price">Rp. 59.000</Form.Text>
                        <Button className="btn-book">Add to Cart</Button>
                    </div>
                </Card.Body>
            </Card>
        </SwiperSlide>
    </Swiper>
  </> 
  );
};

export default Cards;

        

      
