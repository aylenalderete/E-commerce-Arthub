import React, { useState, useEffect } from 'react'
import getInitialProducts from '../../Actions/getInitialProducts';
import deleteproduct from '../../Actions/deleteproduct'
import {useSelector, useDispatch} from 'react-redux'
import style from './deleteProduct.module.css'
import close from '../../Images/cancel.svg';


function DeleteProduct(props) {
    const isOpenDeleteProd = useSelector((state) => state.isOpenDeleteProd);
    
    const [theProduct, setTheProduct] = useState()

    const products = useSelector(state => state.products)

    const productId = useSelector(state => state.productId)

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getInitialProducts());
        setTheProduct(products.filter((element) => element.id_product == productId)[0])
        return () => {dispatch(deleteproduct(false))}
    }, [])




    function handleSubmit() {
        try {
            fetch(`http://localhost:3001/products/${productId}`, {
                method: 'DELETE',
            })
            .then((res) => res.json())
            .then(response => alert('Producto eliminado'))

        } catch (error) {
            console.log(error);
            alert('No se pudo eliminar el producto')
        }

        dispatch(deleteproduct(false));
        props.setFlag(true)
        
    }

    const onClose = () =>{
     
      dispatch(deleteproduct(false))
    }
 

    return (
        <div className={style.mainDivPopUp}>
            <div className={style.textPop}>
                estás seguro de querer eliminar el producto {theProduct?.title} ?
            </div>        
            <div className = {style.btnSelect}>
                <button className={style.btn} onClick = {() => handleSubmit()}>
                    eliminar
                </button>
            </div>
            <div className={style.btnCloseContainer} onClick={()=> onClose()}>
                <img  className={style.btnClose} src={close} alt='close pop up'/>
            </div>
        </div>
    )
}

export default DeleteProduct
