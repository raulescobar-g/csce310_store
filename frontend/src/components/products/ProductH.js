// Written by David Hung
import Image from "../nillkin-case-1.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFromStorage } from "../../utils/localStorage";

function ProductH(props) {
  const price = props.product_price;
  const { setCart, cart } = props 
  let percentOff;
  let offPrice = `$${price}`;

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

  if (props.percentOff && props.percentOff > 0) {
    percentOff = (
      <div
        className="badge bg-dim py-2 text-white position-absolute"
        style={{ top: "0.5rem", left: "0.5rem" }}
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
  return (
    <div className="col">
      <div className="card shadow-sm">
        <div className="row g-0">
          <div className="col-4">
            <Link to="/products/1" href="!#" replace>
              {percentOff}
              <img
                className="rounded-start bg-dark cover w-100 h-100"
                alt=""
                src={props.imagelink}
              />
            </Link>
          </div>
          <div className="col-8">
            <div className="card-body h-100">
              <div className="d-flex flex-column h-100">
                <h5 className="card-title text-dark text-truncate mb-1">
                  {props.product_name}
                </h5>
                <span className="card-text text-muted mb-2 flex-shrink-0">
                  {offPrice}
                </span>
                <div className="mt-auto d-flex">
                  <button id={props.product_id} className="btn btn-outline-dark ms-auto" onClick={addToCart}>
                    <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductH;
