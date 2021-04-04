import React, { useState } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import { useSelector, useDispatch } from 'react-redux';
import style from './offers.module.css'
import { createOffer } from '../../Actions/offers';

export default function Offers(){

    const categories = useSelector(state => state.categories);
    const dispatch = useDispatch();

    const [offer, setOffer] = useState({
        day: '1',
        idCategory: '1',
        discount: ''
    });
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (offer.discount) {
            dispatch(createOffer(offer));
        }else{
            alert('Debe ingresar un descuento')
        }
    }

    const handleChange = (e) => {

        setOffer({
            ...offer,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className={style.mainContainer}>
            <NavBar/>
            <div className={style.formContainer}>
                <h1>Crear oferta</h1>
                <form onSubmit={handleSubmit}>
                    <div>

                        <label htmlFor="day">Dia:</label>
                        <select name='day' id='day' onChange={handleChange}>
                            <option value='1'>Lunes</option>
                            <option value="2">Martes</option>
                            <option value="3">Miércoles</option>
                            <option value="4">Jueves</option>
                            <option value="5">Viernes</option>
                            <option value="6">Sábado</option>
                            <option value="0">Domingo</option>
                        </select>
                    </div>
                    <div>

                        <label htmlFor="category">Categoria:</label>

                        <select name='idCategory' id='category' onChange={handleChange}>
                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}                    
                        </select>
                    </div>
                    <div>

                        <label htmlFor="discount">Porcentaje:</label>
                        <input name='discount' id='discount' onChange={handleChange} type="number" max='100' min='0' />
                    </div>
                    <button type='submit'>Guardar</button>
                </form>
            </div>
            {/* MAPEAR OFFERS Y PONER UN BOTON PARA ELIMINAR */}
        </div>
    )
}