import React from 'react'
import style from './popUpTrolley.module.css';
import userLog from '../../Actions/userLog';
import { useSelector, useDispatch } from 'react-redux';

function PopUpTrolley() {
    const isUserLogged = useSelector(state => state.isUserLogged);
    const dispatch = useDispatch();

    const handleLog = () =>{
        dispatch(userLog(true));
    }

    if (isUserLogged) {

        return (
            <div className={style.mainContainer}>
                <label className={style.myTrolley}>Mi carrito</label>
                <table>
                    <tr className={style.tableHead}>
                        <th>Productos</th>
                        <th>Precio</th>
                    </tr>
                    <tr className={style.tableBody}>
                        <td className={style.textProduct}/*Aca va el map de los productos que agregó al carrito*/ >Astronauta</td>
                        <td /*Aca va el map de los precios de los productos que agregó*/ >100</td>
                    </tr>
                    <tr className={style.tableBody}>
                        <td className={style.textProduct}/*Aca va el map de los productos que agregó al carrito*/ >Zorro</td>
                        <td /*Aca va el map de los precios de los productos que agregó*/ >100</td>
                    </tr>
                </table>

                <div className={style.btnContainer}>
                    <button className={style.btnPay}>Pagar</button>
                </div>

            </div>
        )
    }

    else{
        return (
            <div>
                <p>Debes iniciar sesión para acceder al carrito</p>
                <button onClick={handleLog}>Iniciar sesión</button>
            </div>
        )
    }
}

export default PopUpTrolley
