import React from 'react'
import art from '../fakeList'
import style from './artpiece.module.css'

function ArtPiece({artName}) {

    var pieceFinder = art.find(x => x.name === artName)
    return (
      <div className={style.container}>
        <div className={style.imgContainer}>
          <img className={style.img} alt="artpic" src={pieceFinder.pic}></img>
        </div>
        <div className={style.infoContainer}>
          <div className={style.artistContainer}>
            <h3>{pieceFinder.artist}</h3>
            <h4>{pieceFinder.rating}</h4>
          </div>
          <div>
            <h1>{pieceFinder.name}</h1>
          </div>
          <div>
            <p>{pieceFinder.description}</p>
            <button className={style.button}>añadir a mi compra</button>
          </div>
        </div>
      </div>
    );
}

export default ArtPiece
