import React, { useEffect, useState, useRef} from 'react';
import NavBar from '../../Components/NavBar/NavBar'
import style from './FAQ.module.css'
import { useSelector, useDispatch } from 'react-redux'

function FAQ() {

    const dropdownRef = useRef(null);

    const [arthub, setArhub] = useState(false);
    const handleClick1 = () => setArhub(!arthub)

    const [seller, setSeller] = useState(false);
    const handleClick2 = () => setSeller(!seller);

    const [artist, setArtist] = useState(false);
    const handleClick3 = () => setArtist(!artist);

    const [authenticity, setAuthenticity] = useState(false);
    const handleClick4 = () => setAuthenticity(!authenticity)

    const [payment, setPayment] = useState(false);
    const handleClick5 = () => setPayment(!payment)

    return (
        <div className = {style.mainContainer}>
            <NavBar />
            <div>
                <ul>
                    <li className = {style.lists} onClick={handleClick1} >
                        <div onClick={handleClick1} className = {style.question}>
                            <span className = {style.text}>
                                Qué es arthub?
                            </span>
                        </div>
                        {arthub && <div>
                            <p>
                                "El hub de los artistas, un lugar en donde se interconectan miles de artistas de todos los estilos para mostrar sus trabajos con el fin de venderlos.
                                Por otro lado, es el espacio ideal para encontrar ese detalle artístico que va a darle a tus espacios un toque único."
                            </p> 
                        </div>} 
                    </li>
                    <li className = {style.lists} onClick={handleClick2}>
                        <div onClick={handleClick2} className = {style.question}>
                            <span>
                                Quién puede vender?
                            </span>
                        </div>
                        {seller && <div>
                            <p>
                                Para poder vender, es necesario contar con un perfil de artista. 
                                Si sos artista y querés vender tus cuadros, hacé click <a href = '/registrarse' className={style.link}>acá</a> .
                            </p>
                        </div>}
                    </li>
                    <li className = {style.lists} onClick={handleClick3}>
                        <div onClick={handleClick3} className = {style.question}>
                            <span>
                                Cómo aplico a un perfil de artista?
                            </span>
                        </div>
                        {artist && <div>
                            <p>
                                Para poder optar a un perfil de artista, es necesario verificar que tenés una cuenta en donde mostrás tus trabajos.
                                Ésta puede ser de Instagram, Facebook, Twitter o cualquier otra con la que podamos asegurarnos de que cumplís con el perfil.
                                Hacé click <a href = '/registrarse' className={style.link}>acá</a> para aplicar!

                            </p>
                        </div>}
                    </li>
                    <li className = {style.lists} onClick={handleClick4}>
                        <div onClick={handleClick4} className = {style.question} >
                            <span>
                                Los cuadros tienen certificado de autenticación?
                            </span>
                        </div>
                        {authenticity && <div>
                            <p>
                                Los artistas son los responsables directos de proporcionar dicho certificado de ser necesario, o contar con la autorización de
                                reproducción de los autores originales.
                            </p>
                        </div>}
                    </li>
                    <li className = {style.lists} onClick={handleClick5}>
                        <div onClick={handleClick5} className = {style.question}>
                            <span>
                                Qué formas de pago son aceptadas?
                            </span>
                        </div>
                        {payment && <div>
                            <p>
                                Los pagos pueden ser efectuados con tarjeta de débito/crédito o cualquier método aceptado por MercadoPago.
                            </p>
                        </div>}
                    </li>
                </ul>
            </div>
            
        </div>
    )
}

export default FAQ
