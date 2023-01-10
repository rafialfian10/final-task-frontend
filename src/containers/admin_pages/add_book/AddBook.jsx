// components react bootstrap
import {Button, FloatingLabel, Form, Image} from 'react-bootstrap';

// import Swal from "sweetalert2";
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';

// API
// import { API } from '../../../config/api';

// css
import './AddBook.scss'

// image
import attache from '../../../assets/img/attache.png'
import addlistbook from '../../../assets/img/addlistbook.png'


const AddBook = () => {

    // const navigate = useNavigate()

    // const [preview, setPreview] = useState(null)

    // buat usestate untuk menampung data sementara
    // const [form, setForm] = useState({
    //     title: '',
    //     countryId: '',
    //     accomodation: '',
    //     transportation: '',
    //     eat: '',
    //     day: '',
    //     night: '',
    //     datetrip: '',
    //     price: '',
    //     quota: '',
    //     description: '',
    //     image: '',
    // })

    // state error
    // const [error, setError] = useState({
    //     title: '',
    //     countryId: '',
    //     accomodation: '',
    //     transportation: '',
    //     eat: '',
    //     day: '',
    //     night: '',
    //     datetrip: '',
    //     price: '',
    //     quota: '',
    //     description: '',
    //     image: '',
    //   });

    return (
        <>
            <div className="add-book-container">
                <h2 className="title-add-book">Add Book</h2>
                <Form className='form-add-book'>
                    <Form.Group className="form-group">
                    <Form.Control className="form-input" name="title" type="text" placeholder='Title'/>
                    {/* {error.title && <Form.Text className="text-danger">{error.title}</Form.Text>} */}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Control className="form-input" name="publicationDate" type="date" placeholder='Publication Date'/>
                    {/* {error.accomodation && <Form.Text className="text-danger">{error.accomodation}</Form.Text>} */}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Control className="form-input" name="pages" type="text" placeholder='Pages'/>
                    {/* {error.transportation && <Form.Text className="text-danger">{error.transportation}</Form.Text>} */}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Control className="form-input" name="isbn" type="text" placeholder='ISBN'/>
                    {/* {error.eat && <Form.Text className="text-danger">{error.eat}</Form.Text>} */}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Control className="form-input" name="price" type="text" placeholder='Price'/>
                    {/* {error.price && <Form.Text className="text-danger">{error.price}</Form.Text>} */}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <FloatingLabel controlId="floatingTextarea2">
                        <Form.Control as="textarea" className="form-input" name="description" placeholder='Add This Book' style={{ height: '100px' }}/>
                        {/* {error.description && <Form.Text className="text-danger">{error.description}</Form.Text>} */}
                    </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="form-group">
                    <div className="img-upload">
                        <label for="image" className="form-input">
                            <p>Attache Here</p>
                            <img src={attache} alt=""/>
                        </label>
                        <Form.Control className="form-input" name="image" type="file" id="image"/>
                    </div>
                    {/* {error.image && <Form.Text className="text-danger">{error.image}</Form.Text>} */}
                    </Form.Group>

                    <div className='btn-add-book-content'>
                        <Button type="submit" className='btn-add-book'>Add Book<Image src={addlistbook} className='img-add-book'/></Button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default AddBook