// components
import { useQuery, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../popup/Popup";

// components react bootstrap
import { Button, Image } from "react-bootstrap";

// api
import { API } from "../../config/api";

// scss
import "./DescriptionIncrement.scss";
import Swal from "sweetalert2";

// image
import bracket from "../../assets/img/white-bracket.png";

const DescriptionIncrement = () => {
  const navigate = useNavigate();

  let { id } = useParams();
  id = parseInt(id);

  // state popup
  const [popup, setPopup] = useState(false);

  // query data book by id
  let { data: detailBookDescription, refetch: refetchBracket } = useQuery(
    "bookDetailDescriptionCache",
    async () => {
      const response = await API.get(`/book/${id}`);
      return response.data.data;
    }
  );

  const handleAddCart = useMutation(async (e) => {
    e.preventDefault();

    const config = {
      headers: { "Content-type": "application/json" },
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    const dataBook = {
      book_id: detailBookDescription.id,
    };

    console.log(dataBook);
    const body = JSON.stringify(dataBook);

    let token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        text: "Please login account",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      navigate("/");
    } else {
      const response = await API.post("/cart", body, config);
      if (response.data.code === 200) {
        setPopup(true);
      }
      refetchBracket();
    }
  });

  return (
    <>
      <Popup popup={popup} setPopup={setPopup} />
      <div className="desc-container">
        <h4 className="detail-title-desc">About This Book</h4>
        <div className="detail-desc">
          <p className="detail-desc-info">
            {detailBookDescription?.description}
          </p>
          <br />
          <div className="btn-cart">
            <Button
              type="submit"
              className="button-cart"
              onClick={(e) => {
                handleAddCart.mutate(e);
              }}
            >
              <Image src={bracket} className="img-bracket" /> Add cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DescriptionIncrement;
