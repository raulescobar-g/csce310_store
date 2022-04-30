import Image from "../../nillkin-case-1.jpg";
import { Link } from "react-router-dom";

function RelatedProduct(props) {
  const price = props.product_price;
  let percentOff;
  let offPrice = `$${price}`;

  if (props.percentOff && props.percentOff > 0) {
    percentOff = (
      <div
        className="badge bg-dim py-2 text-white position-absolute"
        style={{ top: "0.5rem", right: "0.5rem" }}
      >
        {props.percentOff}% OFF
      </div>
    );

    offPrice = (
      <>
        <del>${price}</del> ${Math.round(price - (props.percentOff * price) / 100,2)}
      </>
    );
  }

  return (
    <Link
      to="/products/1"
      className="col text-decoration-none"
      href="!#"
      replace
    >
      <div className="card shadow-sm">
        {percentOff}
        <img
          className="card-img-top bg-dark cover"
          height="200"
          alt=""
          src={props.imagelink}
        />
        <div className="card-body">
          <h5 className="card-title text-center text-dark text-truncate">
            {props.product_name}
          </h5>
          <p className="card-text text-center text-muted">{offPrice}</p>
        </div>
      </div>
    </Link>
  );
}

export default RelatedProduct;
