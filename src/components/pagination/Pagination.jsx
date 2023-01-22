// css
import './Pagination.scss'

const Pagination = ({dataPerHalaman, halamanAktif, totalData, paginate}) => {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalData / dataPerHalaman); i++ ) {
        pageNumbers.push(i)
    }

    console.log(pageNumbers)

    let jumlahLink = 3;
	let startNumber = halamanAktif > jumlahLink ? halamanAktif - jumlahLink : 1;
	let endNumber = halamanAktif < (pageNumbers - jumlahLink) ? halamanAktif + jumlahLink : pageNumbers;

    return (
        <>

            <nav>
                <ul className="pagination">
                    {/* prev */}
                    {halamanAktif > 1 && <p className="page-link prev" onClick={() => paginate(halamanAktif - 1)}>prev</p> }

                    {}

                    {pageNumbers?.map(number => (
                        <li key={number} className="page-item">
                            <p onClick={() => paginate(number)} className="page-link">{number}</p>
                        </li>
                    ))}

                    {/* next */}
                    {halamanAktif < pageNumbers.length && <p className="page-link next" onClick={() => paginate(halamanAktif + 1)}>next</p> }
                </ul>
            </nav>

        </>
    )
}

  export default Pagination