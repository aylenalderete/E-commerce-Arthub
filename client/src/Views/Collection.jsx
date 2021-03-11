import React from 'react'
import art from '../fakeList'
import ArtCard from '../Components/ArtCard'
import SearchBar from '../Components/SearchBar'
import style from './collection.module.css'

function Collection() {
    return (
      <div>
        <div className={style.sbContainer}>
          <SearchBar></SearchBar>
        </div>
        <div className={style.container}>
          {art.map((piece) => (
            <ArtCard
              name={piece.name}
              pic={piece.pic}
              artist={piece.artist}
            ></ArtCard>
          ))}
        </div>
      </div>
    );
}

export default Collection
