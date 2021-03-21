import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import NavBar from '../../Components/NavBar/NavBar';
import style from '../OrderDetail/OrderDetail.module.css';

function OrderDetail() {

    const [orderDetail, setOrderDetail] = useState({})

    const { id } = useParams()

    useEffect(() => {
        async function order() {
            await axios.get(`http://localhost:3001/orders/${id}`)
                .then((res) => {
                    (!res.message) ? setOrderDetail(res.data) : setOrderDetail()
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        order()
    }, [id])

    return (
        <div className={style.mainContainer}>
            <div className={style.navBaralign}>
                <NavBar renderTop={false} />

                {
                    (Object.entries(orderDetail).length > 1) ?

                        <div className={style.secondContainer}>
                            <h2 className={style.title}>Detalle de orden N: {orderDetail.id_order}</h2>
                            <h3> Estado: {orderDetail.state} </h3>
                            <h3> Fecha: {orderDetail.createdAt} </h3>
                            <h3> Precio total: $ {orderDetail.total_price} </h3>

                            {orderDetail.lineorders.map(l =>

                                <div className={style.orderContainer} >
                                    <div className={style.productInfo}>
                                        <p className={style.infoProduct}>Producto: {l.product.title} </p>
                                        <p className={style.infoProduct}>Cantidad: {l.quantity}</p>
                                        <p className={style.infoProduct}>Precio: $ {l.product.price}</p>
                                    </div>

                                    <div className={style.containerImg}>
                                        <img className={style.img} src={l.product.images[0].url} alt="product image" />
                                    </div>
                                </div>
                            )}

                        </div>
                        :
                        <div className={style.secondContainer}>
                            <p>No hay informacion disponible</p>
                        </div>
                }



            </div>
        </div>
    )
}

export default OrderDetail
