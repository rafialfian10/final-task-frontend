// components react
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";

// components redux
import { connect, useDispatch } from "react-redux";
import { FunctionGetTransactionsUser } from "../../../redux/features/TransactionSlice";

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
// import proof from "../../../assets/img/transaction.png"
// ----------------------------------------------------------------

const Cart = () => {
  // dispatch
  const dispatch = useDispatch();

  const navigate = useNavigate();

  let { id } = useParams();
  id = parseInt(id);

  // state image transfer & preview
  // const [preview, setPreview] = useState(null)
  // const [form, setForm] = useState({
  //   image: ""
  // })

  const [carts, setCarts] = useState([]);
  const [trans, setTrans] = useState([]);

  // handle change image
  // const handleChange = (e) => {
  //   setForm({
  //   ...form,
  //   [e.target.name]:
  //       e.target.type === "file" ? e.target.files : e.target.value,
  //   })

  //   // buat url image
  //   if (e.target.type === "file") {
  //       let url = URL.createObjectURL(e.target.files[0]);
  //       setPreview(url);
  //   }
  // };

  // get order cart user
  let { data: orderCart, refetch: refetchOrder } = useQuery(
    "orderCartsCache",
    async () => {
      const response = await API.get(`/carts`);
      return response.data.data;
    }
  );

  // get transaction
  let { data: transaction } = useQuery("transactionCache", async () => {
    const response = await API.get(`/transactions`);
    return response.data.data;
  });

  // add counter
  const handleAddQty = useMutation(async (id) => {
    try {
      const response = await API.patch(`/cart/${id}`, {
        event: "add",
      });
      if (response.data.code === 200) {
        refetchOrder();
      }
    } catch (error) {
      console.log(error);
    }
  });

  // less counter
  const handleLessQty = useMutation(async (id) => {
    try {
      const response = await API.patch(`/cart/${id}`, {
        event: "less",
      });
      if (response.data.code === 200) {
        refetchOrder();
      }
    } catch (error) {
      console.log(error);
    }
  });

  // state total
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // total order
    let total = orderCart?.reduce((sum, order) => {
      // reduce : par 1 accumulator, par2 current value
      return sum + order.order_qty * order.book.price;
    }, 0);
    setTotal(total);
  }, [orderCart]);

  // function delete cart
  const handleDeleteCart = async (id) => {
    await API.delete(`/cart/${id}`);
    Swal.fire({
      text: "Cart successfully deleted",
      icon: "success",
      confirmButtonText: "Ok",
    });
    refetchOrder();

    // Update carts after deleting cart
    const updatedCarts = carts.filter((cart) => cart.id !== id);
    setCarts(updatedCarts);
  };

  // function handle pay
  const handlePay = useMutation(async () => {
    try {
      let books = [];

      orderCart.forEach((item) => {
        books.push({
          id: item?.id,
          book_id: item?.book.id,
          orderQty: item?.order_qty,
        });
      });

      // image validation
      // const formDataTrans = new FormData()
      // if (form.image === "") {
      //   Swal.fire({
      //       text: "Please upload proof of transfer",
      //       icon: "warning",
      //       confirmButtonText: "Ok"
      //     })
      // } else {
      //   formDataTrans.append("image", form.image[0]);
      // }

      const body = {
        total: total,
        books: books,
      };

      // filter data barang yang sudah pernah transaksi
      let duplicateData = carts.filter((cart) => trans.includes(cart));
      if (duplicateData.length > 0) {
        Swal.fire({
          text: "you already have this book",
          icon: "warning",
          confirmButtonText: "Ok",
        });
      } else {
        const response = await API.post("/transaction", body);
        if (response.data.code === 200) {
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
              refetchOrder();
            },
            // pending
            onPending: function (result) {
              navigate(`/cart/${id}`);
              window.location.reload();
              refetchOrder();
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
              refetchOrder();
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
    // orderCart?.map((item) => {
    //   setCarts(prevState => [...prevState, item?.book.title]);
    // });

    if (orderCart) {
      const updatedCarts = orderCart.map((item) => item?.book?.title);
      setCarts(updatedCarts);
    }

    transaction?.forEach((item) => {
      if (item?.book && item.book.length > 0) {
        setTrans((prevState) => [...prevState, item.book[0].title]);
      }
    });
  }, [orderCart, transaction]);

  return (
    <>
      <Image src={flower1} alt="flower1" className="flower1" />
      <Image src={flower2} alt="flower2" className="flower2" />
      <h4 className="cart-title">My Cart</h4>
      {!orderCart ? (
        <h1 className="order-empty">Order is Empty</h1>
      ) : (
        <Row className="payment-container">
          <Col xs={12} md={12} lg={8} xl={8} className="content-satu">
            <h3 className="review">Review your order</h3>
            {orderCart?.map((order, i) => {
              return (
                <Card className="container-cart" key={i}>
                  <Card.Img src={order.book.thumbnail} className="img-card" />
                  <Card.Body className="review-book-desc">
                    <Card.Title className="review-book-title">
                      {order.book.title}
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
                          order.order_qty > 1 && handleLessQty.mutate(order.id);
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
                  <Button
                    className="btn-trash"
                    onClick={() => {
                      handleDeleteCart(order?.id);
                    }}
                  >
                    <Image src={trash} className="img-trash" />
                  </Button>
                </Card>
              );
            })}
          </Col>

          <Col xs={12} md={12} lg={4} xl={4} className="content-dua">
            {orderCart?.map((order, j) => {
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTransactionUser: () => dispatch(FunctionGetTransactionsUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
