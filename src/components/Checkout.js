import React from "react";
import { Link } from "react-router-dom";

function Checkout(props) {
  return (
    <>
      <div className="Checkout">
        <h5>OOPS, not ready to checkout yet! </h5>
        <Link to="/">Back to Shopping</Link>
        <br />
        <br />
        <h4>Pay with Card</h4>
        <form className="checkoutForm">
          <label>
            <input type="text" placeholder="Cardholder Name" />
          </label>
          <br />
          <label>
            <input type="text" placeholder="Card Number" />
          </label>
          <br />
          <label>
            <input type="text" placeholder="Exp. Date (MM/YY)" />
          </label>
          <br />
          <label>
            <input type="text" placeholder="CVV" />
          </label>
          <br />
          <label>
            <input type="text" placeholder="Billing Address" />
          </label>
          <br />
          <label>
            <input type="text" name="name" placeholder="City" />
          </label>
          <br />
          <label>
            <input type="text" placeholder="State" />
          </label>
          <br />
          <label>
            <input type="text" placeholder="ZIP/Postal Code" />
          </label>
          <br />
          <button>Click to Secure the Bag!</button>
        </form>
      </div>
    </>
  );
}

export default Checkout;
