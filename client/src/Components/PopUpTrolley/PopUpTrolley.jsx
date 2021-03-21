import React, { useEffect, useState } from "react";
import style from "./popUpTrolley.module.css";
import userLog from "../../Actions/userLog";
import { useSelector, useDispatch } from "react-redux";
import getUserOrder from "../../Actions/getUserOrder";
import deleteUserOrderAll from '../../Actions/deleteUSerOrderAll'
import LineOrder from "../LineOrder/LineOrder";
import { Link } from 'react-router-dom'
import deleteUserOrderGuest from '../../Actions/deleteUserOrderGuest';
import addToCart from '../../Actions/addToCart';

function PopUpTrolley() {
    const isUserLogged = useSelector((state) => state.isUserLogged);
    const shoppingCart = useSelector((state) => state.shoppingCart);
    const userData = useSelector((state) => state.userData);
    const dispatch = useDispatch();
    const [changed, setChanged] = useState(false);

    // const [cart, setCart] = useState([]);

    const cart = JSON.parse(localStorage.getItem('cart'));
    const cartRedux = useSelector((state) => state.guestCart);


    // console.log(cart);

    const handleLog = () => {
        dispatch(userLog(true));
    };

    const handleDeleteUserOrderAll = async (idUser) => {
        if (userData.username) {
            await dispatch(deleteUserOrderAll(idUser));

        } else {
            localStorage.removeItem('cart');
            dispatch(deleteUserOrderGuest());
        }
    };

    const price = () => {
        var total = 0;
        cart && cart.forEach(line => {

            total += line.quantity * line.unit_price
        });
        return total;
    }

    const change = () => {
        setChanged(!changed);
    }

    // function init() {
    //     const cartL = localStorage.getItem('cart');
    //     // const data = localStorage.getItem("my-list");
    //     if (cartL.length > 0) {
    //         setCart(JSON.parse(cartL));
    //     }
    //     // localStorage.setItem("cart", JSON.stringify(cart));
    //   }

    // useEffect(()=>{
    //     init()
    // }, [])

    // useEffect(()=>{
    //     localStorage.setItem("cart", JSON.stringify(cart));
    // }, [cart])

    // useEffect(() => {
    //     function checkUserData() {
    //       const item = JSON.parse(localStorage.getItem('cart'));

    //       if (item) {
    //         setCart(item);
    //       }
    //     }

    //     window.addEventListener('storage', checkUserData);

    //     return () => {
    //       window.removeEventListener('storage', checkUserData);
    //     }
    //   }, [])



    useEffect(() => {
        dispatch(getUserOrder(userData.id));
    }, []); // ver esto

    // useEffect(() => {
    //     console.log('ESTO ES CART', cart.length);
    //     console.log('ESTO ES ID', userData.id);
    //     function request() {
    //         if (cart.length > 0 && userData.username) {
    //             console.log('ENTRO AQUI');
    //             cart.forEach( p => {
    //                 dispatch(addToCart(userData.id, p.product.id_product));
    //             })
    //             dispatch(getUserOrder(userData.id));
    //         }
    //     }

    //     request();

    // }, []);

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
                                return <LineOrder lineOrderElement={elem} change={change} />;
                            })}
                    </div>
                    : <div className={style.container}>
                        {cartRedux?.length > 0 &&
                            cartRedux.map((elem) => {
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
