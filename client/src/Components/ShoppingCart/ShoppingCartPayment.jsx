import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import LineOrder from '../LineOrder/LineOrder';
import { emptyCart } from '../../Actions/shoppingCart';
import style from "./shoppingcartpayment.module.css";
import { useHistory } from 'react-router';
import NavBar from '../NavBar/NavBar';
import { Redirect } from 'react-router-dom';
import linkSet from '../../Actions/linkset';


function ShoppingCartPayment() {

    const { id } = useSelector((state) => state.userData);

    const history = useHistory();

    // const cart = useSelector((state) => state.cart);
    const [method, setMethod] = useState("");
    const dispatch = useDispatch();
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [link, setLink] = useState('');

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
            setLoading(!loading)

            axios.post(`http://localhost:3001/users/${id}/newcart`, { cart })
                .then((newCart) => {

                    axios.post(`http://localhost:3001/orders/mercadopago`, { cart, idOrder: newCart.data.id_order })
                        .then(async response => {
                            // console.log('ESTE ES EL LINK MP',response.data.mpLink);
                            dispatch(linkSet(response.data.mpLink));
                            // setLink(response.data.mpLink);
                            setRedirect(true);
                            // window.location = response.data.mpLink;
                            // setTimeout(() => {
                            setLoading(!loading)
                            localStorage.setItem('cart', JSON.stringify([]));
                            dispatch(emptyCart());
                            // }, 3000)
                        });
                })
        }
    }
    if (redirect) {
        return <Redirect to='/linkmp'></Redirect>
    }
    return (
        <div className={style.mainContainer}>
            <NavBar renderTop={false} />
            <div className={style.secondContainer}>
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
                                <option className={style.option}>Seleccionar metodo de pago</option>
                                <option className={style.option} value="mp">MercadoPago</option>
                                <option className={style.option} value="paypal">Paypal</option>

                            </select>

                            <p className={style.total}>Total: ${total}</p>
                            <button className={`${style.btn} ${style.p}`} onClick={() => history.push('/carrito')}>Volver</button>

                            <button className={`${style.btn}`} disabled={loading ? true : null} onClick={handleSubmit}>{loading ? <i class="fas fa-spinner fa-spin"></i> : 'Pagar'}</button>
                            {
                                method === 'mp' &&
                                <p>Al hacer click en "Pagar" vas a ser redirigido a otro sitio. Luego de finalizar el pago, volveras a arthub</p>
                            }

                        </div>

                    </div>
                    :

                    history.push('/carrito')
                }
            </div>
        </div>
    )
}

export default ShoppingCartPayment