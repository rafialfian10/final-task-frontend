/* eslint-disable react-hooks/exhaustive-deps */
// components react bootstrap
import { Table, Modal, Alert, Image, Row, Col, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import Moment from "react-moment";

// components redux
import { useDispatch } from "react-redux";
import { FunctionUpdateTransactionAdmin } from "../../../redux/features/TransactionSlice";

// components
import { useMutation } from "react-query";
import { useState, useEffect } from "react";

// css
import "./ModalApproved.scss";

// images
import logo from "../../../assets/img/logo.png";
import transaction from "../../../assets/img/transaction.png";
// -----------------------------------------------------------

const ModalApproved = ({
  modalApproved,
  setModalApproved,
  order,
  loadTransactionsAdmin,
}) => {
  // dispatch
  const dispatch = useDispatch();

  let no = 1;

  // state total order
  const [orderQty, setOrderQty] = useState();

  useEffect(() => {
    let qty = order?.book.map((item) => {
      return item.order_qty;
    });

    let totalOrder = qty?.reduce((sum, order) => {
      return sum + order;
    }, 0);

    setOrderQty(totalOrder);
  });

  // handle approve order
  const handleApproveOrder = useMutation(async () => {
    try {
      // data status
      let payload = {
        status: "approve",
      };

      const response = await dispatch(
        FunctionUpdateTransactionAdmin(payload, order?.id)
      );
      if (response && response.data.code === 200) {
        Swal.fire({
          title: "Transaction approved",
          icon: "success",
        });
        loadTransactionsAdmin();
        setModalApproved(false);
      }
    } catch (e) {
      console.log(e);
    }
  });

  // handle reject order
  const handleCancleOrder = useMutation(async () => {
    try {
      let payload = {
        status: "reject",
      };

      const response = await dispatch(
        FunctionUpdateTransactionAdmin(payload, order?.id)
      );
      if (response && response.data.code === 200) {
        Swal.fire({
          title: "Transaction has been rejected",
          icon: "success",
        });
        setModalApproved(false);
        loadTransactionsAdmin();
      }
    } catch (e) {
      console.log(e);
    }
  });

  const RejectTransactionAlert = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success mx-2",
      cancelButton: "btn btn-danger mx-2",
    },
    buttonsStyling: false,
  });

  return (
    <>
      <Modal
        show={modalApproved}
        onHide={() => setModalApproved(false)}
        dialogClassName="modal-90w"
        className="modal-approved-container"
        aria-labelledby="example-custom-modal-styling-title"
        size="xl"
      >
        <Modal.Body className="body-approved-container">
          <Row className="content-approved">
            <Col xs={4} md={4} lg={2} xl={2} className="">
              <Image src={logo} className="img-logo" alt="logo" width={130} />
            </Col>
            <Col
              xs={8}
              md={8}
              lg={10}
              xl={10}
              className="status-payment-approved"
            >
              <h4 className="status-approved">Status Transaction</h4>
              {order?.status === "pending" && (
                <Alert variant="warning" className="alert-content bg-warning">
                  Waiting Payment
                </Alert>
              )}
              {order?.status === "failed" && (
                <Alert variant="danger" className="alert-content bg-danger">
                  Payment Failed
                </Alert>
              )}
              {order?.status === "reject" && (
                <Alert variant="danger" className="alert-content bg-danger">
                  Transaction Rejected
                </Alert>
              )}
              {order?.status === "success" && (
                <Alert variant="warning" className="alert-content bg-success">
                  Waiting Approved
                </Alert>
              )}
              {order?.status === "approve" && (
                <Alert variant="success" className="alert-content bg-success">
                  Transaction Approved
                </Alert>
              )}
            </Col>
          </Row>
          <Row className="content-img-payment-approved">
            <Col xs={12} md={6} lg={3} xl={3} className="p-0">
              <Image
                className="img-payment-approved"
                src={transaction}
                alt="transaction"
              />
            </Col>
            <p className="text-payment-approved">Upload Payment Proof</p>
          </Row>
          <Row className="table-container-approved">
            <Col
              xs={12}
              md={12}
              lg={12}
              xl={12}
              className="info-payment-approved"
            >
              <Table striped bordered hover className="table-order-book">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Pages</th>
                    <th>Publication Date</th>
                    <th>Price</th>
                    <th>Order Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order?.book.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{i++ + 1}</td>
                        <td className="text-start">{item?.title}</td>
                        <td>{item?.author}</td>
                        <td>{item?.pages}</td>
                        <td>{item?.publication_date}</td>
                        <td>IDR. {item?.price.toLocaleString()}</td>
                        <td>{item?.order_qty} pcs</td>
                        <td>
                          IDR.{" "}
                          {(item?.order_qty * item?.price).toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
            <Col
              xs={12}
              md={12}
              lg={12}
              xl={12}
              className="info-payment-approved"
            >
              <Table striped bordered hover className="table-order-book">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Full Name</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Order Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{no++}</td>
                    <td className="text-start">{order?.user.name}</td>
                    <td>{order?.user.gender}</td>
                    <td>{order?.user.phone}</td>
                    <td>
                      <Moment format="DD MMM YYYY, h:mm:ss A">
                        {order?.order_date}
                      </Moment>
                    </td>
                    <td className="fw-bold">Total Quantity</td>
                    <td className="fw-bold text-start">: {orderQty} pcs</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="fw-bold">Total</td>
                    <td className="fw-bold text-danger text-start">
                      : IDR. {order?.total.toLocaleString()}{" "}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row className="btn-modal-container">
            <Col xs={12} md={12} lg={12} xl={12} className="btn-modal-content">
              <Button
                type="submit"
                className="cancel"
                onClick={() => {
                  RejectTransactionAlert.fire({
                    title: "Are you sure?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, reject this transaction!",
                    cancelButtonText: "No, cancel!",
                    reverseButtons: true,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      handleCancleOrder.mutate();
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                      RejectTransactionAlert.fire(
                        "Cancelled",
                        "Transaction still waiting for your approval",
                        "error"
                      );
                    }
                  });
                }}
              >
                Reject
              </Button>
              <Button
                type="submit"
                className="approve"
                onClick={handleApproveOrder.mutate}
              >
                Approve
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalApproved;
