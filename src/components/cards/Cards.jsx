/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
// components react bootstrap
import { Button, Card, Form } from "react-bootstrap";
import { Pagination } from "swiper";

// component
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Popup from "../popup/Popup";

// api
import { API } from "../../config/api";

// scss
import "./Cards.scss";
import "swiper/css";
import "swiper/css/pagination";
import Swal from "sweetalert2";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

const Cards = () => {

    const navigate = useNavigate()

    // state popup
    const [popup, setPopup] = useState(false)

    // state number
    // const [number, setNumber] = useState()

    // books promo
    let { data: booksPromo, refetch: refetchBookPromo } = useQuery('booksPromoCache', async () => {
        const response = await API.get(`/books-promo`);
        return response.data.data;
    });

    // console.log(booksPromo)
    
    const handleBookPromo = async (id) => {
        try {
          const data = {
            book_id: id,
          }
    
          const body = JSON.stringify(data)
    
          const response = await API.post("/cart", body)
          if(response.data.code === 200) {
            setPopup(true)
          }
          refetchBookPromo()

        } catch (error) {
          console.log(error)
        }
      }

    // handler show login (jika belum login maka lempar kembali ke halaman home)
    const showLogin = () => {
    let token = localStorage.getItem("token")
        if(!token) {     
            //alert
            Swal.fire({
                text: 'Please login account',
                icon: 'warning',
                confirmButtonText: 'Ok'
            })
            navigate("/")  
        } 
    }

    return (
        <>
            <Popup popup={popup} setPopup={setPopup} />
            <Swiper slidesPerView={3} spaceBetween={50} pagination={{ clickable: true}} modules={[Pagination]}className="mySwiper container-card-slider">
                {booksPromo?.map((book, i) => {
                    return (
                        <SwiperSlide key={i}>
                            <div className="container-sub-card-slider">
                                <Card className="book-container-promo">
                                    <Card.Img variant="top" src={book.thumbnail} className="card-image" />
                                    <Card.Body className="book-desc">
                                        <Card.Title className="book-title">{book.title}</Card.Title>
                                        <Form.Text className="author">By. {book.author}</Form.Text>
                                        <Card.Text className="desc">{book.description}</Card.Text>
                                        <div className="price-container">
                                            <Form.Text className="price">Rp. {book.price.toLocaleString()}</Form.Text>
                                            <Button className="btn-book" onClick={() => { showLogin();handleBookPromo(book.id)}}>Add to Cart</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>                      
                        </SwiperSlide>
                    )
                })}    
            </Swiper>
        </> 
  );
};

export default Cards;

        

      
