import React, { useEffect, useState } from "react";
import style from "./lineOrder.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addItem, deleteItem, reduceQuantity } from './../../Actions/shoppingCart';
import getInitialProducts from '../../Actions/getInitialProducts';

export default function LineOrder({ lineOrderElement }) {

	const dispatch = useDispatch();
	const products = useSelector(state => state.products);

	const [productFiltered, setProductFiltered] = useState({});
	let offers = useSelector((state) => state.offers);

	const [isInOffer, setIsInOffer] = useState(false);
	const [discount, setDiscount] = useState(0);


	useEffect(() => {
		dispatch(getInitialProducts());

		offers.forEach(o => {
			lineOrderElement.product.categories.forEach(c => {
				if (o.categoryId === c.id) {	
					setIsInOffer(true);												
					setDiscount(o.discount);
				}
			})
		})

	}, [offers])


	useEffect(() => {
		let found = products.find(prod => prod.id_product === lineOrderElement.product.id_product);
		if (found) {
			setProductFiltered(found);
		}
	}, [products])

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

				{
					isInOffer
						?
						<div>
							<p className={style.priceDefault}>Precio: ${productFiltered?.price}</p>
							<p className={style.priceDiscount}>Precio: ${lineOrderElement.product.price} <span className={style.discount}>({discount}% off)</span></p>
						</div>

						:
						<div>
							<p className={style.price}>Precio: ${lineOrderElement.product.price}</p>
						</div>
				}


				<div className={style.quantity}>
					<button onClick={() => { dispatch(reduceQuantity(lineOrderElement.product.id_product)) }} className={style.btn}>-</button>
					<p>{lineOrderElement.quantity}</p>
					<button onClick={() => { dispatch(addItem(lineOrderElement.product.id_product)) }} className={style.btn}>+</button>
				</div>

				<button onClick={() => { dispatch(deleteItem(lineOrderElement.product.id_product)) }} className={`${style.btn} ${style.close}`}>X</button>

			</div>


		</div>
	);
}
