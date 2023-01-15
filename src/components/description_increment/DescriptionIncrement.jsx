// components
import { useQuery, useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../popup/Popup';

// components react bootstrap
import {Button, Image } from 'react-bootstrap';

// api
import { API } from '../../config/api';

// scss
import './DescriptionIncrement.scss'
import Swal from "sweetalert2";

// image
import bracket from '../../assets/img/white-bracket.png';

const DescriptionIncrement = () => {

    const navigate = useNavigate()

    let {id} = useParams()
    id = parseInt(id)

    // state popup
    const [popup, setPopup] = useState(false)


    // query data book by id
    let { data: detailBookDescription, refetch: refetchBracket} = useQuery('bookDetailDescriptionCache', async () => {
        const response = await API.get(`/book/${id}`);
        return response.data.data;
    });

    const handleAddCart = useMutation(async (e) => {
        e.preventDefault()
    
        const config = {
          headers: { "Content-type": "application/json" },
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
    
        const dataBook = {
          book_id: detailBookDescription.id,
        }
        
        console.log(dataBook)
        const body = JSON.stringify(dataBook)
    
        await API.post("/cart", body, config)
        setPopup(true)
        refetchBracket()
      })

    // handler show login (jika belum login maka lempar kembali ke halaman home)
    const showLogin = () => {
    let token = localStorage.getItem("token")
        if(!token) {     
            //alert
            Swal.fire({
                text: 'Please login account',
                icon: 'warning',
                confirmButtonText: 'Ok'
            })
            navigate("/")  
        } 
    }

    return (
        <> 
        <Popup popup={popup} setPopup={setPopup} />
            <div className="desc-container">
                <h2 className='detail-title-desc'>About This Book</h2>
                <div className='detail-desc'>
                    <p className='detail-desc-info'>{detailBookDescription?.description}</p>
                    <br />
                    <p className='detail-desc-info'>Bagi Heidy Theapila, latar belakang keluarga membuatnya tak mudah menemukan pasangan sejiwa. Tapi, ceritanya berbeda dengan Mirza. Heidy meyakini lelaki itu mencintainya dengan tulus. Namun, keyakinannya tumbang. Pertemuan mereka bukan cuma karena campur tangan Allah semata. Melainkan karena skenario rapi yang berkaitan dengan materi. Marah sekaligus patah hati, Heidy membatalkan rencana masa depannya dan memilih kabur ke Italia. Langkahnya mungkin tak dewasa, tapi Heidy butuh ruang untuk meninjau ulang semua rencana dalam hidupnya. Lalu, Allah memberinya kejutan.</p>
                    <br />
                    <p className='detail-desc-info'>Dalam pelayaran menyusuri Venesia, Heidy bertemu raksasa bermata biru. Graeme MacLeod, pria yang mencuri napasnya di pertemuan pertama mereka. Meski ketertarikan di antara mereka begitu besar, Heidy tidak berniat menjalin asmara singkat. Graeme harus dilupakan. Ketika apa yang terjadi di Venesia tidak bisa tetap ditinggal di Venesia, Heidy mulai goyah. Apalagi Graeme ternyata lelaki gigih yang mengejarnya hingga ke Jakarta dan tak putus asa tatkala ditolak. Meski akhirnya satu per satu rahasia kelam lelaki itu terbuka, Heidy justru kian jatuh cinta. Pertanyaannya, apakah cinta memang benar-benar mampu menyatukan mereka?</p>

                    <div className='btn-cart'>
                        <Button type='submit' onClick={(e) => {setPopup(); handleAddCart.mutate(e); showLogin()}}><Image src={bracket} className='img-bracket'/> Add cart</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DescriptionIncrement