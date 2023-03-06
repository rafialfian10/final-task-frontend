// components react bootstrap
import { Button } from 'react-bootstrap';

// scss
import './DescriptionDownload.scss'

const DescriptionDownload = () => {

    return (
        <>
            <div className="desc-container">
                <h2 className='detail-title-desc'>About This Book</h2>
                <div className='detail-desc'>
                    <p className='detail-desc-info'>Bagi Heidy Theapila, latar belakang keluarga membuatnya tak mudah menemukan pasangan sejiwa. Tapi, ceritanya berbeda dengan Mirza. Heidy meyakini lelaki itu mencintainya dengan tulus. Namun, keyakinannya tumbang. Pertemuan mereka bukan cuma karena campur tangan Allah semata. Melainkan karena skenario rapi yang berkaitan dengan materi. Marah sekaligus patah hati, Heidy membatalkan rencana masa depannya dan memilih kabur ke Italia. Langkahnya mungkin tak dewasa, tapi Heidy butuh ruang untuk meninjau ulang semua rencana dalam hidupnya. Lalu, Allah memberinya kejutan.</p>
                    <br />
                    <p className='detail-desc-info'>Dalam pelayaran menyusuri Venesia, Heidy bertemu raksasa bermata biru. Graeme MacLeod, pria yang mencuri napasnya di pertemuan pertama mereka. Meski ketertarikan di antara mereka begitu besar, Heidy tidak berniat menjalin asmara singkat. Graeme harus dilupakan. Ketika apa yang terjadi di Venesia tidak bisa tetap ditinggal di Venesia, Heidy mulai goyah. Apalagi Graeme ternyata lelaki gigih yang mengejarnya hingga ke Jakarta dan tak putus asa tatkala ditolak. Meski akhirnya satu per satu rahasia kelam lelaki itu terbuka, Heidy justru kian jatuh cinta. Pertanyaannya, apakah cinta memang benar-benar mampu menyatukan mereka?</p>

                    <div className='content-btn-download'>
                        <Button type='submit' className='btn-download'>Download</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DescriptionDownload