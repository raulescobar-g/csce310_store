import Image from "../nillkin-case.webp";
import { Link } from "react-router-dom";

function FeatureProduct(props) {
  return (
    <div className="col">
      <div className="card shadow-sm">
        <img
          className="card-img-top bg-dark cover"
          height="240"
          alt=""
          src={props.imagelink}
        />
        <div className="card-body">
          <h5 className="card-title text-center">{props.product_name}</h5>
          <p className="card-text text-center text-muted">${props.product_price}</p>
          <div className="d-grid gap-2">
            <Link to={`/products/${props.product_id}`} state={props} className="btn btn-outline-dark" replace>
              Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureProduct;
