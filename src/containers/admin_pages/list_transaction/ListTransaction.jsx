/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
// components react
import { useState, useEffect } from "react";

// components redux
import { connect } from "react-redux";
import { FunctionGetTransactionsAdmin } from "../../../redux/features/TransactionSlice";

//components react bootstrap
import { Table, Image, Row, Col, Spinner } from "react-bootstrap";

// components
import Paginations from "../../../components/pagination/Paginations";
import ModalApproved from "../modal_approved/ModalApproved";

// css
import "./ListTransaction.scss";

// images
import flower1 from "../../../assets/img/flower1.png";
import flower2 from "../../../assets/img/flower2.png";
import action from "../../../assets/img/search.png";
// ----------------------------------------------------------------

function ListTransaction(props) {
  const { transactionsAdmin, loadTransactionAdmin, search } = props;
  const { TransactionData, TransactionsData, loading, errorMessage } = transactionsAdmin;

  let no = 1;

  // state modal
  const [modalApproved, setModalApproved] = useState(false);

  // state order
  const [order, setOrder] = useState(null);

  // paginations
  const [currentPage, setcurrentPage] = useState(1);
  const [dataPerPage, setitemsPerPage] = useState(5);

  const indexLastData = currentPage * dataPerPage;
  const indexFirstData = indexLastData - dataPerPage;
  const currentItems = TransactionsData?.slice(indexFirstData, indexLastData);

  const handlePageClick = (pageNumber) => {
    setcurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    setcurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setcurrentPage(currentPage - 1);
  };

  useEffect(() => {
    loadTransactionAdmin();
  }, []);

  return (
    <>
      <ModalApproved
        modalApproved={modalApproved}
        setModalApproved={setModalApproved}
        order={order}
        loadTransactionAdmin={loadTransactionAdmin}
      />
      <Image src={flower1} alt="flower1" className="flower1" />
      <Image src={flower2} alt="flower2" className="flower2" />
      {loading ? (
        <div
          className="position-fixed top-50 start-50 translate-middle"
          style={{ zIndex: 9999 }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row className="list-transaction-container">
          <h4 className="title-list-transaction">Incoming Transaction</h4>
          <Col xs={12} md={12} lg={12} xl={12}>
            <Table
              striped
              bordered
              hover
              responsive
              className="table-list-transaction"
            >
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
                  {currentItems
                    ?.filter((item) => {
                      if (search === "") {
                        return item;
                      } else if (
                        item?.user.name
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        item?.status
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      ) {
                        return item;
                      }
                    })
                    .map((transaction, i) => {
                      return (
                        <tr key={i}>
                          <td className="text-center">
                            {no++ + indexFirstData}
                          </td>
                          <td className="text-start">
                            {transaction?.user.name}
                          </td>
                          <td className="text-center">bca.png</td>
                          <td className="text-start">
                            {transaction?.book?.map((item, i) => (
                              <ul key={i}>
                                <li>{item?.title}</li>
                              </ul>
                            ))}
                          </td>
                          {transaction?.status === "success" ||
                          transaction?.status === "approve" ? (
                            <td className="text-center text-success">
                              IDR. {transaction?.total}
                            </td>
                          ) : (
                            <td className="text-center text-danger">
                              IDR. {transaction?.total}
                            </td>
                          )}
                          {transaction?.status === "pending" && (
                            <td className="text-center text-warning">
                              {transaction?.status}
                            </td>
                          )}
                          {transaction?.status === "cancel" && (
                            <td className="text-center text-danger">
                              {transaction?.status}
                            </td>
                          )}
                          {transaction?.status === "reject" && (
                            <td className="text-center text-danger">
                              {transaction?.status}
                            </td>
                          )}
                          {transaction?.status === "failed" && (
                            <td className="text-center text-danger">
                              {transaction?.status}
                            </td>
                          )}
                          {transaction?.status === "success" && (
                            <td className="text-center text-success">
                              {transaction?.status}
                            </td>
                          )}
                          {transaction?.status === "approve" && (
                            <td className="text-center text-success">
                              {transaction?.status}
                            </td>
                          )}
                          <td className="text-center">
                            <Image
                              src={action}
                              alt="action"
                              className="search"
                              onClick={() => {
                                setModalApproved(true);
                                setOrder(transaction);
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </>
              </tbody>
            </Table>
            <Paginations
              dataTransaction={TransactionsData}
              currentPage={currentPage}
              dataPerPage={dataPerPage}
              handlePageClick={handlePageClick}
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
            />
          </Col>
        </Row>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    transactionsAdmin: state.transaction,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTransactionAdmin: () => dispatch(FunctionGetTransactionsAdmin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListTransaction);
