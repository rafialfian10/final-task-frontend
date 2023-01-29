/* eslint-disable react-hooks/exhaustive-deps */
// components react bootstrap
import {Form, Card, Button, Image } from 'react-bootstrap'

// components
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'

import { API } from '../../../config/api'

// images
import trash from '../../../assets/img/delete.png'
import flower1 from '../../../assets/img/flower1.png'
import flower2 from '../../../assets/img/flower2.png'
import plus from '../../../assets/img/plus.png'
import minus from '../../../assets/img/minus.png'

// scss
import './Cart.scss'
import Swal from "sweetalert2";

const Cart = () => {

  const navigate = useNavigate()
    
  let {id}= useParams()
  id = parseInt(id)

  // get order cart user
  let { data: orderCart, refetch: refetchOrder} = useQuery('orderCart', async () => {
    const response = await API.get(`/carts`);
    return response.data.data;
  });

  // get transaction
  let { data: transaction } = useQuery('transactionCache', async () => {
    const response = await API.get(`/transactions`);
    return response.data.data;
  });

  // function delete cart
  const handledeleteCart = async (id) => {
    await API.delete(`/cart/${id}`);  
    Swal.fire({
          text: 'Cart successfully deleted',
          icon: 'success',
          confirmButtonText: 'Ok'
    })
    refetchOrder()       
  }

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
  const [total, setTotal] = useState(0)

  useEffect(() => {
    let total = orderCart?.reduce((sum, order) => {  // reduce : par 1 accumulator, par2 current value
      return sum + order.order_qty * order.book.price;
    }, 0);

    setTotal(total);
  });
 
  // snap midtrans
  const handlePay = useMutation(async () => {
    try {
      let books = [];

      orderCart.forEach((item) => {
        books.push({
          id: item.id,
          book_id: item.book.id,
          orderQty: item.order_qty,
        });
      });

      const body = {
        total: total,
        books: books,
      };
      
      const response = await API.post("/transaction", body);
      if (response.data.code === 200) {
        window.snap.pay(response.data.data.midtrans_id, {
          // success
          onSuccess: function (result) {
            Swal.fire({
              text: 'Transaction success',
              icon: 'success',
              confirmButtonText: 'Ok'
            })
            navigate(`/profile/${id}`);
            window.location.reload()
            refetchOrder();
          },
          // pending
          onPending: function (result) {
            navigate(`/cart/${id}`);
            window.location.reload()
            refetchOrder();
          },
          // error
          onError: function (result) {
            Swal.fire({
              title: 'Are you sure to cancel transaction?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes!'
            }).then((result) => {
              if (result.isConfirmed) {
                  Swal.fire({
                    icon: 'success',
                    text: 'cancel transaction successfully'
                  })
                }
            })
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
    } catch (error) {
      console.log(error)
    }
  });

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js"; // panngil snap middtrans
    const myMidtransClientKey = "SB-Mid-client-xBHWdiuU4aVE9vOq"; // clint key untuk custom snap

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
  
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <>
      <Image src={flower1} alt='' className='flower1'/>
      <Image src={flower2} alt='' className='flower2'/>
      <h4 className='cart-title'>My Cart</h4>
        {!orderCart ? (
           <h1 className='order-empty'>Order is Empty</h1>
        ) : (
          <div className="payment-container" >
            <div className='content-satu'>
              <h3 className="review">Review your order</h3>
                <>
                  {orderCart?.map((order, i) => {
                    return (
                      <Card className='container-cart' key={i}>
                        <Card.Img  src={order.book.thumbnail} className='img-card' />
                        <Card.Body className='review-book-desc'>
                          <Card.Title className='review-book-title'>{order.book.title}</Card.Title>
                          <Form.Text className='review-artist'>By. {order.book.author}</Form.Text>
                          <Form.Text className='review-price'>Rp. {order.book.price.toLocaleString()}</Form.Text>
                          <div className='content-cart'>
                            <Button onClick={() => {order.order_qty > 1 && handleLessQty.mutate(order.id)}} className='minus'><Image src={minus} alt=""/></Button>
                            <h5 className='value'>{order.order_qty}</h5>
                            <Button  onClick={() => {order.order_qty < order.book.quota 
                              ? handleAddQty.mutate(order.id)
                              : Swal.fire({
                                  icon: "error",
                                  title: "Out of stock",
                              });
                            }} className="plus"> <img src={plus} alt=""/>
                            </Button>
                          </div>
                        </Card.Body>
                        <Button className='btn-trash' onClick={() => { handledeleteCart(order.id)}}>
                          <Image src={trash} className='img-trash' />
                        </Button>
                      </Card>
                    )
                  })}
                </>
            </div>
                      
            <div className="content-dua">
              {orderCart?.map((order, i) => {
                return (
                  <>
                    <div className='content-subtotal' key={i}>
                      <h5 className="subtotal1">Subtotal</h5>
                      <h5 className='subtotal2'>{(order.order_qty * order.book.price).toLocaleString()}</h5>
                    </div>
                    <div className='content-qty'>
                      <h5 className="qty1">Qty</h5>
                      <h5 className='qty2'>{order.order_qty}</h5>
                    </div>
                  </>
                )
              })}
                    <div className='content-total'>
                      <h5 className="total1">Total</h5>
                      <h5 className='total2'>{total?.toLocaleString()}</h5>
                    </div>
              <div className='transaction'>
                <Image src={transaction} className='img-transaction' alt=''/>
                <Button className='btn-transaction' onClick={() => handlePay.mutate()}>Pay</Button>
              </div>
            </div>
          </div>
        )}     
    </>
  )
}
export default Cart