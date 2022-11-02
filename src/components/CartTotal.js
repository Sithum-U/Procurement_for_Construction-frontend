import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { showCart } from '../redux/actions/cartActions';
import axios from "axios";
import { approval } from '../redux/actions/approvalAction';

const CartTotal = () => {
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;
	const cartTotal = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);
	const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [total, setTotal] = useState("");
	const dispatch = useDispatch();
	const closeCart = () => {
		dispatch(showCart(false))
	}

	// const approvalHandle = () => {
	// 	dispatch(approval());
	// }

	const approvalHandle = () => {
        const url = 'http://localhost:5002/cartitems'
        const credentials = { name, price, quantity, total }
        axios.post(url, credentials)
            .then(response => {
                const result = response.data;
                const { status, message } = result;
                if (status !== 'SUCCESS') {
                    dispatch(approval());
                }
                else {
                    alert(message);
                    //window.location.reload();
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
	// console.log(cartItems);
	return (
		<>
			<footer>
				<h3 className="cart-total text-slanted">total : ${cartTotal}</h3>
				{
					cartItems.length > 0 && cartTotal < 100000 ?
						<Link to="/shipping" onClick={closeCart}>
							<button className="cart-checkout btn">checkout</button>
						</Link>
						:
						<div>
								{cartItems ?
									cartItems.map((item) => {
										return (
											<div key={item._id}>
												{/* <input type="id" id="id" defaultValue={item._id} onChange={(e) => setItems(e.target.value)} /> */}
												<input type="text" hidden className="form-control" defaultValue={item.name} onChange={(e) => setName(e.target.value)} />
												<input type="text" hidden className="form-control" defaultValue={item.price} onChange={(e) => setPrice(e.target.value)} />
												<input type="text" hidden className="form-control" defaultValue={item.qty} onChange={(e) => setQuantity(e.target.value)} />
												{/* <input type="text" id="total" defaultValue={item.price} onChange={(e) => setItems(e.target.value)} /> */}
											</div>
										);
									})
									: <div></div>}

								<button className="cart-checkout btn" onClick={approvalHandle} >get approval</button>
							

						</div>
				}
			</footer>
		</>
	)
}

export default CartTotal;