import axios from 'axios';
import React, { useEffect } from 'react'
import NavBar from './../../Components/NavBar/NavBar';
import style from './AdminRequests.module.css'
import { useState } from 'react';

function AdminRequests() {

    const [requests, setRequests] = useState();

    useEffect(() => {
        axios.get('http://localhost:3001/request/').then(d => setRequests(d.data))
    }, [])

    function handleApproved(id) {
        axios.put(`http://localhost:3001/request/${id}`, { state: 'approved' })
            .then(alert('Solicitud aprobada con éxito'))
            .catch(err => alert(err))
    }

    function handleDeclined(id) {
        axios.put(`http://localhost:3001/request/${id}`, { state: 'declined' })
            .then(alert('Solicitud rechazada con éxito'))
            .catch(err => alert(err))
    }


    return (
        <div className={style.mainContainer}>
            <NavBar renderTop={false} />
            {

                !requests?.message ? requests?.map(r => (
                    <div>
                        <p>Nombre de usuario</p>
                        {r.user.username}
                        <p>Nombre y apellido</p>
                        {r.user.name + " " + r.user.lastname}
                        <p>Curriculum</p>
                        {r.cv ? r.cv : null}
                        <p>Links relevantes</p>
                        {r.links}
                        <p>Fundamento</p>
                        {r.fundament}
                        <button value='approved' onClick={() => handleApproved(r.id)}>
                            Aceptar
                    </button>
                        <button value='declined' onClick={() => handleDeclined(r.id)}>
                            Rechazar
                    </button>
                    </div>
                )) : <div>No hay solicitudes </div>
            }
        </div>
    )
}

export default AdminRequests
