// component
import DescriptionDownload from "../../../components/description_download/DescriptionDownload";
import DetailImage from "../../../components/detailImage/DetailImage";

// css
import "./DetailBook.scss";
// --------------------------------------------

const DetailBook = () => {
  return (
    <>
      <div className="container-detail-book">
        <DetailImage />
        <DescriptionDownload />
      </div>
    </>
  );
};

export default DetailBook;
