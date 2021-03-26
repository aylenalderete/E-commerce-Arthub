import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Styles from './addReview.module.css';

import { putProductReview, deleteProductReview, getProductReviews, getUserReviews} from "../../Actions/reviews";

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

export default function EditReview({ idproduct }) {
    const dispatch= useDispatch();
    const userReview = useSelector(state => state.userReviews);
    const userId = useSelector(state=> state.userData);
    
    useEffect(()=>{
        if (userId.id !== 0){
        dispatch(getUserReviews(userId.id));
        
        console.log(userReview)
      }

    },[userId]);
    
    


    
    return (
        <div className={Styles.mainContainer}>
            

        </div>
    )

}

