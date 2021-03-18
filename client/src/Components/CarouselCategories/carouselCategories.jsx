import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getCategories from '../../Actions/filter';
import Styles from './carouselCategories.module.css';
import moveCarousel from '../../Actions/moveCarousel';
import leftArrow from '../../Images/left-arrow.svg';
import rightArrow from '../../Images/right-arrow.svg';



export default function Carrousel() {
    const dispatch = useDispatch();

    // LOAD CATEGORIES
    useEffect(() => {
        dispatch(getCategories());

    }, [])

    // SELECTORS 
    const active = useSelector(state => state.carouselActive);
    const categories = useSelector(state => state.categories);

    const handlePrev = (e) => {
        e.preventDefault()
        dispatch(moveCarousel('prev'));
    }

    const handleNext = (e) => {
        e.preventDefault()
        dispatch(moveCarousel('next'));
    }



    const displayImgs = (array) => {
        let newArr = []
        if (active === 1) {
            newArr = array.slice(0, 3)
        }
        else if (active === 2) {
            newArr = array.slice(3, 6)
        }

        else if (active === 3) {
            newArr = array.slice(5, 8)
        }
        return newArr.map(obj => (
            <div className={Styles.cardContainer} key={obj.id}>
               
                <div className={Styles.imgContainer}>
                <img className={Styles.img} src={obj.image} alt={obj.name}/>
                </div>
                <p className={Styles.name}>{obj.name}</p>
            </div>
        ));
    }

    return (
        <div className={Styles.mainContainer}>
            <button className={Styles.arrow} onClick={handlePrev}>
                <img className={Styles.arrows} src={leftArrow} alt="left arrow" />
            </button>
            <div className={Styles.slider}>
                {categories.length > 0 && displayImgs(categories)}
            </div>
            <button className={Styles.arrow} onClick={handleNext}>
                <img className={Styles.arrows} src={rightArrow} alt="right arrow" />
            </button>
        </div>
    )

}

