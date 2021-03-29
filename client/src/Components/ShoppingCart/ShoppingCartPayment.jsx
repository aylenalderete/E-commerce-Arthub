import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import LineOrder from '../LineOrder/LineOrder';
import { emptyCart } from '../../Actions/shoppingCart';
import style from "./shoppingcartpayment.module.css";
import { useHistory } from 'react-router';


function ShoppingCartPayment() {

    const { id } = useSelector((state) => state.userData);

    const history = useHistory();

    // const cart = useSelector((state) => state.cart);
    const [method, setMethod] = useState("");
    const dispatch = useDispatch();
    const [total, setTotal] = useState(0);
    const cart = useSelector((state) => state.cart);

    const handleChange = (e) => {
        setMethod(e.target.value);
    }

    useEffect(() => {
        setTotal(cart.reduce((acc, current) => acc += current.subTotal, 0))
    }, [cart])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (method === 'mp') {

            axios.post(`http://localhost:3001/users/${id}/newcart`, { cart })
                .then(() => {
                    axios.get(`http://localhost:3001/users/${id}/cart`)
                        .then((r) => {
                            axios.post(`http://localhost:3001/orders/mercadopago`, { cart, idOrder: r.data.id_order })
                                .then(response => {
                                    // console.log(response.data);
                                    window.location = response.data.mpLink;
                                    localStorage.setItem('cart', JSON.stringify([]));
                                    dispatch(emptyCart());
                                });
                        })
                })
        }
    }

    return (
        <div>
            <h1 className={style.title}>Paso 2: Finalizar compra</h1>
            {cart.length > 0
                ?
                <div className={style.container}>
                    <div className={style.cards}>
                        {
                            cart.map(p => <LineOrder lineOrderElement={p} ></LineOrder>)
                        }
                    </div>
                    <div className={style.info}>


                        <p className={style.label}>Elegir metodo de pago: </p>
                        <select className={style.select} onChange={e => handleChange(e)} required >
                            <option>Selecciona</option>
                            <option value="mp">MercadoPago</option>
                            <option value="paypal">Paypal</option>

                        </select>

                        <p className={style.total}>Total: ${total}</p>
                        <button className={`${style.btn} ${style.p}`} onClick={() => history.push('/carrito')}>Volver</button>

                        <button className={style.btn} onClick={handleSubmit}>Pagar</button>
                        {
                            method &&
                            <p>Al hacer click en "Pagar" vas a ser redirigido a otro sitio. Luego de finalizar el pago, volveras a Arthub</p>
                        }

                    </div>

                </div>
                :

                history.push('/carrito')
            }
        </div>
    )
}

export default ShoppingCartPayment