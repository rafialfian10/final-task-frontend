//components react bootstrap
import {Table, Image} from 'react-bootstrap';

// component
import { useState, useEffect } from 'react';
import Paginations from '../../../components/pagination/Paginations';

// api
import { API } from '../../../config/api';

// css
import './ListTransaction.scss'

// images
import flower1 from '../../../assets/img/flower1.png';
import flower2 from '../../../assets/img/flower2.png';

function Admin() {

  let no = 1;

  const [dataTransaction, setDataTransaction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [halamanAktif, setHalamanAktif] = useState(1);
  const [dataPerHalaman] = useState(3);
  
  useEffect(() => {
    const fetchdata = async () => {
          setLoading(true)
          const response = await API.get(`/transactions-admin`)
          setDataTransaction(response.data.data)
          setLoading(false)
      }

      fetchdata()
  }, [])
 
  // get current post data
  const indexLastPost = halamanAktif * dataPerHalaman
  const indexFirstPost = indexLastPost - dataPerHalaman 
  const currentPost = dataTransaction?.slice(indexFirstPost, indexLastPost)
  
  if(loading) {
    return <h4>Loading...</h4>
  }

  // function handle pagination
  const paginate = (pageNumber) => setHalamanAktif(pageNumber)

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
            {currentPost?.map((transaction, i) => {
              return (
                <tr key={i}>
                  <td>{no++ + indexFirstPost}</td>
                  <td>{transaction.user.name}</td>
                  <td>bca.png</td>
                  <td>{transaction.book[0].title}</td>

                  {/* transaction total */}
                  {transaction.total && transaction.status === "success" ? (
                    <td className="text-success">{transaction.total}</td>
                  ) : (
                    <td className="text-danger">{transaction.total}</td>
                  )}

                  {/* transaction status */}
                  {transaction.status === "success" && <td className="text-success">{transaction.status}</td>}
                  {transaction.status === "pending" && <td className="text-warning">{transaction.status}</td>}
                  {transaction.status === "failed" && <td className="text-danger">{transaction.status}</td>}
                </tr>  
              )
            })}
          </>
        </tbody>
      </Table>
      <Paginations dataPerHalaman={dataPerHalaman} halamanAktif={halamanAktif} setHalamanAktif={setHalamanAktif} totalData={dataTransaction?.length} paginate={paginate}/>
    </>
  );
}

export default Admin;