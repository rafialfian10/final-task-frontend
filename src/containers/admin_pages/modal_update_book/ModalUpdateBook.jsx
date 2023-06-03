/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Button, Form, Modal, FloatingLabel, FormLabel, Image } from "react-bootstrap";

// api
import { API } from "../../../config/api";

// css
import './ModalUpdateBook.scss'
import Swal from "sweetalert2";

// image
import addlistbook from '../../../assets/img/addlistbook.png'
import attache from '../../../assets/img/attache.png'

const ModalUpdateBook = ({modalUpdate, setModalUpdate, value, bookId, refetchAllBook}) => {

    const navigate = useNavigate()

    const [preview, setPreview] = useState(null) 

    //state form
    const [form, setForm] = useState({
        title: '',
        publication_date: '',
        isbn: '',
        pages: '',
        author: '',
        price: '',
        quota: '',
        description: '',
        book: '',
        thumbnail: '',
    })

    console.log("Form", form)

    useEffect(() => {
        setForm((prevForm) => ({
            ...prevForm,
            title: value?.title || "",
            publication_date: value?.publication_date || "",
            isbn: value?.isbn || "",
            pages: value?.pages || "",
            author: value?.author || "",
            price: value?.price || "",
            quota: value?.quota || "",
            description: value?.description || "",
            book: value?.book || "",
            thumbnail: value?.thumbnail || "",
        }));

        if (value?.publication_date) {
            const date = new Date(value.publication_date);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const formattedDate = `${year}-${month}-${day}`;
            setForm((prevForm) => ({
              ...prevForm,
              publication_date: formattedDate,
            }));
        }

    }, [value]);

    // state error
    const [error, setError] = useState({
        title: '',
        publication_date: '',
        isbn: '',
        pages: '',
        author: '',
        price: '',
        quota: '',
        description: '',
        book: '',
        thumbnail: '',
    });

    // handle change
    const handleChange = (e) => {
        setForm({...form,
        [e.target.name]:
            e.target.type === 'file' ? e.target.files : e.target.value,
        })

        if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    };

    const [filePath, setFilePath] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFilePath(file.name);
      };

    // handle update book
    const handleUpdateBook = useMutation( async (e) => {
        try {
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            };

            const messageError = {
                title: '',
                publication_date: '',
                isbn: '',
                pages: '',
                author: '',
                price: '',
                quota: '',
                description: '',
                book: '',
                thumbnail: '',
            };

            // validasi title
            if (form.title === "") {
                messageError.title = "Title must be filled out";
            } else {
                messageError.title = ""
            }

            // validasi publication date
            if (form.publication_date === "") {
                messageError.publication_date = "Publication Date must be filled out";
            } else {
                messageError.publication_date = ""
            }

            // validasi isbn
            if (form.isbn === "") {
                messageError.isbn = "ISBN Date must be filled out";
            } else {
                messageError.isbn = ""
            }

            // validasi pages
            if (form.pages === "") {
                messageError.pages = "Pages must be filled out";
            } else if (form.pages < 0) {
                messageError.pages = "can't be less than 0"
            } else {
                messageError.pages = ""
            }

            // validasi author
            if (form.author === "") {
                messageError.author = "Author Date must be filled out";
            } else {
                messageError.author = ""
            }

            // price
            if (form.price === "") {
                messageError.price = "Price must be filled out";
            } else if (form.price < 0) {
                messageError.price = "can't be less than 0"
            } else {
                messageError.price = ""
            }

            // validasi quota
            if (form.quota === "") {
                messageError.quota = "Quota must be filled out";
            } else if (form.quota < 0) {
                messageError.quota = "can't be less than 0"
            } else {
                messageError.quota = ""
            }

            // validasi description
            if (form.description === "") {
                messageError.description = "Description must be filled out";
            } else {
                messageError.description = ""
            }

            // validasi author
            if (form.book === "") {
                messageError.book = "Book must be filled out";
            } else {
                messageError.book = ""
            }

            // validasi Image
            if (form.thumbnail === "") {
                messageError.thumbnail = "Image must be filled out";
            } else {
                messageError.thumbnail = ""
            }
 
            if (messageError.title === "" &&
                messageError.publication_date === "" &&
                messageError.isbn === "" &&
                messageError.pages === "" &&
                messageError.author === "" &&
                messageError.price === "" &&
                messageError.quota === "" &&
                messageError.description === "" &&
                messageError.book === "" &&
                messageError.thumbnail === ""
                ) {
                const formData = new FormData();
                formData.append('title', form.title);
                formData.append('publication_date', form.publication_date);
                formData.append('author', form.author);
                formData.append('pages', form.pages);
                formData.append('isbn', form.isbn);
                formData.append('price', form.price);
                formData.append('quota', form.quota);
                formData.append('description', form.description);
                formData.append('book', form.book[0]);
                formData.append('thumbnail', form.thumbnail[0]);
               
                const response = await API.patch(`/book/${bookId}`, formData, config);
                // console.log("Response :", response);
                if(response.data.code === 200) {
                    refetchAllBook()
                    setModalUpdate(false)
                    
                    Swal.fire({
                        text: 'Book successfully updated',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })

                    setForm({
                        title: '',
                        publication_date: '',
                        isbn: '',                   
                        pages: '',
                        author: '',
                        price: '',
                        description: '',
                        book: '',
                        thumbnail: '',
                        quota: '',
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
            <Modal show={modalUpdate} onHide={() => setModalUpdate(false)} className="modal-update-book" size="lg">
                <Modal.Body className="modal-body-update-book">
                    <h2 className="title-update-book">Update Book</h2>
                        <Form className='form-update-book' onSubmit={(e) => {e.preventDefault()
                        handleUpdateBook.mutate(e)}}>

                        <Form.Group className="form-group">
                            <Form.Control className="form-input" name="title" type="text" placeholder='Title' onChange={handleChange} value={form.title} />
                        </Form.Group>
                        {error.title && !form.title.trim() && <Form.Text className="text-danger">{error.title}</Form.Text>}

                        <Form.Group className="form-group">
                            <Form.Control className="form-input" name="publication_date" type="date" placeholder='Publication Date' onChange={handleChange} value={form.publication_date} />
                        </Form.Group>
                        {error.publication_date && !form.publication_date.trim() && <Form.Text className="text-danger">{error.publication_date}</Form.Text>}

                        <Form.Group className="form-group">
                            <Form.Control className="form-input" name="isbn" type="text" placeholder='isbn' onChange={handleChange} value={form.isbn} />
                        </Form.Group>
                        {error.isbn && !form.isbn.trim() && <Form.Text className="text-danger">{error.isbn}</Form.Text>}

                        <Form.Group className="form-group">
                            <Form.Control className="form-input" name="pages" type="number" placeholder='Pages' onChange={handleChange} value={form.pages} />
                        </Form.Group>
                        {error.pages && !form.pages.trim() && <Form.Text className="text-danger">{error.pages}</Form.Text>}

                        <Form.Group className="form-group">
                            <Form.Control className="form-input" name="author" type="text" placeholder='Author' onChange={handleChange} value={form.author} />
                        </Form.Group>
                        {error.author && !form.author.trim() && <Form.Text className="text-danger">{error.author}</Form.Text>}

                        <Form.Group className="form-group">
                            <Form.Control className="form-input" name="price" type="number" placeholder='Price' onChange={handleChange} value={form.price} />
                        </Form.Group>
                        {error.price && !form.price.trim() && <Form.Text className="text-danger">{error.price}</Form.Text>}

                        <Form.Group className="form-group">
                            <Form.Control className="form-input" name="quota" type="number" placeholder='Quota' onChange={handleChange} value={form.quota} />
                        </Form.Group>
                        {error.quota && !form.quota.trim() && <Form.Text className="text-danger">{error.quota}</Form.Text>}

                        <Form.Group className="form-group">
                            <FloatingLabel controlId="floatingTextarea2">
                                <Form.Control as="textarea" className="form-input" name="description" placeholder='Add This Book' style={{ height: '100px' }} onChange={handleChange}  value={form.description} />
                                {error.description && !form.description.trim() && <Form.Text className="text-danger">{error.description}</Form.Text>}
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="form-group">
                            <div className="img-upload-update">
                                <FormLabel htmlFor="book" className="form-input label-file-update">
                                    <Form.Text className='text-file-update'>Book</Form.Text>
                                    <Image className='img-file-update' src={attache} alt=""/>
                                </FormLabel>
                                <Form.Control className="form-input" name="book" type="file" id="book" onChange={handleChange} />
                            </div>
                            {error.book && (!form.book || (typeof form.book === 'string' && !form.book.trim())) && ( <Form.Text className="text-danger">{error.book}</Form.Text>)}
                        </Form.Group>

                        <Form.Group className="form-group">
                            <div className="img-upload-update">
                                <FormLabel htmlFor="thumbnail" className="form-input label-file-update">
                                    <Form.Text className='text-file-update'>Image</Form.Text>
                                    <Image className='img-file-update' src={attache} alt=""/>
                                </FormLabel>
                                <Form.Control className="form-input" name="thumbnail" type="file" id="thumbnail" onChange={handleChange}/>
                            </div>
                            {error.thumbnail && (!form.thumbnail || (typeof form.thumbnail === 'string' && !form.thumbnail.trim())) && ( <Form.Text className="text-danger">{error.thumbnail}</Form.Text>)}
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