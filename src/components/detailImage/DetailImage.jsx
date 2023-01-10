// react bootstrap
import {Form, Image} from 'react-bootstrap';

// image
import detailbook1 from '../../assets/img/detailbook1.png';
import flower1 from '../../assets/img/flower1.png';
import flower2 from '../../assets/img/flower2.png';

// css
import './DetailImage.scss'

// api
import { API } from '../../config/api.js'

const DetailImage = () => {

    return (
        <>  
            <Image src={flower1} className='flower1'/>
            <Image src={flower2} className='flower2'/>
            <div className='detail-img-container'>
                <div className="thumbnail">
                    <Image src={detailbook1} className="img-thumbnail" alt=""/> 
                    <div className="detail-book-info">  
                        <Form.Text className='detail-title'>My Own Private Mr Cool</Form.Text>
                        <Form.Text className='detail-artist'>By. Indah Hanaco</Form.Text>
                        <Form.Text className='detail-publication-date'>Publication date</Form.Text>
                        <Form.Text className='detail-date'>August 2018</Form.Text>
                        <Form.Text className='detail-pages'>Pages</Form.Text>   
                        <Form.Text className='pages'>264</Form.Text>   
                        <Form.Text className='detail-isbn'>ISBN</Form.Text> 
                        <Form.Text className='isbn'>9786020395227</Form.Text> 
                        <Form.Text className='detail-price'>Price</Form.Text> 
                        <Form.Text className='price'>Rp. 75.000</Form.Text> 
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailImage