import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import style from "./popUpTrolley.module.css";
import userLog from "../../Actions/userLog";
import { useSelector, useDispatch } from "react-redux";
import getUserOrder from "../../Actions/getUserOrder";
import deleteUserOrderAll from "../../Actions/deleteUSerOrderAll";
import LineOrder from "../LineOrder/LineOrder";
import { Link } from "react-router-dom";
import deleteUserOrderGuest from "../../Actions/deleteUserOrderGuest";
import addToCart from "../../Actions/addToCart";
function PopUpTrolley() {
	const isUserLogged = useSelector((state) => state.isUserLogged);
	const shoppingCart = useSelector((state) => state.shoppingCart);
	const userData = useSelector((state) => state.userData);
	const dispatch = useDispatch();
	const [changed, setChanged] = useState(false);
	const history = useHistory();

	// const [cart, setCart] = useState([]);

	const cart = JSON.parse(localStorage.getItem("cart"));
	const cartRedux = useSelector((state) => state.guestCart);

	// console.log(cart);

	const handleLog = () => {
		dispatch(userLog(true));
	};

	const handleDeleteUserOrderAll = async (idUser) => {
		if (userData.username) {
			await dispatch(deleteUserOrderAll(idUser));
			history.go(0);
		} else {
			localStorage.setItem("cart", JSON.stringify([]));
			dispatch(deleteUserOrderGuest());
		}
	};

	const price = () => {
		var total = 0;
		cart &&
			cart.forEach((line) => {
				total += line.quantity * line.unit_price;
			});
		return total;
	};

	const change = () => {
		setChanged(!changed);
	};

	useEffect(() => {
		if (userData.username) {
			dispatch(getUserOrder(userData.id));
		}
		//EXPERIMENTOOOOOO
		else {
			dispatch({ type: "GET_USER_ORDER_GUEST" });
		}
		//EXPERIMENTOOOOOO
	}, []);

	return (
		<div className={style.mainContainer}>
			<label className={style.myTrolley}>Mi carrito</label>

			<div className={style.container}>
				<div className={style.card}>
					<h3>Imagen</h3>
					<h3>Producto</h3>
					<h3>Cantidad</h3>
					<h3>Eliminar</h3>
					<h3>Valor Unid</h3>
					<h3>SubTotal</h3>
				</div>
			</div>
			{userData.username ? (
				<div className={style.container}>
					{shoppingCart.lineorders &&
						shoppingCart.lineorders.map((elem) => {
							return (
								<LineOrder
									lineOrderElement={elem}
									change={change}
								/>
							);
						})}
				</div>
			) : (
				<div className={style.container}>
					{cartRedux?.length > 0 &&
						cartRedux.map((elem) => {
							return <LineOrder lineOrderElement={elem} />;
						})}
				</div>
			)}

			<div className={style.btnContainer}>
				<h3>
					Precio Total : ${" "}
					{shoppingCart.total_price
						? shoppingCart.total_price
						: price()}
				</h3>
				<button onClick={() => handleDeleteUserOrderAll(userData.id)}>
					Vaciar Carrito
				</button>
				<Link to="/coleccion">
					<button>Regresar a comprar</button>
				</Link>
				{userData.username ? (
					shoppingCart.lineorders ? (
						<button
							onClick={() => alert("Compra Exitosa")}
							className={style.btnPay}
						>
							Pagar
						</button>
					) : (
						<button
							onClick={() =>
								alert(
									"Debe agregar por lo menos un cuadro al carrito"
								)
							}
							className={style.btnPay}
						>
							Pagar
						</button>
					)
				) : (
					<div>
						<Link to="/ingresar">
							<button
								onClick={() => alert("Debe iniciar sesión")}
								className={style.btnPay}
							>
								Pagar
							</button>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}

export default PopUpTrolley;
