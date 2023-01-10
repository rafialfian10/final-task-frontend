// components
import { useState } from 'react'; 

// components react bootstrap
import {Button, Card, Form, Carousel } from 'react-bootstrap';

// scss
import "./Cards.scss";

// images
import book1 from '../../assets/img/book1.png';
import book2 from '../../assets/img/book2.png';
import book3 from '../../assets/img/book3.png';

const Cards = () => {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);

    }
    return (
        <>
            {/* <Carousel activeIndex={index} onSelect={handleSelect} >
                <Carousel.Item > */}
                    <div className='container-card'>
                        {/* book 1 */}
                        <Card className='book-container'>
                            <Card.Img variant="top" src={book1} className='card-image' />
                            <Card.Body className='book-desc'>
                                <Card.Title className='book-title'>Sebuah Seni untuk Bersikap Bodo Amat</Card.Title>
                                <Form.Text className='artist'>By. Mark Manson</Form.Text>
                                <Card.Text className='desc'>Selama beberapa tahun belakangan, Mark Manson—melalui blognya yang sangat populer tel ...</Card.Text>
                                <div className='price-container'>
                                    <Form.Text className='price'>Rp. 59.000</Form.Text>
                                    <Button className='btn-book'>Add to Cart</Button>
                                </div>
                            </Card.Body>
                        </Card>

                        {/* book 2 */}
                        <Card className='book-container'>
                            <Card.Img variant="top" src={book2} className='card-image' />
                            <Card.Body className='book-desc'>
                                <Card.Title className='book-title'>Warm Heart</Card.Title>
                                <Form.Text className='artist'>By. Valerie Patkar</Form.Text>
                                <Card.Text className='desc'>Dua insan manusia harus terjebak dalam dilema cinta yang memaksa salah satu dari mereka pergi me ...</Card.Text>
                                <div className='price-container'>
                                    <Form.Text className='price'>Rp. 59.000</Form.Text>
                                    <Button className='btn-book'>Add to Cart</Button>
                                </div>
                            </Card.Body>
                        </Card> 
                        
                        {/* book 3 */}
                        <Card className='book-container'>
                            <Card.Img variant="top" src={book3} className='card-image' />
                            <Card.Body className='book-desc'>
                                <Card.Title className='book-title'>Boys do White Love Letter</Card.Title>
                                <Form.Text className='artist'>By. Air Langga</Form.Text>
                                <Card.Text className='desc'>Selama beberapa tahun belakangan, Air Langga—melalui blognya yang sangat populer tel ...</Card.Text>
                                <div className='price-container'>
                                    <Form.Text className='price'>Rp. 59.000</Form.Text>
                                    <Button className='btn-book'>Add to Cart</Button>
                                </div>
                            </Card.Body>
                        </Card>    

                        {/* book 4 */}
                        {/* <Card className='book-container'>
                            <Card.Img variant="top" src={book1} className='card-image' />
                            <Card.Body className='book-desc'>
                                <Card.Title className='book-title'>Sebuah Seni untuk Bersikap Bodo Amat</Card.Title>
                                <Form.Text className='artist'>By. Mark Manson</Form.Text>
                                <Card.Text className='desc'>Selama beberapa tahun belakangan, Mark Manson—melalui blognya yang sangat populer tel ...</Card.Text>
                                <Form.Text className='price'>Rp. 59.000</Form.Text>
                                <Button className='btn-book'>Add to Cart</Button>
                            </Card.Body>
                        </Card> */}
                    </div>
                {/* </Carousel.Item> 
            </Carousel> */}
        </>
    )
}

export default Cards