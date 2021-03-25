import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Styles from './addReview.module.css';
import { addProductReview } from "../../Actions/reviews";

export default function AddReview({ idproduct }) {
    const userId = useSelector(state => state.userData.id)
    const dispatch = useDispatch()
    const [product, setProduct] = useState({})



    useEffect(() => {
        axios
            .get(`http://localhost:3001/products/${idproduct}`)
            .then((result) => setProduct(result.data));
    }, []);

    const [input, setInput] = useState({
        description: '',
        qualification: '',
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    function handleSubmit(e) {
        e.preventDefault();

        console.log(idproduct, input.description, input.qualification, userId)
        dispatch(addProductReview(idproduct, input.description, input.qualification, userId))
    }

    return (
        <div className={Styles.mainContainer}>
            {product.title &&
                <div className={Styles.secondContainer}>
                    <h1 className={Styles.title}>{`Agrega una reseña al producto ${product.title}`}</h1>
                    <div className={Styles.containerProduct}>
                        <div className={Styles.textContainer}>
                            <p>Descripción:</p>
                            <p>{product.description}</p>
                        </div>
                        <div className={Styles.imgContainer}>
                            <img className={Styles.img} src={product.images[0].url} alt="" />
                        </div>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)} className={Styles.form}>

                        <label>Calificación</label>
                        <input onChange={(e) => handleChange(e)} name="qualification" type='number' max='10' />
                        <label className={Styles.label} name='descripcion'>Descripción:  </label>
                        <textarea className={Styles.textArea} onChange={(e) => handleChange(e)} name='description' type="text" />
                        <button type="submit" className={Styles.btn}>Enviar</button>
                    </form>
                </div>
            }

        </div>
    )
}





