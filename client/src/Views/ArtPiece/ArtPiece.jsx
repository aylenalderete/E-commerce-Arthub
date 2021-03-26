import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom'
import NavBar from "../../Components/NavBar/NavBar.jsx";
import style from "./artpiece.module.css";
import Reviews from "../../Components/Reviews/reviews";
import { useDispatch, useSelector } from "react-redux";
import getInitialProducts from "../../Actions/getInitialProducts";
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
  border: {

    color: '#ffb400'
  }



}));
//---start

function ArtPiece({ artId }) {
  const [detailed, setDetailed] = useState({
    name: "",
    description: "",
    stock: 0,
    images: [
      {
        url: "",
      },
    ],
  });
  const userData = useSelector((state) => state.userData);


  let history = useHistory()

  const classes = useStyles();


  useEffect(() => {
    dispatch(getInitialProducts());
    axios
      .get(`http://localhost:3001/products/${artId}`)
      .then((result) => setDetailed(result.data));
  }, []);

  const dispatch = useDispatch();
  // state for reviews 
  const reviews = useSelector(state => state.reviewsProduct.reviews);
  console.log(reviews)

  // contar en el array la lenght para ver cuantos usuarios dejaron reviews 
  // sumar todo y divirlo por la cantidad de usuarios 


  let average = 0;
  let finalAverage;

  if (reviews && reviews[0]) {
    reviews.forEach(r => average += r.qualification)
    if (average > 0) {
      finalAverage = average / reviews.length
    }

  }


  if (detailed && detailed.description) {
    return (
      <div className={style.navContainer}>
        <NavBar renderTop={false}></NavBar>
        <div className={style.container}>
          <div className={style.borderContainer}>
            <div className={style.imgContainer}>
              <img
                className={style.img}
                alt="artpic"
                src={detailed.images[0].url}
              ></img>
            </div>
            <div className={style.infoContainer}>
              <div>
                <h1>{detailed.title}</h1>
              </div>{finalAverage ?
                <div className={classes.root}>
                  <Rating name="half-rating-read" defaultValue={finalAverage} precision={0.5} readOnly emptyIcon={<StarBorderIcon fontSize="inherit" className={classes.border} />} />
                </div>
                :
                <div className={classes.root}>
                  <Rating name="half-rating-read"  defaultValue={0} precision={0.5} emptyIcon={<StarBorderIcon fontSize="inherit" className={classes.border} />} />
                </div>

              }
              <div className={style.infoSecondContainer}>
                {detailed.stock > 0
                  ? <h3>Stock: {detailed.stock}</h3>
                  : <h3>Producto no disponible</h3>}
                <h3>Categoria/s:</h3>
                <div className={style.categoriesContainer}>
                  {detailed.categories &&
                    detailed.categories.map((x) => <div className={style.catContainer}><p>{x.name}</p></div>)}
                </div>
              </div>
              <h3>{`Precio: $` + `${detailed.price}`}</h3>
              <p>{detailed.description}</p>


              <div className={style.containerButtons}>
                <Link to="/carrito">
                  <button
                    // onClick={() => handlePostUserOrder(userData.id, artId)}
                    className={style.button}>
                    Añadir al carrito
              </button>
                </Link>
                <button className={style.button} onClick={() => history.push(`/coleccion/`)}>
                  Volver a coleccion </button>
              </div>
            </div>
          </div>

          <Reviews artId={artId} />
        </div>
      </div>
    );

  }
  else {
    return (
      <div className={style.navContainer}>
        <NavBar renderTop={false}></NavBar>
        <div className={style.container}>
          <></>
        </div>
      </div>

    )
  }
}
export default ArtPiece;