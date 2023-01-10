// react bootstrap
import {Form, Image} from 'react-bootstrap';

// scss
import "./Jumbotron.scss";

// images
import flower1 from '../../assets/img/flower1.png';
import flower2 from '../../assets/img/flower2.png';

const Jumbotron = () => {
    return (
        <div className='container-jumbotron'>
            <Image src={flower1} className='flower1'/>
            <Image src={flower2} className='flower2'/>
            <Form.Text className='jumbotron-title'>With us, you can shop online & help <br/> save your high street at the same time</Form.Text>
        </div>
    )
}

export default Jumbotron