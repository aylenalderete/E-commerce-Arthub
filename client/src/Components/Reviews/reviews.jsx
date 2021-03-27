import React, { useState, useEffect } from 'react';
import { getProductReviews } from '../../Actions/reviews';
import { useSelector, useDispatch } from 'react-redux';
import Styles from './reviews.module.css';
//start
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        '& > * + *': {
            marginTop: theme.spacing(1),
        },
    },
    border : {
        
        color : '#ffb400'
    }
}));
//---start

export default function Reviews({ artId }) {
    const dispatch = useDispatch();
    const reviewsProduct = useSelector(state => state.reviewsProduct);
    const classes = useStyles();


    
    useEffect(() => {
        dispatch(getProductReviews(artId));
    }, [])


    if (reviewsProduct && reviewsProduct.reviews && reviewsProduct.reviews[0]) {
        return (
            <div className={Styles.mainContainer}>
                 <h1>Opiniones</h1>
            <div className={Styles.reviewsContainer}>

                {reviewsProduct.reviews.map((elem) => (
                    <div className={Styles.review}>
                        <div className={Styles.containerLeft}>
                        <div className={classes.root}>
                        <Rating  name="half-rating-read" value={parseFloat(elem.qualification)} precision={0.5} readOnly emptyIcon={<StarBorderIcon fontSize="inherit" className={classes.border} />}/>
                        </div>
                        <div className={Styles.containerUser}>
                                <p className={Styles.user}>Usuario:</p>
                                <p className={Styles.user}>{elem.user.username}</p>
                            </div>
                        </div>

                        <div className={Styles.align}>
                            <div className={Styles.containerComments}>
                            <p className={Styles.text}>Comentarios:</p>
                                <p className={Styles.text}>{elem.description}</p>
                            </div>
                            <div className={Styles.containerComments}>
                            <p className={Styles.text}>Fecha:</p>
                                <p className={Styles.text}>{elem.createdAt.slice(0,10)}</p>
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