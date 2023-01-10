import {Table, Image} from 'react-bootstrap';
import { useState } from 'react';
import { API } from '../../../config/api';

// css
import './ListTransaction.scss'

// images
import flower1 from '../../../assets/img/flower1.png';
import flower2 from '../../../assets/img/flower2.png';

function Admin() {

  return (
    <>
     <h4>Incoming Transaction</h4>
     <Image src={flower1} alt="" className='flower1'/>
     <Image src={flower2} alt="" className='flower2'/>
     <Table striped bordered hover className="list-transaction">
        <thead>
            <tr>
            <th>No</th>
            <th>Users</th>
            <th>Evidence of Transfer</th>
            <th>Product Purchased</th>
            <th>Total Payment</th>
            <th>Status Payment</th>
            </tr>
        </thead>
        <tbody>
          <>
            {/* {transactions?.map((transaction, i) => { */}
              {/* return ( */}
                <tr>
                <td>1</td>
                <td>Rafi Alfian</td>
                <td>bca.png</td>
                <td>My Own Private Mr. Cool</td>
                <td>Rp. 75.000</td>
                <td>Approve</td>
                {/* {transaction.status === "success" && <td className="text-success">{transaction.status}</td>}
                {transaction.status === "pending" && <td className="text-warning">{transaction.status}</td>}
                {transaction.status === "failed" && <td className="text-danger">{transaction.status}</td>} */}
                {/* <td><img src={search} alt="" className="search" onClick={() => setModalApproved(true)} /></td> */}
                </tr>
              {/* ) */}
            {/* })} */}
          </>
        </tbody>
        </Table>
        </>
  );
}

export default Admin;