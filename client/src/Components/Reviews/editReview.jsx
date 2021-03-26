import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Styles from './addReview.module.css';
import { editProductReview, deleteProductReview, getProductReviews, getUserReviews} from "../../Actions/reviews";
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
    const userId = useSelector(state => state.userData.id)
    const dispatch = useDispatch()
    const [product, setProduct] = useState({})
    const classes = useStyles();
    const userIdReview = useSelector(state => state.userReviews)
/* 
    const editIdReview = userIdReview.find(r => r.productIdProduct === idproduct) */
    

    useEffect(() => {
      dispatch(getProductReviews(idproduct))
      dispatch(getUserReviews(userId));
    }, []);

   
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
        dispatch(editProductReview(idproduct ,input.description, input.qualification, userId))
    }

    return (
        <div className={Styles.mainContainer}>
            {product.title &&
                <div className={Styles.secondContainer}>
                    <h1 className={Styles.title}>{`Modifica la reseña del producto ${product.title}`}</h1>
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
                        <div className={classes.root}>
                            <Rating name="qualification" onChange={(e) => handleChange(e)} defaultValue={0} precision={0.5} emptyIcon={<StarBorderIcon fontSize="inherit" className={classes.border} />}/>
                        </div>
                        <label className={Styles.label} name='descripcion'>Descripción:  </label>
                        <textarea className={Styles.textArea} onChange={(e) => handleChange(e)} name='description' type="text" />
                        <button type="submit" className={Styles.btn}>Enviar</button>
                    </form>
                </div>
            }

        </div>
    )
}





