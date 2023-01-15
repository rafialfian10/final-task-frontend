//components react bootstrap
import {Table, Image} from 'react-bootstrap';

// component
import { useQuery } from 'react-query';

// api
import { API } from '../../../config/api';

// css
import './ListTransaction.scss'

// images
import flower1 from '../../../assets/img/flower1.png';
import flower2 from '../../../assets/img/flower2.png';

function Admin() {

  let no = 1

   // get transaction user book
   let { data: listTransaction } = useQuery('listTransaction', async () => {
    const response = await API.get(`/transactions`);
    return response.data.data;
  });
  console.log(listTransaction)

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
              {listTransaction?.map((transaction, i) => {
                return (
                  <tr>
                  <td>{no++}</td>
                  <td>{transaction.user.name}</td>
                  <td>bca.png</td>
                  <td>{transaction.cart[0].book.title}</td>
                  <td>Rp. {transaction.total}</td>
                  {transaction.status === "success" && <td className="text-success">{transaction.status}</td>}
                  {transaction.status === "pending" && <td className="text-warning">{transaction.status}</td>}
                  {transaction.status === "failed" && <td className="text-danger">{transaction.status}</td>}
                  </tr>  
                )
              })}         
          </>
        </tbody>
        </Table>
        </>
  );
}

export default Admin;