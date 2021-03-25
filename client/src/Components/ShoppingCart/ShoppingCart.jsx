import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LineOrder from "../LineOrder/LineOrder";
import { emptyCart } from './../../Actions/shoppingCart';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


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
				let confirm = window.confirm('¿Desea confirmar su compra?');
				if (confirm) {
					axios.post(`http://localhost:3001/users/${id}/newcart`, { cart: cartL }).catch(err => console.log(err))
						.then(() => {

							localStorage.setItem('cart', JSON.stringify([]));
							dispatch(emptyCart());
							history.push('/coleccion');

						})
				}
			}
		}
	}

	useEffect(() => {
		setTotal(cart.reduce((acc, current) => acc += current.subTotal, 0))
	}, [cart])

	return (
		<div>
			{
				cart.map(p => <LineOrder lineOrderElement={p} ></LineOrder>)
			}

			<div>
				<p>Total: {total}</p>
			</div>

			<button onClick={() => history.push('/coleccion')}>Seguir comprando</button>

			<button onClick={() => dispatch(emptyCart())}>Vaciar carrito</button>

			<button onClick={() => handlePayment()}>Confirmar</button>


		</div >

	);
}

export default ShoppingCart;
