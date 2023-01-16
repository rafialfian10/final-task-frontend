// components react bootstrap
import { Button, Card, Form } from 'react-bootstrap'

// component
import { useQuery } from 'react-query';

// api
import { API } from '../../config/api';

// css
import "./ListDownload.scss";

const ListDownload = () => {
    // get transaction user book
    let { data: transactionBook } = useQuery('orderCart', async () => {
        const response = await API.get(`/my-trans`);
        return response.data.data;
    });

// handle download file pdf
const handleDownloadFile = (urlFile) => {
    // using Java Script method to get PDF file
    fetch(urlFile).then(response => {
        response.blob().then(blob => {
            // Creating new object of PDF file
            const fileURL = window.URL.createObjectURL(blob);
            // Setting various property values
            let alink = document.createElement('a');
            alink.href = fileURL;
            alink.download = urlFile;
            alink.click();
        })
    })
}

    return (
        <>
            <Form.Text className='download-title'>My Books</Form.Text>
            <div className='container-download'>
                {transactionBook?.map((transaction, i) => {
                    return (
                        <>
                        {console.log(transaction)}
                        <Card className='list-download' key={i}>
                            <Card.Img variant="top" src={transaction.cart[0].book.thumbnail} className='img-list-download' />
                            <Card.Body className='list-desc'>
                                <Card.Title className='list-title'>{transaction.cart[0].book.title}</Card.Title>
                                <Form.Text className='list-artist'>By. {transaction.cart[0].book.author}</Form.Text>
                                <div className='container-btn-download'>
                                    <Button className='btn-download-book' onClick={() => handleDownloadFile(transaction.cart[0].book.book_attachment)}>Download</Button>
                                </div>
                            </Card.Body>
                        </Card>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default ListDownload