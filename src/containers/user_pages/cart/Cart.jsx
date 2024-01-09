/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// components react
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";

// components redux
import { connect, useDispatch } from "react-redux";
import {
  FunctionCreateTransaction,
  FunctionGetTransactionsUser,
} from "../../../redux/features/TransactionSlice";

// components react bootstrap
import { Form, Card, Button, Image, Row, Col, Spinner } from "react-bootstrap";

// api
import { API } from "../../../config/api";

// css
import "./Cart.scss";
import Swal from "sweetalert2";

// images
import trash from "../../../assets/img/delete.png";
import flower1 from "../../../assets/img/flower1.png";
import flower2 from "../../../assets/img/flower2.png";
import plus from "../../../assets/img/plus.png";
import minus from "../../../assets/img/minus.png";
import {
  FunctionDeleteCart,
  FunctionGetCarts,
  FunctionUpdateCart,
} from "../../../redux/features/CartSlice";
// import proof from "../../../assets/img/transaction.png"
// ----------------------------------------------------------------

const Cart = (props) => {
  const {
    carts,
    deleteCart,
    loadCarts,
    loadTransactionsUser,
    transactionsUser,
  } = props;
  const {
    transactionData,
    transactionsData,
    loadingTransaction,
    errorMessageTransaction,
  } = transactionsUser;
  const { cartData, cartsData, loadingCart, errorMessageCart } = carts;

  // dispatch
  const dispatch = useDispatch();

  const navigate = useNavigate();

  let { id } = useParams();
  id = parseInt(id);

  // state total, update cart, transaction user
  const [total, setTotal] = useState(0);
  const [updateCarts, setUpdateCarts] = useState([]);
  const [transaction, setTransaction] = useState([]);

  // add counter
  const handleAddQty = useMutation(async (id) => {
    try {
      const response = await dispatch(FunctionUpdateCart("add", id));
      if (response && response.data.code === 200) {
        loadCarts();
      }
    } catch (error) {
      console.log(error);
    }
  });

  // less counter
  const handleLessQty = useMutation(async (id) => {
    try {
      const response = await dispatch(FunctionUpdateCart("less", id));
      if (response && response.data.code === 200) {
        loadCarts();
      }
    } catch (error) {
      console.log(error);
    }
  });

  // function delete cart
  const handleDeleteCart = async (id) => {
    const response = await deleteCart(id);
    if (response && response.data.code === 200) {
      Swal.fire({
        text: "Cart successfully deleted",
        icon: "success",
        confirmButtonText: "Ok",
      });
      loadCarts();

      // Update carts after deleting cart
      const filterCarts = updateCarts.filter((cart) => cart.id !== id);
      setUpdateCarts(filterCarts);
    }
  };

  // function handle pay
  const handlePay = useMutation(async () => {
    try {
      let books = [];

      cartsData.forEach((item) => {
        books.push({
          id: item?.id,
          book_id: item?.book.id,
          orderQty: item?.order_qty,
        });
      });

      const formData = {
        total: total,
        books: books,
      };

      // filter data barang yang sudah pernah transaksi
      let duplicateData = updateCarts.filter((cart) =>
        transaction.includes(cart)
      );
      if (duplicateData.length > 0) {
        Swal.fire({
          text: "you already have this book",
          icon: "warning",
          confirmButtonText: "Ok",
        });
      } else {
        const response = await dispatch(FunctionCreateTransaction(formData));
        if (response && response.data.code === 200) {
          window.snap.pay(response.data.data.midtrans_id, {
            // success
            onSuccess: function (result) {
              Swal.fire({
                text: "Transaction success",
                icon: "success",
                confirmButtonText: "Ok",
              });
              navigate(`/profile/${id}`);
              window.location.reload();
              loadCarts();
            },
            // pending
            onPending: function (result) {
              navigate(`/cart/${id}`);
              window.location.reload();
              loadCarts();
            },
            // error
            onError: function (result) {
              Swal.fire({
                title: "Are you sure to cancel transaction?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes!",
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    icon: "success",
                    text: "cancel transaction successfully",
                  });
                }
              });
              loadCarts();
            },
            // close
            onClose: function () {
              Swal.fire({
                icon: "warning",
                text: "please make payment first",
              });
              navigate(`/profile/${id}`);
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js"; // panngil snap middtrans
    const myMidtransClientKey = process.env.REACT_APP_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  useEffect(() => {
    // total order
    let total = cartsData?.reduce((sum, order) => {
      // reduce : par 1 accumulator, par2 current value
      return sum + order.order_qty * order.book.price;
    }, 0);
    setTotal(total);
  }, [cartsData]);

  useEffect(() => {
    if (cartsData) {
      const filterCarts = cartsData.map((cartData) => cartData?.book?.title);
      setUpdateCarts(filterCarts);
    }

    transactionsData
      ?.filter(
        (transactionData) =>
          transactionData?.status === "success" ||
          transactionData?.status === "approve"
      )
      .forEach((transactionData) => {
        if (transactionData?.book && transactionData.book.length > 0) {
          setTransaction((prevState) => [
            ...prevState,
            transactionData.book[0].title,
          ]);
        }
      });
  }, [cartsData, transactionsData]);

  useEffect(() => {
    loadTransactionsUser();
    loadCarts();
  }, []);

  return (
    <>
      <Image src={flower1} alt="flower1" className="flower1" />
      <Image src={flower2} alt="flower2" className="flower2" />
      <h4 className="cart-title">My Cart</h4>
      {!cartsData ? (
        <h1 className="order-empty">Order is Empty</h1>
      ) : (
        <Row className="payment-container">
          <Col xs={12} md={12} lg={8} xl={8} className="content-satu">
            <h3 className="review">Review your order</h3>
            {cartsData?.map((order, i) => {
              return (
                <Card className="container-cart" key={i}>
                  <Row>
                    <Col xs={12} md={5} lg={5} xl={5}>
                      <Card.Img
                        src={order.book.thumbnail}
                        className="img-card"
                      />
                    </Col>
                    <Col xs={12} md={7} lg={7} xl={7}>
                      <Card.Body className="review-book-desc">
                        <Card.Title className="review-book-title">
                          {order.book.title}
                          <Button
                            className="btn-trash"
                            onClick={() => {
                              handleDeleteCart(order?.id);
                            }}
                          >
                            <Image src={trash} className="img-trash" />
                          </Button>
                        </Card.Title>
                        <Form.Text className="review-artist">
                          By. {order.book.author}
                        </Form.Text>
                        <Form.Text className="review-price">
                          IDR. {order.book.price.toLocaleString()}
                        </Form.Text>
                        <div className="content-cart">
                          <Button
                            onClick={() => {
                              order.order_qty > 1 &&
                                handleLessQty.mutate(order.id);
                            }}
                            className="minus"
                          >
                            <Image src={minus} alt="minus" />
                          </Button>
                          <h5 className="value">{order.order_qty}</h5>
                          <Button
                            onClick={() => {
                              order.order_qty < order.book.quota
                                ? handleAddQty.mutate(order.id)
                                : Swal.fire({
                                    icon: "error",
                                    title: "Out of stock",
                                  });
                            }}
                            className="plus"
                          >
                            {" "}
                            <Image src={plus} alt="plus" />
                          </Button>
                        </div>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              );
            })}
          </Col>

          <Col xs={12} md={12} lg={4} xl={4} className="content-dua">
            {cartsData?.map((order, j) => {
              return (
                <>
                  <div className="content-subtotal" key={j}>
                    <h5 className="subtotal1">Subtotal</h5>
                    <h5 className="subtotal2">
                      {(order.order_qty * order.book.price).toLocaleString()}
                    </h5>
                  </div>
                  <div className="content-qty">
                    <h5 className="qty1">Qty</h5>
                    <h5 className="qty2">{order.order_qty}</h5>
                  </div>
                </>
              );
            })}
            <div className="content-total">
              <h5 className="total1">Total</h5>
              <h5 className="total2">{total?.toLocaleString()}</h5>
            </div>

            {/* <div className="content-proof-transfer">
                <div className="img-upload">
                  <FormLabel htmlFor="image" className="label">
                    <Image src={proof} className="img-proof"/>
                  </FormLabel>
                  <Form.Control type="file" className="form-input" name="image" id="image" onChange={handleChange}/>
                </div>
                <Form.Text className="text-proof">Please upload proof of transfer</Form.Text>
              </div> */}

            <div className="transaction">
              {/* <Image
                src={transaction}
                className="img-transaction"
                alt="transaction"
              /> */}
              <Button
                className="btn-transaction"
                onClick={() => handlePay.mutate()}
              >
                Pay
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    transactionsUser: state.transaction,
    carts: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTransactionsUser: () => dispatch(FunctionGetTransactionsUser()),
    loadCarts: () => dispatch(FunctionGetCarts()),
    deleteCart: (id) => dispatch(FunctionDeleteCart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
