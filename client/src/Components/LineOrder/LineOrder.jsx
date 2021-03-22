import React, { useEffect, useState } from "react";
import style from "./lineOrder.module.css";
import userLog from "../../Actions/userLog";
import { useSelector, useDispatch } from "react-redux";
import getUserOrder from "../../Actions/getUserOrder";
import deleteUserOrder from "../../Actions/deleteUserOrder";
import changeQuantity from "../../Actions/changeQuantity.js";
import changeQuantityGuest from "../../Actions/changeQuantityGuest";
import deleteLineOrderGuest from "../../Actions/deteleLineOrderGuest";

export default function LineOrder({ lineOrderElement, change }) {
	const isUserLogged = useSelector((state) => state.isUserLogged);
	const shoppingCart = useSelector((state) => state.shoppingCart);
	const userData = useSelector((state) => state.userData);
	const dispatch = useDispatch();

	const handleDeleteUserOrder = async (idorder, idlineorder, idUser) => {
		if (userData.username) {
			await dispatch(deleteUserOrder(idorder, idlineorder));
			dispatch(getUserOrder(idUser));
		} else {
			let cart = JSON.parse(localStorage.getItem("cart"));
			cart = cart.filter(
				(l) =>
					l.product.id_product !== lineOrderElement.product.id_product
			);
			localStorage.setItem("cart", JSON.stringify(cart));
			dispatch(deleteLineOrderGuest(lineOrderElement.product.id_product));

			// change();
		}
	};

	const handleQuantity = async (idUser, idlineorder, quantity) => {
		if (userData.username) {
			await dispatch(changeQuantity(idUser, idlineorder, quantity));
			dispatch(getUserOrder(idUser));
		} else {
			if (quantity <= lineOrderElement.product.stock && quantity >= 1) {
				let cart = JSON.parse(localStorage.getItem("cart"));
				lineOrderElement.quantity = quantity;
				cart = cart.filter(
					(l) =>
						l.product.id_product !==
						lineOrderElement.product.id_product
				);
				cart.push(lineOrderElement);

				cart.sort(function (a, b) {
					if (a.product.id_product > b.product.id_product) {
						return 1;
					}
					if (a.product.id_product < b.product.id_product) {
						return -1;
					}
					// a must be equal to b
					return 0;
				});
				localStorage.setItem("cart", JSON.stringify(cart));
				// change();
				// console.log(lineOrderElement);
				dispatch(
					changeQuantityGuest(
						lineOrderElement.product.id_product,
						quantity
					)
				);
			}
		}
	};
	//COMENTARIO

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
				<button className={style.btn}>{lineOrderElement.quantity}</button>
				<button className={style.btn}
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
			<div>
			<button className={style.btn}
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
			</div>
			<p className = {style.text}>{lineOrderElement.unit_price}</p>
			<p className = {style.text}>
				{lineOrderElement.quantity * lineOrderElement.unit_price < 0
					? 0
					: lineOrderElement.quantity * lineOrderElement.unit_price}
			</p>
		</div>
	);
}
