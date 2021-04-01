import React, { useEffect, useState } from 'react';
import style from './deleteAuction.module.css';
import {useSelector, useDispatch} from 'react-redux'
import getAuctions from '../../Actions/getAuctions'
import deleteAuctionPU from '../../Actions/deleteAuctionPU'
import close from '../../Images/cancel.svg'


function DeleteAuction(props) {
    const [theAuction, setTheAuction] = useState()

    const auctions = useSelector(state=> state.auctions)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAuctions())
    }, []);

    useEffect(() => {
        setTheAuction(auctions.find((element) => element.id === props.auctionId ))
    }, [auctions])

    function handleSubmit() {
        
        try {
            fetch(`http://localhost:3001/auctions/${theAuction.id_auction}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                
            })
                .then((res) => {
                    res.json()
                })     
                
                console.log(theAuction.id_auction)

        } catch (error) {
            console.log(error);
            alert('No se pudo eliminar')
        }

        dispatch(deleteAuctionPU(false));
        dispatch(getAuctions())
        
    }

    const onClose = () =>{
        dispatch(deleteAuctionPU(false))
    }

    return (
        <div className={style.mainDivPopUp}>
            <button onClick={()=>{onClose()}} className={style.btnCloseDiv}>
                <img className={style.close} src={close} alt="close edit"/>
            </button>
            <div className={style.formLabel}>
                estás seguro de querer eliminar la subasta?
            </div>        
            <div className = {style.btnSelect}>
                <button className={style.btn} onClick = {() => handleSubmit()}>
                    eliminar
                </button>
            </div>
        </div>
    )
}

export default DeleteAuction
