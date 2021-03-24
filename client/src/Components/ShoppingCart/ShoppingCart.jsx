import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LineOrder from "../LineOrder/LineOrder";
import { emptyCart } from './../../Actions/shoppingCart';
import { useHistory } from 'react-router-dom';


function ShoppingCart() {

	let cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const history = useHistory();

	const [total, setTotal] = useState(0);

	const handlePayment = () => {
		if (!localStorage.getItem('jwt')) {
			alert('Debe iniciar sesion')
			history.push('/ingresar');
		};
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

			<button onClick={() => handlePayment()}>pagar</button>


		</div >

	);
}

export default ShoppingCart;
