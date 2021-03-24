import React, { useEffect, useState } from "react";
import style from "./lineOrder.module.css";
import { useSelector, useDispatch } from "react-redux";

export default function LineOrder({ lineOrderElement, change }) {

	// const isUserLogged = useSelector((state) => state.isUserLogged);
	// const shoppingCart = useSelector((state) => state.shoppingCart);
	// const userData = useSelector((state) => state.userData);
	// const dispatch = useDispatch();


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
				<button className={style.btn}
				// onClick={() =>
				// 	// handleQuantity(
				// 	// 	userData.id,
				// 	// 	lineOrderElement.id_line,
				// 	// 	lineOrderElement.quantity - 1
				// 	// )
				// }
				>
					-
				</button>
				<button className={style.btn}>{lineOrderElement.quantity}</button>
				<button className={style.btn}
				// onClick={() =>
				// 	handleQuantity(
				// 		userData.id,
				// 		lineOrderElement.id_line,
				// 		lineOrderElement.quantity + 1
				// 	)
				// }
				>
					+
				</button>
			</div>
			<div>
				<button className={style.btn}
				// onClick={() =>
				// 	handleDeleteUserOrder(
				// 		shoppingCart.id_order,
				// 		lineOrderElement.id_line,
				// 		userData.id
				// 	)
				// }
				>
					X
			</button>
			</div>
			<p className={style.text}>{lineOrderElement.unit_price}</p>
			{/* <p className = {style.text}>
				{lineOrderElement.quantity * lineOrderElement.unit_price < 0
					? 0
					: lineOrderElement.quantity * lineOrderElement.unit_price}
			</p> */}
		</div>
	);
}
