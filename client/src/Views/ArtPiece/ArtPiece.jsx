import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom'
import NavBar from "../../Components/NavBar/NavBar.jsx";
import style from "./artpiece.module.css";

import { useDispatch, useSelector } from "react-redux";
import addToCart from "../../Actions/addToCart.js";
import getUserOrder from "../../Actions/getUserOrder";
import getInitialProducts from "../../Actions/getInitialProducts";
import addToCartGuest from "../../Actions/addToCartGuest";

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

  useEffect(() => {
    dispatch(getInitialProducts());
    axios
      .get(`http://localhost:3001/products/${artId}`)
      .then((result) => setDetailed(result.data));
  }, []);

  const dispatch = useDispatch();

  const handlePostUserOrder = async (idUser, productId, quantity) => {
    if (!userData.username) {
      let prod = (
        await axios.get(`http://localhost:3001/products/${productId}`)
      ).data;

      let line = { unit_price: prod.price, quantity: 1, product: prod };
      let cart = localStorage.getItem("cart");
      cart = JSON.parse(cart);
      if (!cart) {
        let array = [];
        array.push(line);
        localStorage.setItem("cart", JSON.stringify(array));
        dispatch(addToCartGuest(productId));
        // change();
      } else {
        if (
          !cart.find((l) => l.product.id_product == line.product.id_product)
        ) {
          cart.push(line);
          cart.sort(function (a, b) {
            if (a.product.id_product > b.product.id_product) {
              return 1;
            }
            if (a.product.id_product < b.product.id_product) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });
          localStorage.setItem("cart", JSON.stringify(cart));
          dispatch(addToCartGuest(productId));

          // change();
        }
      }
    } else {
      await dispatch(addToCart(idUser, productId, quantity));
      dispatch(getUserOrder(idUser));
    }
  };

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
            </div>
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
                  onClick={() => handlePostUserOrder(userData.id, artId)}
                  className={style.button}>
                  Añadir al carrito
              </button>
              </Link>
              <button className={style.button} onClick={() => history.push(`/coleccion/`)}>
                Volver a coleccion </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtPiece;
