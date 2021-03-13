import React, {useState, useEffect} from 'react'
import art from '../fakeList'
import ArtCard from '../Components/ArtCard'
import SearchBar from '../Components/SearchBar'
import style from './collection.module.css'
import NavBar from '../Components/NavBar';
import {useDispatch, useSelector} from 'react-redux'
import getInitialProducts from '../Actions/getInitialProducts'

function Collection() {

const products = useSelector(state => state.products);
const dispatch = useDispatch();

useEffect(()=>{
dispatch(getInitialProducts());

}, [])

console.log(products)
  return (
    <div className={style.mainContainer}>
      <NavBar renderTop={false} />
      <div className={style.secondContainer}>
        <div className={style.sbContainer}>
        <SearchBar></SearchBar>
        </div>
        <div className={style.container}>
          {products.map((piece) => (
            <ArtCard
              name={piece.title}
              pic={piece.images[0].url}
              artist="Lore ipsum dolor"
            ></ArtCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection
