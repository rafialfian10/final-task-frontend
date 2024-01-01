/* eslint-disable no-unused-vars */
// components react
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

// components react bootstrap
import { Button, Image, Form, Modal } from "react-bootstrap";

// api
import { API } from "../../../config/api";

// css
import "./ModalPromo.scss";
import Swal from "sweetalert2";

// images
import addlistbook from "../../../assets/img/addlistbook.png";
// ------------------------------------------------------------------------

const ModalPromo = ({ modalPromo, setModalPromo, value, bookId }) => {
  const navigate = useNavigate();

  //state form
  const [form, setForm] = useState({
    discount: "",
  });

  useEffect(() => {
    setForm({
      discount: value?.discount || "",
    });
  }, [value]);

  // state error
  const [error, setError] = useState({
    discount: "",
  });

  // handle change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  // handle set discount book
  const handleUpdateBookPromo = useMutation(async () => {
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      const messageError = {
        discount: "",
      };

      //validasi discount
      if (form.discount === "") {
        messageError.discount = "discount must be filled out";
      } else if (parseInt(form.discount) < 0) {
        messageError.discount = "can't be less than 0";
      } else {
        messageError.discount = "";
      }

      if (messageError.discount === "") {
        const formData = new FormData();
        formData.append("discount", form.discount);

        const response = await API.patch(
          `/book-promo/${bookId}`,
          formData,
          config
        );
        // console.log("Response :", response);
        if (response.data.code === 200) {
          Swal.fire({
            text: "Discount Book successfully added",
            icon: "success",
            confirmButtonText: "Ok",
          });
          setModalPromo(false);
        }

        navigate("/incom_book");
      } else {
        setError(messageError);
      }
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <>
      <Modal
        show={modalPromo}
        onHide={() => setModalPromo(false)}
        className="modal-update-promo"
        size="lg"
      >
        <Modal.Body className="modal-body-update-promo">
          <h4 className="title-update-book">Set Discount Book</h4>
          <Form
            className="form-update-book"
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateBookPromo.mutate(e);
            }}
          >
            <Form.Group className="form-group">
              <Form.Control
                className="form-input"
                name="discount"
                type="number"
                placeholder="Discount"
                value={form?.discount}
                onChange={(e) => handleChange(e, "discount")}
              />
            </Form.Group>
            {error.discount && (
              <Form.Text className="text-danger">{error.discount}</Form.Text>
            )}

            <div className="btn-update-promo-content">
              <Button type="submit" className="btn-update-promo">
                Set Promo
                <Image src={addlistbook} className="img-update-promo" />
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalPromo;
