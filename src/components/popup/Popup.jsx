// components
import Modal from "react-bootstrap/Modal";

// css
import "./Popup.scss";

const Popup = ({ popup, setPopup }) => {
  return (
    <>
      <Modal
        show={popup}
        onHide={() => setPopup(false)}
        size="xs"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-popup"
      >
        <Modal.Body className="body-popup">
          <p>The product is successfully added to the cart</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Popup;
