// components react bootstrap
import {Button, FloatingLabel, Form, Image} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from 'react-query';

// API
import { API } from '../../../config/api';


// css
import './AddBook.scss'
import Swal from "sweetalert2";

// image
import attache from '../../../assets/img/attache.png'
import addlistbook from '../../../assets/img/addlistbook.png'


const AddBook = () => {

    const navigate = useNavigate()

    // eslint-disable-next-line no-unused-vars
    const [preview, setPreview] = useState(null)

    // buat usestate untuk menampung data sementara
    const [form, setForm] = useState({
        title: '',
        publicationDate: '',
        pages: '',
        isbn: '',
        price: '',
        description: '',
        image: '',
        document: '',
    })

    // state error
    const [error, setError] = useState({
        title: '',
        publicationDate: '',
        pages: '',
        isbn: '',
        price: '',
        description: '',
        document: '',
        image: '',
      });

    // function handlechange data di form
    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]:
            e.target.type === 'file' ? e.target.files : e.target.value, 
        })

    // buat url image
    if (e.target.type === 'file') {
        let url = URL.createObjectURL(e.target.files[0]);
        setPreview(url);
      }
    };

    // handle submit
    const handleSubmit = useMutation( async () => {
        try {
            // konfigurasi file
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            };

            const messageError = {
                title: '',
                publicationDate: '',
                pages: '',
                isbn: '',
                price: '',
                description: '',
                document: '',
                image: '',
            };

            // validasi form title
            if (form.title === "") {
                messageError.title = "Title must be filled out";
            } else {
                messageError.title = ""
            }

            // validasi form publication date
            if (form.publicationDate === "") {
                messageError.publicationDate = "Publication date must be filled out";
            } else {
                messageError.publicationDate = ""
            }

            // validasi form pages
            if (form.pages === "") {
                messageError.pages = "Pages must be filled out";
            } else {
                messageError.pages = ""
            }

            // validasi form isbn
            if (form.isbn === "") {
                messageError.isbn = "ISBN must be filled out";
            } else {
                messageError.isbn = ""
            }

            // validasi form price
            if (form.price === "") {
                messageError.price = "Price must be filled out";
            } else {
                messageError.price = ""
            }

            // validasi form description
            if (form.description === "") {
                messageError.description = "Description must be filled out";
            } else {
                messageError.description = ""
            }

            // validasi form image thumbnail
            if (form.document === "") {
                messageError.document = "Book attachment must be filled out";
            } else {
                messageError.document = ""
            }

            // validasi form image thumbnail
            if (form.image === "") {
                messageError.image = "Image thumbnail must be filled out";
            } else {
                messageError.image = ""
            }

            if (
                messageError.title === "" &&
                messageError.publicationDate === "" &&
                messageError.pages === "" &&
                messageError.isbn === "" &&
                messageError.price === "" &&
                messageError.description === "" &&
                messageError.document === "" &&
                messageError.image === ""
              ) {
                const formData = new FormData();
                formData.append('title', form.title);
                formData.append('publication_date', form.publicationDate);
                formData.append('pages', form.pages);
                formData.append('isbn', form.isbn);
                formData.append('price', form.price);
                formData.append('description', form.description);
                formData.append('document', form.document[0]);
                formData.append('image', form.image[0]);

                // Insert trip data
                const response = await API.post('/book', formData, config);
                console.log("Response :", response);

                Swal.fire({
                    text: 'Book successfully added',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })

                navigate('/list_transaction'); 
              } else {
                setError(messageError)
              }
        } catch (err) {
            console.log(err)
        }
    })
    return (
        <>
            <div className="add-book-container">
                <h2 className="title-add-book">Add Book</h2>
                <Form className='form-add-book' onSubmit={(e) => {e.preventDefault() 
                    handleSubmit.mutate(e)}}>
                    <Form.Group className="form-group">
                    <Form.Control className="form-input" name="title" type="text" placeholder='Title' onChange={handleChange}/>
                    {error.title && <Form.Text className="text-danger">{error.title}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Control className="form-input" name="publicationDate" type="date" placeholder='Publication Date' onChange={handleChange}/>
                    {error.publicationDate && <Form.Text className="text-danger">{error.publicationDate}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Control className="form-input" name="pages" type="text" placeholder='Pages' onChange={handleChange}/>
                    {error.pages && <Form.Text className="text-danger">{error.pages}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Control className="form-input" name="isbn" type="text" placeholder='ISBN' onChange={handleChange}/>
                    {error.isbn && <Form.Text className="text-danger">{error.isbn}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Control className="form-input" name="price" type="text" placeholder='Price' onChange={handleChange}/>
                    {error.price && <Form.Text className="text-danger">{error.price}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <FloatingLabel controlId="floatingTextarea2">
                        <Form.Control as="textarea" className="form-input" name="description" placeholder='Add This Book' style={{ height: '100px' }} onChange={handleChange}/>
                        {error.description && <Form.Text className="text-danger">{error.description}</Form.Text>}
                    </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="form-group">
                    <div className="img-upload">
                        <label for="document" className="form-input">
                            <p>Book</p>
                            <img src={attache} alt=""/>
                        </label>
                        <Form.Control className="form-input" name="document" type="file" id="document" onChange={handleChange}/>
                    </div>
                    {error.document && <Form.Text className="text-danger">{error.document}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <div className="img-upload">
                        <label for="image" className="form-input">
                            <p>Image</p>
                            <img src={attache} alt=""/>
                        </label>
                        <Form.Control className="form-input" name="image" type="file" id="image" onChange={handleChange}/>
                    </div>
                    {error.image && <Form.Text className="text-danger">{error.image}</Form.Text>}
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