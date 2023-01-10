// components bootstrap
import { Button, Form, Image } from 'react-bootstrap'
import ListDownload from '../../../components/listDownload/ListDownload';

// image
import flower1 from '../../../assets/img/flower1.png';
import flower2 from '../../../assets/img/flower2.png';
import message from '../../../assets/img/message.png';
import address from '../../../assets/img/address.png';
import phone from '../../../assets/img/phone.png';
import gender from '../../../assets/img/gender.png';
import defaultPhoto from '../../../assets/img/default-photo.png';

// css
import "./Profile.scss";

const Profile = () => {
    return (
        <>
            <Image src={flower1} className='flower1'/>
            <Image src={flower2} className='flower2'/>
            <div className="profile-container">
                <div className="content-profile1">
                    <h2>Personal Info</h2>

                    <div className="email">
                      <img src={message} alt="" />
                      <div className="sub-email">
                        <p className="info1">rafialfian770@gmail.com</p>
                        <p className="info2">Email</p>
                      </div>
                    </div>

                    <div className="profile">
                      <img src={gender} alt="" />
                      <div className="sub-profile">
                        <p className="info1">Male</p>
                        <p className="info2">Gender</p>
                      </div>
                    </div>

                    <div className="phone">
                      <img src={phone} alt="" />
                      <div className="sub-phone">
                        <p className="info1">08979638899</p>
                        <p className="info2">Mobile Phone</p>
                      </div>
                    </div>
                    <div className="address">
                      <img src={address} alt="" />
                      <div className="sub-address">
                        <p className="info1">Jepara</p>
                        <p className="info2">Address</p>
                      </div>
                    </div>
                </div>

                <div className="content-profile2">
                    {/* {user.image !== "http://localhost:5000/uploads/" ? ( */}
                      {/* <img src={user.image} alt="" /> */}
                    {/* ) : ( */}
                      <img src={defaultPhoto} alt="" />
                    {/* )} */}
                    <Form.Control type="file" id="image" className="form-input input-image" name="image"/>
                    <Button onClick={() => {document.getElementById("image").click();}}>Change Photo Profile</Button>
                    {/* </Form> */}
                </div>
            </div>
            <ListDownload/>
        </>
    )
}

export default Profile