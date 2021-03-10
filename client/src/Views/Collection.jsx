import React from 'react'
import art from '../fakeList'
import ArtCard from '../Components/ArtCard'
import style from './collection.module.css'

function Collection() {
    return (
        <div className={style.container}>
            {art.map(piece => (
                <ArtCard name={piece.name} pic={piece.pic} artist={piece.artist}></ArtCard>
            ))}
        </div>
    )
}

export default Collection
