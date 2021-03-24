import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LineOrder from "../LineOrder/LineOrder";
import { getOrCreateCart } from './../../Actions/shoppingCart';


function ShoppingCart() {

	let cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	const [carrito2, setCarrito2] = useState(cart)

	const [total, setTotal] = useState(0);
	// const [subTotal, setSubTotal] = useState([]);


	// const handleSetTotal = () => {
	// 	let sum = subTotal.reduce((acc, sub) => acc + sub, 0);
	// 	console.log(sum);
	// 	setTotal(sum);
	// }

	// useEffect(() => {
	// 	handleSetTotal();
	// }, [cart])

	// if (cart[0]) {
	return (
		<div>
			{
				cart.map(p => <LineOrder lineOrderElement={p} ></LineOrder>)
			}

			<div>
				<p>Total:{total}</p>
			</div>

		</div >

	);
	// }
}

export default ShoppingCart;
