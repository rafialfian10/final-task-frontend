// components react bootstrap
import { HeartFill, CCircle  } from "react-bootstrap-icons";

// css
import './Footer.scss'
// --------------------------------------

const Footer = () => {
    return (
        <div className="footer">
            <p>
                <CCircle color="white" size={20} />opyright 2022 Waysbook -
                <span className="copyright-text">
                    <HeartFill color="red" size={13} /> Rafi Alfian - NIS.All Right reserved
                </span>
            </p>
        </div>
    )
}

export default Footer;
