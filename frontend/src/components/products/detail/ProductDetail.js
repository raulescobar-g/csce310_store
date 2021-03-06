// import Image from "../../nillkin-case-1.jpg";
import Image from "../no_image.webp";
import RelatedProduct from "./RelatedProduct";
import Ratings from "react-ratings-declarative";
import { Link, useParams } from "react-router-dom";
import ScrollToTopOnMount from "../../template/ScrollToTopOnMount";
import { useState, useEffect } from "react";
import ReviewList from "../../reviews/ReviewList";
import { getFromStorage } from "../../../utils/localStorage";

const iconPath =
  "M18.571 7.221c0 0.201-0.145 0.391-0.29 0.536l-4.051 3.951 0.96 5.58c0.011 0.078 0.011 0.145 0.011 0.223 0 0.29-0.134 0.558-0.458 0.558-0.156 0-0.313-0.056-0.446-0.134l-5.011-2.634-5.011 2.634c-0.145 0.078-0.29 0.134-0.446 0.134-0.324 0-0.469-0.268-0.469-0.558 0-0.078 0.011-0.145 0.022-0.223l0.96-5.58-4.063-3.951c-0.134-0.145-0.279-0.335-0.279-0.536 0-0.335 0.346-0.469 0.625-0.513l5.603-0.815 2.511-5.078c0.1-0.212 0.29-0.458 0.547-0.458s0.446 0.246 0.547 0.458l2.511 5.078 5.603 0.815c0.268 0.045 0.625 0.179 0.625 0.513z";

function ProductDetail(props) {
  function changeRating(newRating) {}
  
  const { cart, setCart } = props

  const [state2, setState2] = useState({ items: [] });
  const [state, setState] = useState({});
  const [user_id, setUserId] = useState();

  const { slug } = useParams();

  useEffect( () => { 
    fetch('http://localhost:5000/products/getrandomproducts/')
      .then(response => response.json())
      .then(_data => {
        setState2({ items: _data})
        setState(_data.find(p => p.product_id == slug))
      }); 
      setUserId(getFromStorage('user_id'))
  }, [])

    const addToCart = async (e) => {
  
      const data = {
        "user_id": user_id,
        "product_id": slug
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
      console.log(jsoned)
      setCart(jsoned.cart)
  
    }

  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount/>
      <nav aria-label="breadcrumb" className="bg-custom-light rounded mb-4">
        <ol className="breadcrumb p-3">
          <li className="breadcrumb-item">
            <Link className="text-decoration-none link-secondary" to="/products">
              All Prodcuts
            </Link>
          </li>
          <li className="breadcrumb-item">
            <a className="text-decoration-none link-secondary" href="!#">
              Cases &amp; Covers
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {state?.product_name}
          </li>
        </ol>
      </nav>
      <div className="row mb-4">
        <div className="d-none d-lg-block col-lg-1">
          <div className="image-vertical-scroller">
            <div className="d-flex flex-column">
              {Array.from({ length: 10 }, (_, i) => {
                let selected = i !== 1 ? "opacity-6" : "";
                return (
                  <a key={i} href="!#">
                    <img
                      className={"rounded mb-2 ratio " + selected}
                      alt=""
                      src={state?.imagelink}
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-12 mb-4">
              <img
                className="border rounded ratio ratio-1x1"
                alt=""
                src={state?.imagelink}
              />
            </div>
          </div>

          {/* <div className="row mt-2">
            <div className="col-12">
              <div
                className="d-flex flex-nowrap"
                style={{ overflowX: "scroll" }}
              >
                {Array.from({ length: 8 }, (_, i) => {
                  return (
                    <a key={i} href="!#">
                      <img
                        className="cover rounded mb-2 me-2"
                        width="70"
                        height="70"
                        alt=""
                        src={Image}
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div> */}
        </div>

        <div className="col-lg-5">
          <div className="d-flex flex-column h-100">
            <h2 className="mb-1">{state?.product_name}</h2>
            <h4 className="text-muted mb-4">${state?.product_price}</h4>

            <div className="row g-3 mb-4">
              <div className="col">
                <button id={state?.product_id} className="btn btn-outline-dark py-2 w-100" onClick={addToCart}>
                  Add to cart
                </button>
              </div>
              <div className="col">
                <a style={{textDecoration:"none"}} href="/payment" ><button className="btn btn-dark py-2 w-100">Buy now</button></a>
              </div>
            </div>

            <h4 className="mb-0">Details</h4>
            <hr />
            <dl className="row">
              <dt className="col-sm-4">Product Id</dt>
              <dd className="col-sm-8 mb-3">{state?.product_id}</dd>

              {/* <dt className="col-sm-4">Category</dt>
              <dd className="col-sm-8 mb-3">Cases & Covers</dd> */}

              <dt className="col-sm-4">Brand</dt>
              <dd className="col-sm-8 mb-3">{state?.product_brand}</dd>

              <dt className="col-sm-4">Manufacturer</dt>
              <dd className="col-sm-8 mb-3">{state?.manufacturer}</dd>

              <dt className="col-sm-4">Color</dt>
              <dd className="col-sm-8 mb-3">Red, Green, Blue, Pink</dd>

              <dt className="col-sm-4">Status</dt>
              <dd className="col-sm-8 mb-3">Instock</dd>

              <dt className="col-sm-4">Rating</dt>
              <dd className="col-sm-8 mb-3">
                <Ratings
                  rating={4.5}
                  widgetRatedColors="rgb(253, 204, 13)"
                  changeRating={changeRating}
                  widgetSpacings="2px"
                >
                  {Array.from({ length: 5 }, (_, i) => {
                    return (
                      <Ratings.Widget
                        key={i}
                        widgetDimension="20px"
                        svgIconViewBox="0 0 19 20"
                        svgIconPath={iconPath}
                        widgetHoverColor="rgb(253, 204, 13)"
                      />
                    );
                  })}
                </Ratings>
              </dd>
            </dl>

            <h4 className="mb-0">Description</h4>
            <hr />
            <p className="lead flex-shrink-0">
              <small>
                {state?.product_description}
              </small>
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 mb-4">
          <hr />
          <h4 className="text-muted my-4">Related products</h4>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
            {/* {Array.from({ length: 4 }, (_, i) => {
              return (
                <RelatedProduct key={i} percentOff={i % 2 === 0 ? 15 : null} />
              );
            })} */}

            {state2.items.map((item) => {
              return (
                <RelatedProduct key={item.product_id} {...item} percentOff={item.product_id % 2 === 0 ? 15 : null} />
              );
            })}
          </div>
        </div>
      </div>
      <div>
        <ReviewList key={state.product_id} props={state.product_id}/>
      </div>
    </div>
  );
}

export default ProductDetail;
