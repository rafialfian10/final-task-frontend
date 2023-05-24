// components react bootstrap
import {Button, Form, Image, FormLabel} from 'react-bootstrap';
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
import flower1 from '../../../assets/img/flower1.png'
import flower2 from '../../../assets/img/flower2.png'


const AddBook = () => {

    const navigate = useNavigate()

    // eslint-disable-next-line no-unused-vars
    const [preview, setPreview] = useState(null)

    // buat usestate untuk menampung data sementara
    const [form, setForm] = useState({
        title: '',
        publicationDate: '',
        author: '',
        pages: '',
        isbn: '',
        price: '',
        quota: '',
        description: '',
        book: '',
        thumbnail: '',
    })

    // state error
    const [error, setError] = useState({
        title: '',
        publicationDate: '',
        author: '',
        pages: '',
        isbn: '',
        price: '',
        quota: '',
        description: '',
        book: '',
        thumbnail: '',
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
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            };

            const messageError = {
                title: '',
                publicationDate: '',
                author: '',
                pages: '',
                isbn: '',
                price: '',
                quota: '',
                description: '',
                book: '',
                thumbnail: '',
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

            // validasi form author
            if (form.author === "") {
                messageError.author = "Author date must be filled out";
            } else {
                messageError.author = ""
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

             // validasi quota
             if (form.quota === "") {
                messageError.quota = "Quota must be filled out";
            } else if (parseInt(form.quota) < 0) {
                messageError.quota = "can't be less than 0"
            } else {
                messageError.quota = ""
            }

            // validasi form description
            if (form.description === "") {
                messageError.description = "Description must be filled out";
            } else {
                messageError.description = ""
            }

            // validasi form book thumbnail
            if (form.book === "") {
                messageError.book = "Book attachment must be filled out";
            } else {
                messageError.book = ""
            }

            // validasi form image thumbnail
            if (form.thumbnail === "") {
                messageError.thumbnail = "Image thumbnail must be filled out";
            } else {
                messageError.thumbnail = ""
            }

            if (
                messageError.title === "" &&
                messageError.publicationDate === "" &&
                messageError.author === "" &&
                messageError.pages === "" &&
                messageError.isbn === "" &&
                messageError.price === "" &&
                messageError.quota === "" &&
                messageError.description === "" &&
                messageError.book === "" &&
                messageError.thumbnail === ""
              ) {
                const formData = new FormData();
                formData.append('title', form.title);
                formData.append('publicationdate', form.publicationDate);
                formData.append('author', form.author);
                formData.append('pages', form.pages);
                formData.append('isbn', form.isbn);
                formData.append('price', form.price);
                formData.append('quota', form.quota);
                formData.append('description', form.description);
                formData.append('book', form.book[0]);
                formData.append('thumbnail', form.thumbnail[0]);

                // Insert trip data
                const response = await API.post('/book', formData, config);
                // console.log("Response :", response);

                if(response.data.code === 200) {
                    Swal.fire({
                        text: 'Book successfully added',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
    
                    navigate('/incom_book'); 
                }

              } else {
                setError(messageError)
              }
        } catch (err) {
            console.log(err)
        }
    })
    return (
        <>
            <Image src={flower1} alt="" className="flower1"/>
            <Image src={flower2} alt="" className="flower2"/>
            <div className="add-book-container">
                <h2 className="title-add-book">Add Book</h2>
                <Form className='form-add-book' onSubmit={(e) => {e.preventDefault() 
                    handleSubmit.mutate(e)}}>
                    <Form.Group className="form-group">
                        <Form.Control className="form-input" name="title" type="text" placeholder='Title' onChange={handleChange}/>
                        {error.title && <Form.Text className="text-danger">{error.title}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group">
                        <Form.Control className="form-input text-secondary" name="publicationDate" type="date" placeholder='Publication Date' onChange={handleChange}/>
                        {error.publicationDate && <Form.Text className="text-danger">{error.publicationDate}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group">
                        <Form.Control className="form-input" name="author" type="text" placeholder='Author' onChange={handleChange}/>
                        {error.author && <Form.Text className="text-danger">{error.author}</Form.Text>}
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
                        <Form.Control className="form-input" name="quota" type="number" placeholder="Quota" onChange={handleChange}/>
                        {error.quota && <Form.Text className="text-danger">{error.quota}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group">
                        <Form.Control as="textarea" className="form-input text-dark" name="description" placeholder="Description" style={{ height: "100px" }} onChange={handleChange}/>
                        {error.description && <Form.Text className="text-danger">{error.description}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group">
                        <div className="img-upload">
                            <FormLabel htmlFor="book" className="form-input">
                                <Form.Text className='text-file'>Book</Form.Text>
                                <Image className='img-file' src={attache} alt=""/>
                            </FormLabel>
                            <Form.Control className="form-input" name="book" type="file" id="book" onChange={handleChange}/>
                        </div>
                        {error.book && <Form.Text className="text-danger">{error.book}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group">
                        <div className="img-upload">
                            <FormLabel htmlFor="thumbnail" className="form-input">
                                <Form.Text className='text-file'>Image</Form.Text>
                                <Image className='img-file' src={attache} alt=""/>
                            </FormLabel>
                            <Form.Control className="form-input" name="thumbnail" type="file" id="thumbnail" onChange={handleChange}/>
                        </div>
                        {error.thumbnail && <Form.Text className="text-danger">{error.thumbnail}</Form.Text>}
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