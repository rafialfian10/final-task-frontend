// components
import { useQuery } from 'react-query'
import { API } from '../../config/api'

// react bootstrap
import {Form, Card} from 'react-bootstrap';

// scss
import "./ListBook.scss";

const ListBook = () => {

    // query data book
    let { data: books} = useQuery('booksCache', async () => {
        const response = await API.get(`/books`);
        return response.data.data;
    });

    console.log(books)
    return (
        <>
            <h4 className='listbook-title'>List Book</h4>
            <div className='container-list'>
                {books?.map((book, i) => {
                    return (
                        <Card className='list-book' key={i}>
                            <Card.Img variant="top" src={book.thumbnail} className='list-image' />
                            <Card.Body className='list-desc'>
                                <Card.Title className='list-title'>{book.title}</Card.Title>
                                <Form.Text className='list-artist'>By. {book.author}</Form.Text>
                                <div className='container-list-price'>
                                    <Form.Text className='list-price'>Rp. {book.price.toLocaleString()}</Form.Text>
                                </div>
                            </Card.Body>
                        </Card>
                    )
                })}               
            </div>
        </>
    )
}

export default ListBook