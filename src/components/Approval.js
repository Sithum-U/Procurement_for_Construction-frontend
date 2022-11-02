import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NavBar from './Navbar';
import './order.css';
import CartProduct from './CartProduct';
import { showCart } from '../redux/actions/cartActions';
import CartTotal from './CartTotal';

function Approval() {

    // const showCartStatus = useSelector((state) => state.cart.showCart);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const closeCart = () => {
        dispatch(showCart(false))
    }
    console.log(cartItems);
    return (
        <div className="container-scroller">
            <NavBar />
            <div className="container-fluid page-body-wrapper">
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row">
                            <div className="col-lg-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <div className="card">
                                                    <div className="card-body main-lable">
                                                        <article className="icontext align-items-start">
                                                            <span className="icon icon-sm rounded-circle alert-success"><i className="text-success fa fa-user" /></span>
                                                            <div className="text">
                                                                <h5 className="card-title mb-2">Site Manager</h5>
                                                                {/* <p className="mb-1">{order.shippingAddress && order.shippingAddress.customer_name} <br /><a href="mailto:{data[0].email}">{data[0].email}</a></p> */}
                                                            </div>
                                                        </article>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="float-right mr-5">

                                        </div>
                                        <p className="card-description">
                                        </p>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th scope="col">Title</th>
                                                        <th scope="col">Image</th>
                                                        <th scope="col">Price</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cartItems ?
                                                        cartItems.map((item) => {
                                                            return (
                                                                <tr key={item._id}>
                                                                    <td>{item.name}</td>
                                                                    <td><img
                                                                        src={`${item.image}`}
                                                                        alt="..."

                                                                        height="100 px" width="100px"
                                                                    /></td>
                                                                    <td>{item.price}</td>
                                                                    <td>{item.qty}</td>
                                                                    <td>
                                                                        <div className="row">
                                                                                <div className="clearfix mb-4">
                                                                                    <div class="dropdown float-right">
                                                                                        <button class="dropbtn">Status</button>
                                                                                        <div class="dropdown-content">
                                                                                            <a href="#">Pending</a>
                                                                                            <a href="#">Approved</a>
                                                                                            <a href="#">Declined</a>
                                                                                            <a href="#">Placed</a>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })
                                                        : <div></div>}

                                                </tbody>

                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Approval;