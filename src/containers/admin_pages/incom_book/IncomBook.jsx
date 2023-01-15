// components
import { useQuery, useMutation } from 'react-query'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalUpdateBook from '../modal_update_book/ModalUpdateBook';

// api
import { API } from '../../../config/api';

// react bootstrap
import {Form, Card, Dropdown, Image} from 'react-bootstrap';

// image
import titik3 from '../../../assets/img/titik3.png' 
import flower1 from '../../../assets/img/flower1.png' 
import flower2 from '../../../assets/img/flower2.png' 

// scss
import "./IncomBook.scss";
import Swal from "sweetalert2";

const IncomBook = () => {

    // query data book
    let { data: books, refetch:refetchBook} = useQuery('booksCache', async () => {
        const response = await API.get(`/books`);
        return response.data.data;
    });

    const navigate = useNavigate()

    // state value
    const [value, setValue] = useState()

    // state modal
    const [modalUpdate, setModalUpdate] = useState(false)

    // state id trip
    const [bookId, setBookId] = useState()
    
    // handle delete trip
    const handleDeleteBook = useMutation( async (id) => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
              }).then(async (result) => {
                if (result.isConfirmed) {

                // konfigurasi file
                const config = {
                    headers: {
                    'Content-type': 'multipart/form-data',
                    'Authorization': "Bearer " + localStorage.getItem("token")
                    },
                }
                    
                // delete trip data
                const response = await API.delete(`/book/${id}`, config);
                if(response.status === 200) {
                    refetchBook()
                }
                console.log("Response :", response);

                Swal.fire({
                    text: 'Country successfully deleted',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                    })
                
                    navigate('/incom_book');
                }
              })
          } catch (err) {
              console.log(err)
          }
      })

    return (
        <>
            <Image src={flower1} alt="" className="flower1"/>
            <Image src={flower2} alt="" className="flower2"/>
            <h4 className='incom-title'>Incom Book</h4>
            <ModalUpdateBook modalUpdate={modalUpdate} setModalUpdate={setModalUpdate} value={value} bookId={bookId} refetchBook={refetchBook}/>
            <div className='container-list'>
                {books?.map((book, i) => {
                    return (
                        <Card className='list-book' key={i}>
                             <Dropdown className="d-inline mx-2 dropdown-trip">
                                <img src={titik3} alt="" className="titik3" />
                                <Dropdown.Toggle id="dropdown-autoclose-true" className="toggle-trip">
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-trip">
                                    <Dropdown.Item onClick={() => {setBookId(book.id); setModalUpdate(true); setValue(book)}}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={() => {setBookId(book.id); handleDeleteBook.mutate(book.id)}}>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Card.Img variant="top" src={book.thumbnail} className='list-image' />
                            <Card.Body className='list-desc'>
                                <Card.Title className='list-title2'>{book.title}</Card.Title>
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

export default IncomBook