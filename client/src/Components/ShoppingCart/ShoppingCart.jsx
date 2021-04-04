import React, { useEffect, useState } from "react";
import style from "./shoppingcart.module.css";
import { useSelector, useDispatch } from "react-redux";
import LineOrder from "../LineOrder/LineOrder";
import { emptyCart } from './../../Actions/shoppingCart';
import { useHistory, Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

function ShoppingCart() {

	let cart = useSelector((state) => state.cart);
	let { id } = useSelector((state) => state.userData);
	let offers = useSelector((state) => state.offers);
	const cartL = JSON.parse(localStorage.getItem("cart"));
	const dispatch = useDispatch();
	const history = useHistory();

	const [total, setTotal] = useState(0);

	const handlePayment = () => {
		//toda la logica futura para un pago
		if (!localStorage.getItem('token')) {
			alert('Debe iniciar sesion')
			history.push('/ingresar');
		} else {
			if (cartL.length > 0) {
				// let confirm = window.confirm('¿Desea confirmar su compra?');
				// if (confirm) {
				history.push('/pago');
				// axios.post(`http://localhost:3001/users/${id}/newcart`, { cart: cartL }).catch(err => console.log(err))
				// .then(() => {

				// localStorage.setItem('cart', JSON.stringify([]));
				// dispatch(emptyCart());

				// })
				// }
			}
		}
	}

	useEffect(() => {
		setTotal(cart.reduce((acc, current) => acc += current.subTotal, 0))
	}, [cart])

	return (
		<div className={style.mainContainer}>
			<NavBar renderTop={false} />

			<div className={style.secondContainer}>

				<h1 className={style.title}>Paso 1: Detalle del carrito</h1>
				{
					cart.length > 0
						?
						<div className={style.container}>
							<div className={style.cards}>

								{
									cart.map(p => <LineOrder lineOrderElement={p} ></LineOrder>)
								}
							</div>
							<div className={style.info}>

								<div>
									
									<p className={style.total}>Subtotal: ${total}</p>
									<p className={style.discount}>Descuento: </p>
									<p className={style.total}>Total: </p>

								</div>




								<button className={`${style.btn} ${style.p}`} onClick={() => history.push('/coleccion')}>Volver</button>

								<button className={`${style.btn} ${style.p}`} onClick={() => dispatch(emptyCart())}>Vaciar carrito</button>

								<button className={`${style.btn} ${style.p}`} onClick={() => handlePayment()}>Continuar</button>
							</div>


						</div >
						:
						<div className={style.noProductsMessage}>
							<p>No hay productos en tu carrito, elige algunos de <Link to="/coleccion"> nuestra colección</Link>
							</p>
						</div>
				}
			</div>
		</div>
	);
}

export default ShoppingCart;
