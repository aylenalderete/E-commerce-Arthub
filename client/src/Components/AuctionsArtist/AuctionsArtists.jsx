import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from './AuctionsArtist.module.css';
import getArtistAuctions from '../../Actions/getArtistAuctions';

function AuctionsArtists() {
    const dispatch = useDispatch();
    const idUser = useSelector(state => state.userData.id);
    const artistAuctions = useSelector(state => state.artistAuctions)


    useEffect(() => {
        dispatch(getArtistAuctions(idUser))
    }, [])


    return (
        <div className={style.mainContainer}>
            <h1>Mis subastas</h1>
            <table className={style.table}>
                    <tr className={style.head}>
                        <th>imagen</th>
                        <th>título</th>
                        <th>artista</th>
                        <th>descripción</th>
                        <th>estado</th>
                    </tr>

                    {artistAuctions && artistAuctions.map((a) => (

                        <tr key={a.id} className={style.auctions}>
                            <td>
                                <img className={style.picture} src={a.images[0].url} />
                            </td>
                            <td>{a.title}</td>
                            <td>{a.users[0].username}</td>
                            <td>{a.description}</td>
                            <td>{a.state}</td>

                        </tr>

                    ))}
                </table>
        </div>
    )
}

export default AuctionsArtists
