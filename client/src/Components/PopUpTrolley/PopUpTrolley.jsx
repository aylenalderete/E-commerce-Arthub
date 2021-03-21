import React, { useEffect, useState } from "react";
import style from "./popUpTrolley.module.css";
import userLog from "../../Actions/userLog";
import { useSelector, useDispatch } from "react-redux";
import getUserOrder from "../../Actions/getUserOrder";
import deleteUserOrderAll from '../../Actions/deleteUSerOrderAll'
import LineOrder from "../LineOrder/LineOrder";
import { Link } from 'react-router-dom'

function PopUpTrolley() {
    const isUserLogged = useSelector((state) => state.isUserLogged);
    const shoppingCart = useSelector((state) => state.shoppingCart);
    const userData = useSelector((state) => state.userData);
    const dispatch = useDispatch();
    const cart = JSON.parse(localStorage.getItem('cart'));
    // console.log(cart);

    const handleLog = () => {
        dispatch(userLog(true));
    };

    const handleDeleteUserOrderAll = async (idUser) => {
        if (userData.username) {
            await dispatch(deleteUserOrderAll(idUser));

        } else {
            localStorage.removeItem('cart');
        }
    };

    const price = () => {
        var total = 0;
        cart && cart.forEach(line => {

            total += line.quantity * line.unit_price
        });
        return total;
    }


    useEffect(() => {
        dispatch(getUserOrder(userData.id));
    }, [cart]);

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
            {
                userData.username
                    ? <div className={style.container}>
                        {shoppingCart.lineorders &&
                            shoppingCart.lineorders.map((elem) => {
                                return <LineOrder lineOrderElement={elem} />;
                            })}
                    </div>
                    : <div className={style.container}>
                        {cart?.length > 0 &&
                            cart.map((elem) => {
                                return <LineOrder lineOrderElement={elem} />;
                            })}
                    </div>

            }





            <div className={style.btnContainer}>
                <h3>
                    Precio Total : ${" "}
                    {
                        shoppingCart.total_price
                            ? shoppingCart.total_price
                            : price()
                    }
                </h3>
                <button onClick={() => handleDeleteUserOrderAll(userData.id)}>Vaciar Carrito</button>
                <Link to="/coleccion"><button>Regresar a comprar</button></Link>
                <button className={style.btnPay}>Pagar</button>
            </div>
        </div>
    );
}

export default PopUpTrolley;
