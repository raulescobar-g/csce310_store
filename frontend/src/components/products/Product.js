// import Image from "../nillkin-case-1.jpg";
import Image from "./no_image.webp";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFromStorage } from "../../utils/localStorage";

function Product(props) {
  const price = props.product_price;
  const { setCart, cart } = props 
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
        <del>{price}Ks</del> {price - (props.percentOff * price) / 100}Ks
      </>
    );
  }

  const addToCart = async (e) => {
    const user_id = getFromStorage('user_id')

    const data = {
      "user_id": user_id,
      "product_id": e.target.id
    }
    
    const options = {
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
  }
    const new_cart = await fetch('http://localhost:5000/carts/', options)
    const jsoned = await new_cart.json()
    setCart(jsoned.cart)

  }

  return (
    <div className="col">
      <div className="card shadow-sm">
        <Link to={`/products/${props.product_id}`} state={props} href="!#" replace>
          {percentOff}
          <img
            className="card-img-top bg-dark cover"
            height="200"
            alt=""
            src={props.imagelink}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title text-center text-dark text-truncate">
            {props.product_name}
          </h5>
          <p className="card-text text-center text-muted mb-0">{offPrice}</p>
          <div className="d-grid d-block">
            <button id={props.product_id} onClick={addToCart} className="btn btn-outline-dark mt-3">
              <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
