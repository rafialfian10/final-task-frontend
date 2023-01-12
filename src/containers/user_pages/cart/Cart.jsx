// components react bootstrap
import {Form, Card, Button, Image } from 'react-bootstrap'

// image
import transaction from '../../../assets/img/transaction.png'
import listbook1 from '../../../assets/img/listbook1.png'
import listbook2 from '../../../assets/img/listbook2.png'
import trash from '../../../assets/img/delete.png'
import flower1 from '../../../assets/img/flower1.png'
import flower2 from '../../../assets/img/flower2.png'

// scss
import './Cart.scss'



const Cart = () => {

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