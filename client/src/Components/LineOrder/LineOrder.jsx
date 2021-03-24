import React, { useEffect, useState } from "react";
import style from "./lineorder.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addItem, deleteItem, reduceQuantity } from './../../Actions/shoppingCart';

export default function LineOrder({ lineOrderElement }) {

	const dispatch = useDispatch();

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
				<p>{lineOrderElement.subTotal}</p>
			}

		</div>
	);
}
