import React from 'react'

function ArtCard({name, pic, artist}) {
    return (
      <div>
        <img src={pic}></img>
        <h5>{name}</h5>
        <h5>{artist}</h5>
      </div>
    );
}

export default ArtCard
