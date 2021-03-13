import axios from 'axios';
import React, {useEffect, useState} from 'react'
import NavBar from '../Components/NavBar';
import style from './artpiece.module.css'


function ArtPiece({artId}) {

const [detailed, setDetailed] = useState({
  name: '',
  description: '',
  stock: 0,
  images: [{
    url: ''
  }]
});

useEffect(() => {
axios
  .get(`http://localhost:3001/products/${artId}`)
  .then((result) => setDetailed(result.data));  
}, [])

return (
  <div className={style.navContainer}>
    <NavBar renderTop={false}></NavBar>
    <div className={style.container}>
      <div className={style.imgContainer}>
        <img
          className={style.img}
          alt="artpic"
          src={detailed.images[0].url}
        ></img>
      </div>
      <div className={style.infoContainer}>
        <div className={style.artistContainer}>
          {/* <h3>{detailed.artist}</h3> */}
          <h4>{detailed.stock}</h4>
        </div>
        <div>
          <h1>{detailed.name}</h1>
        </div>
        <div>
          <p>{detailed.description}</p>
          <button className={style.button}>añadir a mi compra</button>
        </div>
      </div>
    </div>
  </div>
);
}

export default ArtPiece
