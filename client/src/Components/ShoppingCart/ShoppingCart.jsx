import React, { useEffect, useState } from "react";
import style from "./shoppingcart.module.css";
import { useSelector, useDispatch } from "react-redux";
import LineOrder from "../LineOrder/LineOrder";
import { emptyCart } from './../../Actions/shoppingCart';
import { useHistory, Link } from 'react-router-dom';

function ShoppingCart() {

	let cart = useSelector((state) => state.cart);
	let { id } = useSelector((state) => state.userData);
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
		<div>

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
								<form>
									<label className={style.labelInput} htmlFor="discount">Ingrese cupon de descuento: </label>
									<input className={style.input} id='discount' type="text" />
									<button className={style.btn} type="submit">Calcular</button>
								</form>
							</div>


							<p className={style.total}>Subtotal: ${total}</p>


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
	);
}

export default ShoppingCart;
