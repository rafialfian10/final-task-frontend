// components react bootstrap
import { Button, Card, Form } from 'react-bootstrap'

//images
import listbook1 from '../../assets/img/listbook1.png';
import listbook2 from '../../assets/img/listbook2.png';

// css
import "./ListDownload.scss";

const ListDownload = () => {
    return (
        <>
            <Form.Text className='download-title'>My Books</Form.Text>
            <div className='container-download'>
                <Card className='list-download'>
                    <Card.Img variant="top" src={listbook1} className='img-list-download' />
                    <Card.Body className='list-desc'>
                        <Card.Title className='list-title'>My Own Private Mr. Cool</Card.Title>
                        <Form.Text className='list-artist'>By. Indah Hanaco</Form.Text>
                        <Button className='btn-download'>Download</Button>
                    </Card.Body>
                </Card>

                <Card className='list-download'>
                    <Card.Img variant="top" src={listbook2} className='img-list-download' />
                    <Card.Body className='list-desc'>
                        <Card.Title className='list-title'>Sebuah Seni untuk bersikap Bodo A...</Card.Title>
                        <Form.Text className='list-artist'>By. Mark Manson</Form.Text>
                        <Button className='btn-download'>Download</Button>
                    </Card.Body>
                </Card>

                <Card className='list-download'>
                    <Card.Img variant="top" src={listbook2} className='img-list-download' />
                    <Card.Body className='list-desc'>
                        <Card.Title className='list-title'>Sebuah Seni untuk bersikap Bodo A...</Card.Title>
                        <Form.Text className='list-artist'>By. Mark Manson</Form.Text>
                        <Button className='btn-download'>Download</Button>
                    </Card.Body>
                </Card>

                <Card className='list-download'>
                    <Card.Img variant="top" src={listbook2} className='img-list-download' />
                    <Card.Body className='list-desc'>
                        <Card.Title className='list-title'>Sebuah Seni untuk bersikap Bodo A...</Card.Title>
                        <Form.Text className='list-artist'>By. Mark Manson</Form.Text>
                        <Button className='btn-download'>Download</Button>
                    </Card.Body>
                </Card>

                <Card className='list-download'>
                    <Card.Img variant="top" src={listbook2} className='img-list-download' />
                    <Card.Body className='list-desc'>
                        <Card.Title className='list-title'>Sebuah Seni untuk bersikap Bodo A...</Card.Title>
                        <Form.Text className='list-artist'>By. Mark Manson</Form.Text>
                        <Button className='btn-download'>Download</Button>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default ListDownload