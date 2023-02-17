// components
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import moment from 'moment'

// react bootstrap
import {Form, Image} from 'react-bootstrap';

// image
import flower1 from '../../assets/img/flower1.png';
import flower2 from '../../assets/img/flower2.png';

// css
import './DetailImage.scss'

// api
import { API } from '../../config/api.js'

const DetailImage = () => {

    let {id} = useParams()
    id = parseInt(id)

     // query data book by id
     let { data: detailBook} = useQuery('bookDetailCache', async () => {
        const response = await API.get(`/book/${id}`);
        return response.data.data;
    });

    return (
        <>  
            <Image src={flower1} className='flower1'/>
            <Image src={flower2} className='flower2'/>
            <div className='detail-img-container'>
                <div className="thumbnail">
                    <div className='content-thumbnail'>
                        <Image src={detailBook?.thumbnail} className="img-thumbnail" alt=""/> 
                    </div>
                    <div className="detail-book-info">  
                        <Form.Text className='detail-title'>{detailBook?.title}</Form.Text>
                        <Form.Text className='detail-artist'>By. {detailBook?.author}</Form.Text>
                        <Form.Text className='detail-publication-date'>Publication date</Form.Text>
                        <Form.Text className='detail-date'>{moment(detailBook?.publication_date).format("YYYY-MM-DD")}</Form.Text>
                        <Form.Text className='detail-pages'>Pages</Form.Text>   
                        <Form.Text className='pages'>{detailBook?.pages}</Form.Text>   
                        <Form.Text className='detail-isbn'>ISBN</Form.Text> 
                        <Form.Text className='isbn'>{detailBook?.isbn}</Form.Text> 
                        <Form.Text className='detail-price'>Price</Form.Text> 
                        <Form.Text className='price'>Rp. {detailBook?.price.toLocaleString()}</Form.Text> 
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailImage