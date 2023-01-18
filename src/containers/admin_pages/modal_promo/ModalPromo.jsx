/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Button, Image, Form, Modal } from "react-bootstrap";

// css
import './ModalPromo.scss'
import Swal from "sweetalert2";

// image
import attache from '../../../assets/img/attache.png'
import addlistbook from '../../../assets/img/addlistbook.png'

// api
import { API } from "../../../config/api";

const ModalPromo = ({modalPromo, setModalPromo, value, bookId, refetchBook}) => {

    const navigate = useNavigate()

   //state form
   const [form, setForm] = useState({
        discount: '',
    })

    useEffect(() => {
        setForm({
            discount: value?.discount,
        })
    }, [value])

    // state error
    const [error, setError] = useState({
        discount: '',
    });

    // handle change
    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]:
            e.target.type === 'file' ? e.target.files : e.target.value,
        })
    };

    // handle set discount book
    const handleUpdateBookPromo = useMutation( async () => {
        try {
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            };

            const messageError = {
                discount: '',
            };

            //validasi discount
            if (form.discount === "") {
                messageError.discount = "discount must be filled out";
            } else if (parseInt(form.discount) < 0) {
                messageError.discount = "can't be less than 0"
            } else {
                messageError.discount = ""
            }

            if (messageError.discount === "" ) {

                const formData = new FormData();
                formData.append('discount', form.discount);
               
                const response = await API.patch(`/book-promo/${bookId}`, formData, config);
                console.log("Response :", response);
                if(response.status === 200) {
                    refetchBook()
                  }

                Swal.fire({
                    text: 'Discount Book successfully added',
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
            <Modal show={modalPromo} onHide={() => setModalPromo(false)} className="modal-update-book" size="lg">
                <Modal.Body className="modal-body-update-book">
                    <h2 className="title-update-book">Set Discount Book</h2>
                        <Form className='form-update-book' onSubmit={(e) => {e.preventDefault() 
                        handleUpdateBookPromo.mutate(e)}}>

                        <Form.Group className="form-group">
                        <Form.Control className="form-input" name="discount" type="number" placeholder='Discount' value={form.discount} onChange={(e) => handleChange(e, 'discount')}/>
                        </Form.Group>
                        {error.discount && <Form.Text className="text-danger">{error.discount}</Form.Text>}

                        <div className='btn-update-book-content'>
                            <Button type="submit" className='btn-update-book'>Set Promo<Image src={addlistbook} className='img-update-book'/></Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalPromo;