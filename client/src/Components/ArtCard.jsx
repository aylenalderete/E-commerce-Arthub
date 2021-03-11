import React from 'react'
import style from './artcard.module.css'
import {Link} from 'react-router-dom'

function ArtCard({name, pic, artist}) {
    return (
      <div className={style.cardContainer}>
        <div className={style.imgContainer}>
          <img alt="artpic" src={pic}></img>
        </div>
        <div>
          <Link to={`/colección/${name}`}>
            <h5 className={style.text}>{name}</h5>
          </Link>
          <Link to={`/artists/${artist}`}>
            <h5 className={style.text}>{artist}</h5>
          </Link>
        </div>
      </div>
    );
}

export default ArtCard
