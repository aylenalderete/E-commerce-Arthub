import React, { useEffect, useState } from "react";
import style from "./popUpTrolley.module.css";
import userLog from "../../Actions/userLog";
import { useSelector, useDispatch } from "react-redux";
import getUserOrder from "../../Actions/getUserOrder";
import deleteUserOrder from "../../Actions/deleteUserOrder";
import LineOrder from "../LineOrder/LineOrder";
function PopUpTrolley() {
    const isUserLogged = useSelector((state) => state.isUserLogged);
    const shoppingCart = useSelector((state) => state.shoppingCart);
    const userData = useSelector((state) => state.userData);
    const dispatch = useDispatch();

    const handleLog = () => {
        dispatch(userLog(true));
    };

    // esto se jarcodea con 4 como el idUser que indica el acceso del usuario

    useEffect(() => {
        dispatch(getUserOrder(userData.id));
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

            <div className={style.container}>
                {shoppingCart.lineorders &&
                    shoppingCart.lineorders.map((elem) => {
                        return <LineOrder lineOrderElement={elem} />;
                    })}
            </div>

            <div className={style.btnContainer}>
                <h3>
                    Precio Total : ${" "}
                    {shoppingCart.total_price ? shoppingCart.total_price : 0}
                </h3>
                <button className={style.btnPay}>Pagar</button>
            </div>
        </div>
    );
}

export default PopUpTrolley;
