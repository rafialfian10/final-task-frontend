// components react bootstrap
import {Table} from 'react-bootstrap'
import Moment from 'react-moment'

// image
import transaction from '../../../assets/img/transaction.png'



const Cart = () => {

    return (
        <>
            {/* <Popup popup={popup} setPopup={setPopup} /> */}
            <div className="payment-container">
            <div className="content1">
              {/* <img src={icon} alt="" /> */}
              <div className="sub-content1">
                <h3 className="status">Booking</h3>
                <p className="date">Saturday, 22 July 2020</p>
              </div>
            </div>

            <div className="content2">
            <div className="info-payment">
              <h3 className="title">Title</h3>
              <p className="country">name</p>
              <p className="status-payment">Waiting Payment</p>
            </div>

            <div className="info-tour">
            <div className="sub-info-tour">
              <div className="date">
                <h5>Date Trip</h5>
                <p><Moment format="YYYY-MM-DD">date</Moment></p>
              </div>

            <div className="accomodation">
              <h5>Accomodation</h5>
              <p>accomodation</p>
            </div>
            </div>
          </div>

          <div className="img-payment">
            <img src={transaction} alt="" />
            <p>Upload Payment Proof</p>
          </div>
        </div>

              <Table striped bordered hover className="tables">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Full Name</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>rafi</td>
                    <td>gender</td>
                    <td>phone</td>
                    <td className="fw-bold">Qty</td>
                    <td className="fw-bold">: 1</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="fw-bold">Total</td>
                    <td className="fw-bold text-danger">: IDR. 1000</td>
                  </tr>
                </tbody>
              </Table>
      
            </div>
            <div className="btn-pay">
              <button type="submit">Pay</button>
            </div>
        </>
    )
}
export default Cart