import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  createOrder,
  processPayment,
  createCartOrder,
} from "../redux/actions/orderActions";
import { v4 as uuid } from 'uuid';
import { showCart } from "../redux/actions/cartActions";
import axios from "axios";
import { approval } from "../redux/actions/approvalAction";

const CartTotal = () => {
  const history = useHistory();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const cartTotal = cartItems
    .reduce((a, i) => a + i.qty * i.price, 0)
    .toFixed(2);
  const totalPrice = cartTotal;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [total, setTotal] = useState("");
  const userInfo = useSelector((state) => state.userPanelLogin.userInfo.data);
  const user = userInfo[0]._id;
  const dispatch = useDispatch();
  const closeCart = () => {
    dispatch(showCart(false));
  };

  const cartItems1 = useSelector((state) => state.cart.cartItems);
  console.log(cartItems1);
  const orderItems = [];
  const unique_id = uuid();
  const small_id = unique_id.slice(0,8)
  if (cartItems1) {
    const cartItemsList = cartItems1.map((product) => {
      const { name, qty, image, price, id } = product;
      orderItems.push({
        name,
        qty,
        image,
        price,
        product: id,
      });
    });
  }

  const [approval, setApproval] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (orderItems) {
      dispatch(createCartOrder({ orderItems, totalPrice, user, small_id }));
      history.push("/");
      // console.log(orderItems);
       console.log(localStorage.getItem("cartInfo"));
    }
  };
  
  return (
    <>
      <footer>
        <h3 className="cart-total text-slanted">total : Rs. {cartTotal}</h3>
        {cartItems.length >= 0 && cartTotal < 100000 ? (
          <Link to="/shipping" onClick={closeCart}>
            <button className="cart-checkout btn">checkout</button>
          </Link>
        ) : (
          <form onSubmit={handleSubmit}>
            <button type="submit" className="cart-checkout btn">
              get approval
            </button>
          </form>
        )}
      </footer>
    </>
  );
};

export default CartTotal;
