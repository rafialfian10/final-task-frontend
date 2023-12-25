/* eslint-disable react-hooks/exhaustive-deps */
// components react bootstrap
import { Table, Modal, Alert, Image } from "react-bootstrap";
import Swal from "sweetalert2";
import Moment from "react-moment";

// components
import { useMutation } from "react-query";
import { useState, useEffect } from "react";

// api
import { API } from "../../../config/api";

// css
import "./ModalApproved.scss";

// image
import logo from "../../../assets/img/logo.png";
import transaction from "../../../assets/img/transaction.png";

const ModalApproved = ({
  modalApproved,
  setModalApproved,
  order,
  refetchAllTransactionsAdmin,
}) => {
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

      const response = await API.patch(
        `/transaction-admin/${order?.id}`,
        payload
      );
      console.log(response.data);
      if (response.data.code === 200) {
        Swal.fire({
          title: "Transaction approved",
          icon: "success",
        });
        refetchAllTransactionsAdmin();
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

      const response = await API.patch(
        `/transaction-admin/${order?.id}`,
        payload
      );
      console.log(response.data);
      if (response.data.code === 200) {
        Swal.fire("Transaction has been rejected");
        setModalApproved(false);
        refetchAllTransactionsAdmin();
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
            <div className="table-modal-approved">
              <div className="content-approved">
                <Image src={logo} className="img-logo" alt="logo" />
                <p className="status-payment-approved">
                  <h3 className="status-approved">Status Transaction</h3>
                  {order?.status === "pending" && (
                    <Alert
                      variant="warning"
                      style={{ width: "200px", height: "40px" }}
                      className="d-inline-block p-1 px-3 fw-bold text-light bg-warning"
                    >
                      Waiting Payment
                    </Alert>
                  )}
                  {order?.status === "failed" && (
                    <Alert
                      variant="danger"
                      style={{ width: "200px", height: "40px" }}
                      className="d-inline-block p-1 px-3 fw-bold text-light bg-danger"
                    >
                      Payment Failed
                    </Alert>
                  )}
                  {order?.status === "reject" && (
                    <Alert
                      variant="danger"
                      style={{ width: "200px", height: "40px" }}
                      className="d-inline-block p-1 px-3 fw-bold text-light bg-danger"
                    >
                      Transaction Rejected
                    </Alert>
                  )}
                  {order?.status === "success" && (
                    <Alert
                      variant="warning"
                      style={{ width: "200px", height: "40px" }}
                      className="d-inline-block p-1 px-3 fw-bold text-light bg-success"
                    >
                      Waiting Approved
                    </Alert>
                  )}
                  {order?.status === "approve" && (
                    <Alert
                      variant="success"
                      style={{ width: "200px", height: "40px" }}
                      className="d-inline-block p-1 px-3 fw-bold text-light bg-success"
                    >
                      Transaction Approved
                    </Alert>
                  )}
                </p>
              </div>
              <div className="content-img-payment-approved">
                <Image
                  className="img-payment-approved"
                  src={transaction}
                  alt="transaction"
                />
                <p className="text-payment-approved">Upload Payment Proof</p>
              </div>

              <div className="content2-approved">
                <div className="info-payment-approved">
                  <Table striped bordered hover className="tables-order-book">
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
                </div>
              </div>
              <Table striped bordered hover className="tables-order-book2">
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
                    <td className="fw-bold">: {orderQty} pcs</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="fw-bold">Total</td>
                    <td className="fw-bold text-danger">
                      : IDR. {order?.total.toLocaleString()}{" "}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="btn-modal-approved">
              <button
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
              </button>
              <button
                type="submit"
                className="approve"
                onClick={handleApproveOrder.mutate}
              >
                Approve
              </button>
            </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalApproved;
