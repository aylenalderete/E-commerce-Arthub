import React, { useState, useEffect } from 'react';
import { getProductReviews } from '../../Actions/reviews';
import { useSelector, useDispatch } from 'react-redux';
import Styles from './reviews.module.css';
import logoEdit from '../../Images/edit.svg'
import {Link} from 'react-router-dom'
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

    const userDataId = useSelector(state => state.userData.id);
   
    if (reviewsProduct && reviewsProduct.reviews && reviewsProduct.reviews[0]) {
    var idUserReview = 0;
    for (var i = 0; i < reviewsProduct.reviews.length; i++) {
        console.log("acaà")
        if (reviewsProduct.reviews[i].productIdProduct == artId ) {
            console.log("entró")
            idUserReview += reviewsProduct.reviews[i].userId

        }
    }
}
    console.log("userReviewId" + " " + idUserReview)
    console.log("userDataId" +  " " + userDataId)
    console.log("artId " + artId)


    
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
                            <div className={Styles.containerData}>
                                <p className={Styles.text}>Fecha: {elem.createdAt.slice(0,10)}</p>          
                                {
                            idUserReview == userDataId ?
                                <Link to={`/editarReseña/${artId}`} >
                                <img src={logoEdit} className={Styles.edit}/>
                                </Link>       
                            :
                            <div></div>
                        }
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
        <div className={Styles.message}>
           <p className={Styles.messageText}>No hay reviews para este producto...</p>
        </div>
    )
}
}