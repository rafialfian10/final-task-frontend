/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */

// components
import { useNavigate } from 'react-router-dom';

// components react bootstrap
import {Form, Card} from 'react-bootstrap';

// scss
import "./ListBook.scss";

const ListBook = ({books, search}) => {

    const navigate = useNavigate()

    return (
        <>
            <h4 className='listbook-title'>List Book</h4>
            <div className='container-list-book'>
                {books?.filter(book => {
                    if(search === "") {
                        return book
                    } else if(book?.title.toLowerCase().includes(search.toLowerCase()) || book?.author.toLowerCase().includes(search.toLowerCase())) {
                        return book
                    } 
                }).map((book, i) => {
                    {if(book?.discount <= 0) {
                        return (
                            <Card className='list-book' key={i}>
                                <Card.Img variant="top" src={book?.thumbnail} className='list-image' />
                                <Card.Body className='list-desc'>
                                    <div className='page'>
                                        {book?.quota < 0 ? <p>{book.quota = 0 }</p>: <p>{book?.quota}</p>}
                                    </div>
                                    <Card.Title className='list-title' onClick={() => {navigate(`/increment_detail_book/${book?.id}`)}}>{book?.title}</Card.Title>
                                    <Form.Text className='list-artist'>By. {book?.author}</Form.Text>
                                    <div className='container-list-price'>
                                        <Form.Text className='list-price'>IDR. {book?.price.toLocaleString()}</Form.Text>
                                    </div>
                                </Card.Body>
                            </Card>
                        )
                    }}
                })}               
            </div>
        </>
    )
}

export default ListBook