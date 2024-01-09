/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable no-lone-blocks */
// components react
import { useEffect } from "react";

// components redux
import { FunctionGetTransactionsUser } from "../../redux/features/TransactionSlice";
import { connect } from "react-redux";

// components react bootstrap
import { Button, Card, Form, Row, Col, Spinner } from "react-bootstrap";

// css
import "./ListDownload.scss";
// ---------------------------------------------------------------

const ListDownload = (props) => {
  const { transactionsUser, loadTransactionsUser } = props;
  const { transactionData, transactionsData, loadingTransaction, errorMessageTransaction } = transactionsUser;
  // console.log("list download", props);

  // handle download file pdf
  const handleDownloadFile = (value) => {
    fetch(value?.book, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
      },
    })
      .then((response) => response.blob())
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${value?.title}.pdf`);

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      });
  };

  useEffect(() => {
    loadTransactionsUser();
  }, []);

  return (
    <div className="container-list-download">
      <h4 className="listdownload-title">My Books</h4>
      {loadingTransaction ? (
        <div
          className="position-fixed top-50 start-50 translate-middle"
          style={{ zIndex: 9999 }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row xs={1} md={2} xl={5} className="w-100 m-0 g-3">
          {transactionsData?.map((transaction) => {
            if (transaction?.status === "approve") {
              return transaction.book?.map((item, i) => {
                return (
                  <Col key={i}>
                    <Card className="list-download">
                      <Card.Img
                        variant="top"
                        src={item?.thumbnail}
                        className="list-thumbnail-download"
                      />
                      <Card.Body className="list-desc-download">
                        <Card.Title className="list-title-download">
                          {item?.title}
                        </Card.Title>
                        <Form.Text className="list-artist-download">
                          By. {item?.author}
                        </Form.Text>
                        <div className="container-btn-download">
                          <Button
                            className="btn-download-book"
                            onClick={() => handleDownloadFile(item)}
                          >
                            Download
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              });
            } else if (transaction?.status === "success") {
              return transaction.book?.map((item, i) => {
                return (
                  <Col key={i}>
                    <Card className="list-download">
                      <Card.Img
                        variant="top"
                        src={item?.thumbnail}
                        className="list-thumbnail-download"
                      />
                      <Card.Body className="list-desc-download">
                        <Card.Title className="list-title-download">
                          {item?.title}
                        </Card.Title>
                        <Form.Text className="list-artist-download">
                          By. {item?.author}
                        </Form.Text>
                        <div className="container-waiting">
                          <Form.Text className="waiting">
                            Waiting to be approved By Admin for download
                          </Form.Text>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              });
            }
          })}
        </Row>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    transactionsUser: state.transaction,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTransactionsUser: () => dispatch(FunctionGetTransactionsUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListDownload);
