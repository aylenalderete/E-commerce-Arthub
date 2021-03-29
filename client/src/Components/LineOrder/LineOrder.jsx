import React, { useEffect, useState } from "react";
import style from "./lineOrder.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addItem, deleteItem, reduceQuantity } from './../../Actions/shoppingCart';

export default function LineOrder({ lineOrderElement }) {

	const dispatch = useDispatch();

	return (
		<div className={style.card}>
			<div className={style.imgContainer}>

				<img
					className={style.image}
					src={
						lineOrderElement.product &&
						lineOrderElement.product.images[0].url
					}
				/>
			</div>
			<div className={style.info}>

				<h2 className={style.title}>{lineOrderElement.product && lineOrderElement.product.title}</h2>

				<p className={style.price}>Precio: ${lineOrderElement.product.price}</p>
				<div className={style.quantity}>
					<button onClick={() => { dispatch(reduceQuantity(lineOrderElement.product.id_product)) }} className={style.btn}>-</button>
					<p>{lineOrderElement.quantity}</p>
					<button onClick={() => { dispatch(addItem(lineOrderElement.product.id_product)) }} className={style.btn}>+</button>
				</div>

				<button onClick={() => { dispatch(deleteItem(lineOrderElement.product.id_product)) }} className={`${style.btn} ${style.close}`}>X</button>

				<p>Subtotal: ${lineOrderElement.subTotal}</p>
			</div>


		</div>
	);
}
