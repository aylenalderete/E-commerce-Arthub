import React, { useEffect, useState } from "react";
import style from "./lineorder.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addItem, deleteItem, reduceQuantity } from './../../Actions/shoppingCart';

export default function LineOrder({ lineOrderElement, setSubTotal }) {

	const [subTotalLineOrders, setSubTotalLineOrders] = useState([]);
	let cart = useSelector((state) => state.cart);
	// console.log('CART DE REDUX', cart)

	const handleSetSubTotal = () => {
		setSubTotalLineOrders(cart.map(p => p.quantity * p.product.price));
	}
	// const isUserLogged = useSelector((state) => state.isUserLogged);
	// const shoppingCart = useSelector((state) => state.shoppingCart);
	// const userData = useSelector((state) => state.userData);
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	handleSetSubTotal();
	// }, [subTotalLineOrders])


	return (
		<div className={style.card}>
			<img
				className={style.imagen}
				src={
					lineOrderElement.product &&
					lineOrderElement.product.images[0].url
				}
			/>
			<p className={style.p}>{lineOrderElement.product && lineOrderElement.product.title}</p>

			<div>
				<button onClick={() => { dispatch(reduceQuantity(lineOrderElement.product.id_product)) }} className={style.btn}
				>
					-
				</button>
				<p className={style.btn}>{lineOrderElement.quantity}</p>
				<button onClick={() => { dispatch(addItem(lineOrderElement.product.id_product)) }} className={style.btn}
				>
					+
				</button>
			</div>
			<div>
				<button onClick={() => { dispatch(deleteItem(lineOrderElement.product.id_product)) }} className={style.btn}
				>
					X
			</button>
			</div>
			<p className={style.text}>{lineOrderElement.unit_price}</p>
			{
				// <p>{subTotalLineOrders}</p>
			}

		</div>
	);
}
