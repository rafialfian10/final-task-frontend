// components react bootstrap
import {Form, Card, Button, Image } from 'react-bootstrap'

// components
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'

import { API } from '../../../config/api'

// image
import transaction from '../../../assets/img/transaction.png'
import listbook1 from '../../../assets/img/listbook1.png'
import listbook2 from '../../../assets/img/listbook2.png'
import trash from '../../../assets/img/delete.png'
import flower1 from '../../../assets/img/flower1.png'
import flower2 from '../../../assets/img/flower2.png'

// scss
import './Cart.scss'
import Swal from "sweetalert2";

const Cart = () => {

//   const navigate = useNavigate()
    
//   let {id}= useParams()
//   id = parseInt(id)

//   const [number, setNumber] = useState(0)

//   // HandlerPlus Function
//   const HandlerPlus = () => {
//       setNumber(number+1)
//       if (number === detailBooksCart?.quota){
//         setNumber(detailBooksCart?.quota)
//         Swal.fire({
//           text: 'Quota is empty',
//           icon: 'error',
//           confirmButtonText: 'Ok'
//         })
//       } else if(detailBooksCart?.quota === 0){
//         setNumber(detailBooksCart?.quota)
//       }
//   }

//   useEffect(() => {
//     const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js"; // panngil snap middtrans
//     const myMidtransClientKey = "SB-Mid-client-xBHWdiuU4aVE9vOq"; // clint key untuk custom snap
  
//     let scriptTag = document.createElement("script");
//     scriptTag.src = midtransScriptUrl;
   
//     scriptTag.setAttribute("data-client-key", myMidtransClientKey);
  
//     document.body.appendChild(scriptTag);
//     return () => {
//       document.body.removeChild(scriptTag);
//     };
//   }, []);
//   //----------------------------------------

//  // handle snap buy (parameter dari trip yang dilooping)
//  const handleBuy = useMutation(async (book) => {
//   try {
//     // Get data from trip
//     const data = {
//       qty: number,
//       total: number * book.price,
//       bookId: book.id,
//     };

//     // Configuration
//     const config = {
//       method: "POST",
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem("token"),
//         "Content-type": "multipart/form-data",
//       },
//     };

//     const formData = new FormData()
//     formData.append("qty", data.qty)
//     formData.append("total", data.total)
//     formData.append("book_id", data.bookId)

//     // Insert transaction data
//     const response = await API.post("/transaction", formData, config);

//     console.log("response beli", response)
//     const token = response.data.data.token
//     console.log(token)

//     window.snap.pay(token, {
//       onSuccess: function (result) {
//         console.log(result);
//         Swal.fire({
//           text: 'Transaction success',
//           icon: 'success',
//           confirmButtonText: 'Ok'
//         })
//         navigate(`/profile/${id}`);
//         window.location.reload()
//       },
//       onPending: function (result) {
//         console.log(result);
//         navigate(`/detail/${id}`);
//         window.location.reload()
//       },
//       onError: function (result) {
//         console.log(result);
//         Swal.fire({
//           title: 'Are you sure to cancel transaction?',
//           icon: 'warning',
//           showCancelButton: true,
//           confirmButtonColor: '#3085d6',
//           cancelButtonColor: '#d33',
//           confirmButtonText: 'Yes!'
//         }).then((result) => {
//           if (result.isConfirmed) {
//             Swal.fire({
//               icon: 'success',
//               text: 'cancel transaction successfully'
//         })
//         }
//         })
//         navigate(`/detail/${id}`)
        
//       },
//       onClose: function () {
//         Swal.fire({
//           text: 'please make payment first',
//           confirmButtonText: 'Ok'
//         })

//       },
//     })

//   } catch (error) {
//     console.log(error);
//   }
// });
// //--------------------------------------  

// // get data book
// let { data: detailBooksCart} = useQuery('detailBooksCartCache', async () => {
//   const response = await API.get(`/book/${id}`);
//   console.log(response)
//   return response.data.data;
// });

// console.log(detailBooksCart)

    
// // handler show login (jika belum login maka lempar kembali ke halaman home)
// const showLogin = () => {
//   let token = localStorage.getItem("token")
//   if(!token) {     
//       //alert
//       Swal.fire({
//           text: 'Please login account',
//           icon: 'warning',
//           confirmButtonText: 'Ok'
//       })
//       navigate("/")  
  // } 
// }

    return (
        <>
            <Image src={flower1} alt='' className='flower1'/>
            <Image src={flower2} alt='' className='flower2'/>
            <h4 className='cart-title'>My Cart</h4>
            <div className="payment-container">
              <div className='content-satu'>
                <h3 className="review">Review your order</h3>
                
                <Card className='container-cart'>
                  <Card.Img  src={listbook1} className='img-card' />
                    <Card.Body className='review-book-desc'>
                      <Card.Title className='review-book-title'>My Own Private Mr. Cool</Card.Title>
                      <Form.Text className='review-artist'>By. Indah Hanaco</Form.Text>
                      <Form.Text className='review-price'>Rp. 75.000</Form.Text>
                    </Card.Body>
                    <Button className='btn-trash'>
                      <Image src={trash} className='img-trash' />
                    </Button>
                </Card>

                <Card className='container-cart'>
                  <Card.Img src={listbook2} className='img-card' />
                    <Card.Body className='review-book-desc'>
                      <Card.Title className='review-book-title'>Garis Waktu : Sebuah Perjalanan</Card.Title>
                      <Form.Text className='review-artist'>By. Fiersa Besari</Form.Text>
                      <Form.Text className='review-price'>Rp. 49.300</Form.Text>
                    </Card.Body>
                    <Button className='btn-trash'>
                      <Image src={trash} className='img-trash' />
                    </Button>
                </Card>
              </div>
          
            <div className="content-dua">
              <div className='content-subtotal'>
                <h5 className="subtotal1">Subtotal</h5>
                <h5 className='subtotal2'>134.000</h5>
              </div>
              <div className='content-qty'>
                <h5 className="qty1">Qty</h5>
                <h5 className='qty2'>2</h5>
              </div>
              <div className='content-total'>
                <h5 className="total1">Total</h5>
                <h5 className='total2'>134.000</h5>
              </div>
              <div className='transaction'>
                <Image src={transaction} className='img-transaction' alt=''/>
                <Button className='btn-transaction'>Pay</Button>
              </div>
            </div>
          </div>
        </>
    )
}
export default Cart