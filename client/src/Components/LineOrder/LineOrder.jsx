import React, { useEffect, useState } from "react";
import style from "./lineOrder.module.css";
import userLog from "../../Actions/userLog";
import { useSelector, useDispatch } from "react-redux";
import getUserOrder from "../../Actions/getUserOrder";
import deleteUserOrder from "../../Actions/deleteUserOrder";
import changeQuantity from "../../Actions/changeQuantity.js";
export default function LineOrder({ lineOrderElement }) {
	const isUserLogged = useSelector((state) => state.isUserLogged);
	const shoppingCart = useSelector((state) => state.shoppingCart);
	const userData = useSelector((state) => state.userData);
	const dispatch = useDispatch();
	const handleDeleteUserOrder = async (idorder, idlineorder, idUser) => {
		await dispatch(deleteUserOrder(idorder, idlineorder));
		dispatch(getUserOrder(idUser));
	};
	const handleQuantity = async (idUser, idlineorder, quantity) => {
		await dispatch(changeQuantity(idUser, idlineorder, quantity));
		dispatch(getUserOrder(idUser));
	};

	console.log(lineOrderElement);
	return (
		<div className={style.card}>
			<img
				className={style.imagen}
				src={
					lineOrderElement.product &&
					lineOrderElement.product.images[0].url
				}
			/>
			<p>{lineOrderElement.product && lineOrderElement.product.title}</p>

			<div>
				<button
					onClick={() =>
						handleQuantity(
							userData.id,
							lineOrderElement.id_line,
							lineOrderElement.quantity - 1
						)
					}
				>
					-
				</button>
				<button>{lineOrderElement.quantity}</button>
				<button
					onClick={() =>
						handleQuantity(
							userData.id,
							lineOrderElement.id_line,
							lineOrderElement.quantity + 1
						)
					}
				>
					+
				</button>
			</div>
			<button
				onClick={() =>
					handleDeleteUserOrder(
						shoppingCart.id_order,
						lineOrderElement.id_line,
						userData.id
					)
				}
			>
				X
			</button>
			<p>{lineOrderElement.unit_price}</p>
			<p>
				{lineOrderElement.quantity * lineOrderElement.unit_price < 0
					? 0
					: lineOrderElement.quantity * lineOrderElement.unit_price}
			</p>
		</div>
	);
}
