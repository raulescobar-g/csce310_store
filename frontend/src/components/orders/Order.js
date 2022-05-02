import Image from "../nillkin-case-1.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFromStorage } from "../../utils/localStorage";
import { useNavigate } from 'react-router-dom'

function Order(order, setOrder) {
  const nav = useNavigate()
  console.log(order)
  
  //need order number, userID, ProductID, PaymentID
  const updateOrder = async (e, amount) => {
    try{
        const user_id = getFromStorage('user_id');
        const order_num = getFromStorage('order_num')
        const product_id = getFromStorage('product_id')
        const payment_id = getFromStorage('payment_id')
        const options = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "user_id": user_id,
                "order_num": order_num,
                "product_id": product_id,
                "payment_id": payment_id

            })
        }
        const _ = await fetch("http://localhost:5000/orders/", options)

        const new_order_item = await fetch(`http://localhost:5000/orders/${user_id}`)
        const jsoned = await new_order_item.json()
        setOrder(jsoned.order)
    } catch (e) {
        console.log(e)
    }
}

  const price = 10000;
  let percentOff;
  let offPrice = `${price}Ks`;


  return (
    <div className="col">
      <div className="card shadow-sm">
        <Link to="/orders/1" href="!#" replace>
          <img
            className="card-img-top bg-dark cover"
            height="200"
            alt=""
            src={Image}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title text-center text-dark text-truncate">
            Nillkin iPhone X cover
          </h5>
          <p className="card-text text-center text-muted mb-0"></p>
          <div className="d-grid d-block">
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
