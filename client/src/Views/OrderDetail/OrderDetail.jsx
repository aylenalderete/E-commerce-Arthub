import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

function OrderDetail() {

    const [detalles, setdetalles] = useState({})

    const {id} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:3001/orders/${id}`)
        .then((res) => {
            console.log(res.data)
            setdetalles(res.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    const editarEstado = () => {
        const {state} = detalles
        axios.put(`http://localhost:3001/orders/${id}`)
        .then((res) => {
            console.log(res.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <div>
            {
                <div>
                    <div>
                        <p>Orden N° {detalles.id_order}</p>
                        <p>Estado: {detalles.state}</p>
                        <button onClick= {editarEstado}>Editar estado</button>                          
                    </div>
                    <p>Productos:</p>
                     {
                     detalles.lineorders?.map((el) => (
                        <div style={{border: '1px solid white'}} >
                            {console.log(el.product)}
                            <p>Título:{el.product.title}</p>
                            <p>Cantidad:{el.quantity}</p>
                            <p>Precio ${el.product.price}</p>
                        </div>
                    ))    
                    }      
                    <p>Precio total: ${detalles.total_price}</p> 
                </div>
            }
        </div>
    )
}

export default OrderDetail
