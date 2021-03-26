import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Styles from './addReview.module.css';
import {Link, useHistory} from 'react-router-dom'
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

export default function EditReview({ idproduct, idorder }) {
    const dispatch= useDispatch();
    const userReviews = useSelector(state => state.userReviews);
    const userId = useSelector(state=> state.userData.id);
    const [product, setProduct] = useState({})
    const classes = useStyles();
    const history = useHistory();
    const [input, setInput] = useState({
        description: '',
        qualification: '',
    })
   
    // inicio busqueda de idReview 
    var idReview  = 0 ;
    for(var i = 0; i<userReviews.length; i++){
    console.log("acaà")
        if(userReviews[i].productIdProduct == idproduct && userReviews[i].userId === userId){
            console.log("entró")
            idReview += userReviews[i].id_review
            
        }
    }
    console.log(parseInt(idReview))
   // fin de busqueda de idReview

   useEffect(() => {
        
    axios
        .get(`http://localhost:3001/products/${idproduct}`)
        .then((result) => setProduct(result.data));
}, []);

    useEffect(()=>{
       if(userId !== 0){
        dispatch(getUserReviews(userId));
       }

    },[userId]);
    
    

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    function handleSubmit(e) {
        e.preventDefault();
      
        dispatch(putProductReview(idproduct, idReview, input.description, input.qualification, userId))
        history.push(`/coleccion/${idproduct}`)
    }

    function handleDelete (e){
        dispatch(deleteProductReview(idproduct, idReview))
    }


    
    return (
        <div className={Styles.mainContainer}>
            {product.title &&
                <div className={Styles.secondContainer}>
                    <h1 className={Styles.title}>{`Editar la reseña del producto ${product.title}`}</h1>
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
                    
                        <div className={classes.root}>
                            <Rating name="qualification" onChange={(e) => handleChange(e)} defaultValue={0} precision={0.5} emptyIcon={<StarBorderIcon fontSize="inherit" className={classes.border} />}/>
                        </div>
                        <label className={Styles.label} name='descripcion'>Descripción: </label>
                        <textarea className={Styles.textArea} onChange={(e) => handleChange(e)} name='description' type="text" />
                        
                        <button type="submit" className={Styles.btn}>Enviar</button>
                    
                    </form>
                    
                    <Link to={`/coleccion/${idproduct}`}>
                    <button onClick={(e) => handleDelete(e)}>Eliminar</button>
                    </Link>
                </div>
            }

        </div>
    )

}

