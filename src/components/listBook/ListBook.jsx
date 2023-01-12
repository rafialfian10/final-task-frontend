// react bootstrap
import {Form, Card} from 'react-bootstrap';

// scss
import "./ListBook.scss";

// images
import listbook1 from '../../assets/img/listbook1.png';
import listbook2 from '../../assets/img/listbook2.png';
import listbook3 from '../../assets/img/listbook3.png';
import listbook4 from '../../assets/img/listbook4.png';
import listbook5 from '../../assets/img/listbook5.png';

const ListBook = () => {
    return (
        <>
            <h4 className='listbook-title'>List Book</h4>
            <div className='container-list'>
                <Card className='list-book'>
                    <Card.Img variant="top" src={listbook1} className='list-image' />
                    <Card.Body className='list-desc'>
                        <Card.Title className='list-title'>My Own Private Mr. Cool</Card.Title>
                        <Form.Text className='list-artist'>By. Indah Hanaco</Form.Text>
                        <div className='container-list-price'>
                            <Form.Text className='list-price'>Rp. 75.000</Form.Text>
                        </div>
                    </Card.Body>
                </Card>

                <Card className='list-book'>
                    <Card.Img variant="top" src={listbook2} className='list-image' />
                    <Card.Body className='list-desc'>
                        <Card.Title className='list-title'>Garis Waktu : Sebuah Perjalanan</Card.Title>
                        <Form.Text className='list-artist'>By. Fiersa Besari</Form.Text>
                        <div className='container-list-price'>
                            <Form.Text className='list-price'>Rp. 49.300</Form.Text>
                        </div>
                    </Card.Body>
                </Card>

                <Card className='list-book'>
                    <Card.Img variant="top" src={listbook3} className='list-image' />
                    <Card.Body className='list-desc'>
                        <Card.Title className='list-title'>Home Cooking ala Xander’s Kitche ...</Card.Title>
                        <Form.Text className='list-artist'>By. Junita</Form.Text>
                        <div className='container-list-price'>
                            <Form.Text className='list-price'>Rp. 168.000</Form.Text>
                        </div>
                    </Card.Body>
                </Card>

                <Card className='list-book'>
                    <Card.Img variant="top" src={listbook4} className='list-image' />
                    <Card.Body className='list-desc'>
                        <Card.Title className='list-title'>Panduan Resmi Tes Cpns Cat 20 ...</Card.Title>
                        <Form.Text className='list-artist'>By. Raditya Panji Umbara</Form.Text>
                        <div className='container-list-price'>
                            <Form.Text className='list-price'>Rp. 184.000</Form.Text>
                        </div>
                    </Card.Body>
                </Card>

                <Card className='list-book'>
                    <Card.Img variant="top" src={listbook5} className='list-image' />
                    <Card.Body className='list-desc'>
                        <Card.Title className='list-title'>Ayahku (Bukan) Pembohong</Card.Title>
                        <Form.Text className='list-artist'>By. Tere Liye</Form.Text>
                        <div className='container-list-price'>
                            <Form.Text className='list-price'>Rp. 130.000</Form.Text>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default ListBook