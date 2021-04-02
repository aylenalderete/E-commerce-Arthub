import React, { useEffect, useState } from "react";
import style from "./auctionView.module.css";
import { useSelector, useDispatch} from "react-redux";
import NavBar from "../NavBar/NavBar.jsx";
import getAuctionView from '../../Actions/getAuctionView'
import { useLocation } from "react-router-dom";
import Countdown from "./Countdown";


export default function AuctionView(props){

const auctionView = useSelector(state => state.auctionView)
const [value, setValue] = useState(0)
const dispatch = useDispatch();
let date = new Date()

const userData = useSelector(state => state.userData.id)

useEffect(() => {
    dispatch(getAuctionView(props.match.params.id))
},[])

function handleSubmit(element) {
    try {
        fetch(`http://localhost:3001/auctions/${auctionView.id_auction}/${userData}`, {
            method: 'POST',
        })
        .then((res) => res.json())
        


    } catch (error) {
        console.log(error);
        alert('Error')
    }

    setValue(element)
}



if(auctionView != null){
    return (
        <div className={style.mainContainer}>           
            <NavBar renderTop={false} />
            <div className={style.contenedor}>
                <div className={style.column1}>
                    <div className={style.title}>
                        <h1>{auctionView.title}</h1>
                    </div>
                    {auctionView.images && auctionView.images.map(elem => (
                    <div className={style.imgContainer}>
                        <img src={elem.url} />
                    </div>
                    ))}
                    <div className={style.info}>
                       {auctionView.users && auctionView.users.map(elem => (
                           <h3>{elem.username}</h3>
                           ))}
                        <h2>"{auctionView.description}"</h2>
                        <div className={style.category}>
                           {auctionView.categories && auctionView.categories.map(elem => (
                           <p>{elem.name}</p>
                           ))}
                        </div>
                    </div>
                </div>
                <div>
                    <div className={style.title}>
                        <h1>Subasta Abril </h1>
                    </div>
                    <div className={style.actual}>
                        <p>Oferta Actual: {auctionView.price + value} </p>
                    </div>
                    <div className={style.initial}>
                        <p>Valor Inicial {auctionView.price}</p>
                    </div>
                    <div className={style.ofert}>
                        <p>Siguiente oferta {auctionView.price >= 1000 ?
                            auctionView.price + 100 + value
                            : auctionView.price + 50 + value}
                        </p>
                        <div className={style.btnSelect}>
                        <button className={style.btn} onClick={() => handleSubmit(value+auctionView.percentage)}>Ofertar</button>
                        </div>
                    </div>
                    <div >
                        <Countdown />
                    </div>
                </div>
            </div>
        </div>
    )
}else{
    return(
        <div className={style.mainContainer}>
            <NavBar renderTop={false} />
            <p>No hay subastas activas</p>
        </div>
    )
}
    
}