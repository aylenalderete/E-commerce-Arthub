import React, { useEffect, useState } from "react";
import style from "./auctionView.module.css";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../NavBar/NavBar.jsx";
import getAuctionView from '../../Actions/getAuctionView'
import Countdown from "./Countdown";
import axios from "axios";


export default function AuctionView(props) {


    const auctionView = useSelector(state => state.auctionView)
    const [value, setValue] = useState(0)
    const dispatch = useDispatch();
    const userDataId = useSelector(state => state.userData.id)
    const userDataName = useSelector(state => state.userData.username)
    console.log(value)
    useEffect(() => {
        dispatch(getAuctionView(props.match.params.id))
    }, [])

    function handleSubmit(element) {

        axios
            .post(`http://localhost:3001/auctions/${auctionView.id_auction}/${userDataId}`, {
                finalPrice: auctionView.price > 1000 ? auctionView.price + 100 + value : auctionView.price + 50 + value
            })
          
            .catch((error) => {
                alert("No se pudo solicitar la subasta");
                console.log(error);
            });

        setValue(element)
    }

    function mounthData() {
        var month = new Array();
        month[0] = "Enero";
        month[1] = "Febrero";
        month[2] = "Marzo";
        month[3] = "Abril";
        month[4] = "Mayo";
        month[5] = "Junio";
        month[6] = "Julio";
        month[7] = "Agosto";
        month[8] = "Septiembre";
        month[9] = "Octubre";
        month[10] = "Noviembre";
        month[11] = "Deciembre";
      
        var data = new Date();
        var newMonth = month[data.getMonth()];
        return newMonth
        
      } 
   



    if (auctionView != null) {
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
                            <h1>Subasta {mounthData()} </h1>
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
                                <button className={style.btn} onClick={() => handleSubmit(value + auctionView.percentage)}>Ofertar</button>
                            </div>
                        </div>
                        <div >
                            <Countdown competitor={userDataName} total = {auctionView.price + value}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className={style.mainContainer}>
                <NavBar renderTop={false} />
                <p>No hay subastas activas</p>
            </div>
        )
    }

}