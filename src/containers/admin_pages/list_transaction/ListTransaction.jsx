/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
//components react bootstrap
import {Table, Image} from 'react-bootstrap';
import Paginations from '../../../components/pagination/Paginations';
import ModalApproved from '../modal_approved/ModalApproved';

// component
import { useState } from 'react';
import { useQuery } from 'react-query';

// api
import { API } from '../../../config/api';

// css
import './ListTransaction.scss';

// images
import flower1 from '../../../assets/img/flower1.png';
import flower2 from '../../../assets/img/flower2.png';
import action from '../../../assets/img/search.png';

function Admin({search}) {

  let no = 1;

  // state modal
  const [modalApproved, setModalApproved] = useState(false);

  // state order
  const [order, setOrder] = useState(null);

  // modal pagination
  const [dataTransaction, setDataTransaction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [halamanAktif, setHalamanAktif] = useState(1);
  const [dataPerHalaman] = useState(2);

  const { data, refetch: refetchAllTransactionsAdmin } = useQuery("allTransactionsAdminCache", async () => {
      try {
        const response = await API.get(`/transactions-admin`)
        setDataTransaction(response.data.data)
        setLoading(false)
        return response.data.data;
      } catch (e) {
        console.log(e);
      }
    }
  );
 
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
     <ModalApproved modalApproved={modalApproved} setModalApproved={setModalApproved} order={order} refetchAllTransactionsAdmin={refetchAllTransactionsAdmin}/>
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <>
            {currentPost?.filter(item => {
              if(search === "") {
                return item
              } else if(item?.user.name.toLowerCase().includes(search.toLowerCase())) {
                return item
              } 
            }).map((transaction, i) => {
              return (
                <tr key={i}>
                  <td>{no++ + indexFirstPost}</td>
                  <td>{transaction?.user.name}</td>
                  <td>bca.png</td>
                  <td>
                    {transaction?.book?.map((item, i) => (
                      <ul key={i}>
                        <li>{item?.title}</li>
                      </ul> 
                    ))}
                  </td>

                  {/* transaction total */}
                  {transaction?.status === "success" || transaction?.status === "approve" ? (
                    <td className="text-success">IDR. {transaction?.total}</td>
                  ) : (
                    <td className="text-danger">IDR. {transaction?.total}</td>
                  )}

                  {/* transaction status */}
                  {transaction?.status === "pending" && <td className="text-warning">{transaction?.status}</td>}
                  {transaction?.status === "cancel" && <td className="text-danger">{transaction?.status}</td>}
                  {transaction?.status === "reject" && <td className="text-danger">{transaction?.status}</td>}
                  {transaction?.status === "failed" && <td className="text-danger">{transaction?.status}</td>}
                  {transaction?.status === "success" && <td className="text-success">{transaction?.status}</td>}
                  {transaction?.status === "approve" && <td className="text-success">{transaction?.status}</td>}
                  <td><img src={action} alt="" className="search" onClick={() => {setModalApproved(true); setOrder(transaction)} } /></td>
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