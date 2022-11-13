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
	// console.log(cartItems1);
	const orderItems = [];
	const unique_id = uuid();
	const small_id = unique_id.slice(0, 8)
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
	console.log(cartItems);
	console.log(cartItems1);
	const [approval, setApproval] = useState([]);
	useEffect(async () => {
		const responseData = await axios.get(`/cartitems/all`);
		console.log(responseData);
		const data = responseData.data;
		setApproval(data.data);
	}, []);
	// console.log(approval[0].isApproved);
	let i = 0;
	// for (i = 0; i < 20; i++) {
	// 	if (approval[i].isApproved = true) {
	// 		console.log("isApproved sss true")
	// 	} else {
	// 		console.log("isApproved ss false")
	// 	}

	// }
	// console.log(approval.isApproved);
	// console.log(small_id)
	const handleSubmit = async (e) => {
		console.log(e.currentTarget.id);
		e.preventDefault();
		if (orderItems) {
			dispatch(createCartOrder({ orderItems, totalPrice, user, small_id }));
			history.push("/");
			// console.log(orderItems);
			// console.log(localStorage.getItem("cartInfo"));
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

						<button type="submit" id="testSithum" className="cart-checkout btn">
							<Link to="/shipping" onClick={closeCart} style={{ color: "white" }}>You'r order got Approved</Link>
							{/* Get Approval */}
						</button>


					</form>
				)}
			</footer>
		</>
	);
};

export default CartTotal;
