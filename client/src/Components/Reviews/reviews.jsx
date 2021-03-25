import React, { useState, useEffect } from 'react';
import { getProductReviews } from '../../Actions/reviews';
import { useSelector, useDispatch } from 'react-redux';
import Styles from './reviews.module.css';

export default function Reviews({ artId }) {
    const dispatch = useDispatch();
    const reviewsProduct = useSelector(state => state.reviewsProduct);


    
    useEffect(() => {
        dispatch(getProductReviews(artId));
    }, [])


    if (reviewsProduct && reviewsProduct.reviews && reviewsProduct.reviews[0]) {
        return (
            <div className={Styles.mainContainer}>
                 <h1>Lo que nuestros usuarios opinan...</h1>
            <div className={Styles.reviewsContainer}>

                {reviewsProduct.reviews.map((elem) => (
                    <div className={Styles.review}>
                        <p>Calificación:{elem.qualification}</p>
                        <div className={Styles.align}>
                            <div className={Styles.containerUser}>
                                <p className={Styles.user}>Usuario:</p>
                                <p className={Styles.user}>{elem.userId}</p>
                            </div>
                            <div className={Styles.containerComments}>
                            <p className={Styles.text}>Comentarios:</p>
                                <p className={Styles.text}>{elem.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div> 
            </div>
        )
    }

else{
    return(
        <div>
            'No hay reviews para este producto'
        </div>
    )
}
}