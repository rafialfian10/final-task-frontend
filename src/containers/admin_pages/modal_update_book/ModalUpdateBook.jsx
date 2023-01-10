/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import moment from 'moment'
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from 'react-bootstrap/FloatingLabel';

// css
import './ModalUpdateBook.scss'

// image
import dropdown from '../../../assets/img/img-dropdown.png'
import attache from '../../../assets/img/attache.png'

// api
import { API } from "../../../config/api";

const ModalUpdateBook = ({modalUpdate, setModalUpdate}) => {

    const navigate = useNavigate()

    const [preview, setPreview] =useState()

    return (
        <>
            <Modal show={modalUpdate} onHide={() => setModalUpdate(false)} className="modal-update-trip" size="lg">
                <Modal.Body className="modal-body-update-trip">
                    <h2 className="title-update-trip">Update Trip</h2>
                    <Form>
                    <Form.Group className="form-group">
                    <Form.Label>Title Book</Form.Label>
                    <Form.Control className="form-input" name="title" type="text"/>
                    {/* {error.title && <Form.Text className="text-danger">{error.title}</Form.Text>} */}
                    </Form.Group>

                    <Form.Group className="form-group form-dropdown">
                    <Form.Label>Country</Form.Label>
                    <img src={dropdown} alt="" className="dropdown"/>
                    <Form.Select aria-label="Default select example" name="countryId" className="form-input">
                        <option value=""></option>
                        {/* {countries?.map((country, i) => {
                            return ( */}
                                <option>test</option>
                            {/* )
                        })} */}
                    </Form.Select>
                    {/* {error.countryId && <Form.Text className="text-danger">{error.countryId}</Form.Text>} */}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Label>Accomodation</Form.Label>
                    <Form.Control className="form-input" name="accomodation" type="text" />
                    {/* {error.accomodation && <Form.Text className="text-danger">{error.accomodation}</Form.Text>} */}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Label>Transportation</Form.Label>
                    <Form.Control className="form-input" name="transportation" type="text" />
                    {/* {error.transportation && <Form.Text className="text-danger">{error.transportation}</Form.Text>} */}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Label>Eat</Form.Label>
                    {/* <Form.Control className="form-input" name="eat" type="text" value={form.eat} onChange={{}}/> */}
                    {/* {error.eat && <Form.Text className="text-danger">{error.eat}</Form.Text>} */}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Label>Duration</Form.Label>
                    <div className="duration">
                        <div className="day-content">
                            <div className='sub-day-content'>
                                <Form.Control className="form-input day" name="day" type="number"/>
                                <Form.Label className="label-day">Day</Form.Label>
                            </div>
                            {/* {error.day && <Form.Text className="text-danger">{error.day}</Form.Text>} */}
                        </div>

                        <div className="night-content">
                            <div className='sub-night-content'>
                                <Form.Control className="form-input night" name="night" type="number" />
                                <Form.Label className="label-night">Night</Form.Label>
                            </div>
                            {/* {error.night && <Form.Text className="text-danger">{error.night}</Form.Text>} */}
                        </div>
                    </div>
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Label>Date Trip</Form.Label>
                    <Form.Control className="form-input" name="datetrip" type="date" />
                    {/* {error.datetrip && <Form.Text className="text-danger">{error.datetrip}</Form.Text>} */}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Label>Price</Form.Label>
                    <Form.Control className="form-input" name="price" type="text" />
                    {/* {error.price && <Form.Text className="text-danger">{error.price}</Form.Text>} */}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Label>Quota</Form.Label>
                    <Form.Control className="form-input" name="quota" type="number" />
                    {/* {error.quota && <Form.Text className="text-danger">{error.quota}</Form.Text>} */}
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Label>Description</Form.Label>
                    <FloatingLabel controlId="floatingTextarea2">
                        <Form.Control as="textarea" className="form-input" name="description" style={{ height: '100px' }} />
                        {/* {error.description && <Form.Text className="text-danger">{error.description}</Form.Text>} */}
                    </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="form-group">
                    <Form.Label>Image</Form.Label>
                    <div className="img-upload">
                        <label for="image" className="form-input">
                            <p>Attache Here</p>
                            <img src={attache} alt=""/>
                        </label>
                        <Form.Control className="form-input" id="image" name="image" type="file"/>
                    </div>
                    {/* {error.image && <Form.Text className="text-danger">{error.image}</Form.Text>} */}
                    </Form.Group>

                    <Button variant="primary" type="submit" className='button-add-trip'>Update Book</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalUpdateBook;