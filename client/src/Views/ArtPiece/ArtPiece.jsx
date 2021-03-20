import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar.jsx";
import style from "./artpiece.module.css";

import { useDispatch, useSelector } from "react-redux";
import addToCart from "../../Actions/addToCart.js";
import getUserOrder from "../../Actions/getUserOrder";
import getInitialProducts from "../../Actions/getInitialProducts";

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

  useEffect(() => {
    dispatch(getInitialProducts());
    axios
      .get(`http://localhost:3001/products/${artId}`)
      .then((result) => setDetailed(result.data));
  }, []);

  const dispatch = useDispatch();

  const handlePostUserOrder = async (idUser, productId) => {
    await dispatch(addToCart(idUser, productId));
    dispatch(getUserOrder(idUser));
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
            <div>
              <div className={style.categoriesContainer}>
                <h4>
                  {detailed.stock > 0
                    ? `Stock: ${detailed.stock}`
                    : "Producto no disponible"}
                </h4>
                <h4>
                  Categoria/s:{" "}
                  {detailed.categories &&
                    detailed.categories.map((x) => <h4>{x.name}</h4>)}
                </h4>
              </div>
              <div className={style.artistContainer}>
                {/* <h3>{detailed.artist}</h3> */}
                <h4>{`Precio: $` + `${detailed.price}`}</h4>
              </div>
              <p>{detailed.description}</p>

              <button
                onClick={() => handlePostUserOrder(userData.id, artId)}
                className={style.button}
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtPiece;
