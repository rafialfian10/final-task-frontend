/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import moment from 'moment'
import { Button, Image, Form, FloatingLabel, Modal } from "react-bootstrap";

// css
import './ModalUpdateBook.scss'
import Swal from "sweetalert2";

// image
import dropdown from '../../../assets/img/img-dropdown.png'
import attache from '../../../assets/img/attache.png'
import addlistbook from '../../../assets/img/addlistbook.png'

// api
import { API } from "../../../config/api";

const ModalUpdateBook = ({modalUpdate, setModalUpdate, value}) => {

    const navigate = useNavigate()

    const [preview, setPreview] =useState()

   //state form
   const [form, setForm] = useState({
        title: '',
        publicationDate: '',
        pages: '',
        isbn: '',
        price: '',
        discount: '',
        description: '',
        image: '',
        document: '',
    })

    useEffect(() => {
        setForm({
            title: value?.title,
            publicationDate: value?.publicationDate,
            pages: value?.pages,
            isbn: value?.isbn,
            price: value?.price,
            description: value?.description,
            image: value?.image,
            document: value?.document,
        })
    }, [value])

    // state error
    const [error, setError] = useState({
        title: '',
        publicationDate: '',
        pages: '',
        isbn: '',
        price: '',
        discount: '',
        description: '',
        image: '',
        document: '',
    });

    // handle change
    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]:
            e.target.type === 'file' ? e.target.files : e.target.value,
        })

        if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    };

    // handle update book
    const handleUpdateBook = useMutation( async () => {
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
                discount: '',
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

            //validasi discount
            if (form.discount === "") {
                messageError.discount = "discount must be filled out";
            } else if (parseInt(form.discount) < 0) {
                messageError.discount = "can't be less than 0"
            } else {
                messageError.discount = ""
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
                messageError.discount === "" &&
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
                formData.append('discount', form.discount);
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

                navigate('/incom_book'); 
            } else {
                setError(messageError)
            }
        } catch (err) {
            console.log(err)
        }
    })

    return (
        <>
            <Modal show={modalUpdate} onHide={() => setModalUpdate(false)} className="modal-update-book" size="lg">
                <Modal.Body className="modal-body-update-book">
                    <h2 className="title-update-book">Update Book</h2>
                    <Form className='form-update-book' onSubmit={(e) => {e.preventDefault() 
                    handleUpdateBook.mutate(e)}}>
                    <Form.Group className="form-group">
                    <Form.Control className="form-input" name="title" type="text" placeholder='Title' value={form.title} onChange={(e) => handleChange(e, 'title')}/>
                    {error.title && <Form.Text className="text-danger">{error.title}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Control className="form-input" name="publicationDate" type="date" placeholder='Publication Date' value={form.publicationDate} onChange={(e) => handleChange(e, 'publication_date')}/>
                    {error.publicationDate && <Form.Text className="text-danger">{error.publicationDate}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Control className="form-input" name="pages" type="text" placeholder='Pages' value={form.pages} onChange={(e) => handleChange(e, 'pages')}/>
                    {error.pages && <Form.Text className="text-danger">{error.pages}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Control className="form-input" name="isbn" type="text" placeholder='ISBN' value={form.isbn} onChange={(e) => handleChange(e, 'isbn')}/>
                    {error.isbn && <Form.Text className="text-danger">{error.isbn}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Control className="form-input" name="price" type="text" placeholder='Price' value={form.price} onChange={(e) => handleChange(e, 'price')}/>
                    {error.price && <Form.Text className="text-danger">{error.price}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Control className="form-input" name="discount" type="number" placeholder='Discount' value={form.discount} onChange={(e) => handleChange(e, 'discount')}/>
                    </Form.Group>

                    <Form.Group className="form-group">
                    <FloatingLabel controlId="floatingTextarea2">
                        <Form.Control as="textarea" className="form-input" name="description" placeholder='Add This Book' style={{ height: '100px' }} value={form.description} onChange={(e) => handleChange(e, 'description')}/>
                        {error.description && <Form.Text className="text-danger">{error.description}</Form.Text>}
                    </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="form-group">
                    <div className="img-upload">
                        <label for="document" className="form-input">
                            <p>Book</p>
                            <img src={attache} alt=""/>
                        </label>
                        <Form.Control className="form-input" name="document" type="file" id="document" value={form.document} onChange={(e) => handleChange(e, 'document')}/>
                    </div>
                    {error.document && <Form.Text className="text-danger">{error.document}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <div className="img-upload">
                        <label for="image" className="form-input">
                            <p>Image</p>
                            <img src={attache} alt=""/>
                        </label>
                        <Form.Control className="form-input" name="image" type="file" id="image" value={form.image} onChange={(e) => handleChange(e, 'image')}/>
                    </div>
                    {error.image && <Form.Text className="text-danger">{error.image}</Form.Text>}
                    </Form.Group>

                    <div className='btn-update-book-content'>
                        <Button type="submit" className='btn-update-book'>Update Book<Image src={addlistbook} className='img-update-book'/></Button>
                    </div>
                </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalUpdateBook;