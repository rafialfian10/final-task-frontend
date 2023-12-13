/* eslint-disable array-callback-return */
/* eslint-disable no-lone-blocks */
// components react bootstrap
import { Button, Card, Form } from "react-bootstrap";

// component
import { useQuery } from "react-query";

// api
import { API } from "../../config/api";

// css
import "./ListDownload.scss";

const ListDownload = () => {
  // get transaction user book
  let { data: transactionBook } = useQuery("transactionBookCache", async () => {
    const response = await API.get(`/transactions`);
    return response.data.data;
  });

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

  return (
    <>
      <Form.Text className="download-title">My Books</Form.Text>
      <div className="container-download">
        {transactionBook?.map((transaction) => {
          {
            if (transaction?.status === "approve") {
              return (
                <>
                  {transaction.book?.map((item, i) => {
                    return (
                      <Card className="list-download" key={i}>
                        <Card.Img
                          variant="top"
                          src={item?.thumbnail}
                          className="img-list-download"
                        />
                        <Card.Body className="list-desc">
                          <Card.Title className="list-title">
                            {item?.title}
                          </Card.Title>
                          <Form.Text className="list-artist">
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
                    );
                  })}
                </>
              );
            } else if (transaction?.status === "success") {
              return (
                <>
                  {transaction.book?.map((item, i) => {
                    return (
                      <Card className="list-download" key={i}>
                        <Card.Img
                          variant="top"
                          src={item?.thumbnail}
                          className="img-list-download"
                        />
                        <Card.Body className="list-desc">
                          <Card.Title className="list-title">
                            {item?.title}
                          </Card.Title>
                          <Form.Text className="list-artist">
                            By. {item?.author}
                          </Form.Text>
                          <div className="container-waiting">
                            <Form.Text className="waiting">
                              Waiting to be approved By Admin for download
                            </Form.Text>
                          </div>
                        </Card.Body>
                      </Card>
                    );
                  })}
                </>
              );
            }
          }
        })}
      </div>
    </>
  );
};

export default ListDownload;
