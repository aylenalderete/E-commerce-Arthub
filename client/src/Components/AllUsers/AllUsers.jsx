import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import getUsers from '../../Actions/getUsers'
import style from './allUsers.module.css'
import edit from "../../Images/edit.svg"
import deleteuser from "../../Images/delete.svg"
import changeusertype from '../../Actions/changeusertype'
import PromoteUsers from '../PromoteUsers/PromoteUsers'
import DeleteUsers from '../DeleteUsers/DeleteUsers'
import deleteUsers from '../../Actions/deleteUsers'
import UserSearchBar from "./UserSearchBar";
import { Redirect } from 'react-router-dom';
import axios from 'axios'



function AllUsers() {
    const users = useSelector(state => state.users)

    const userData = useSelector(state => state.userData)

    const promoteUser = useSelector(state => state.promoteUser)

    const deleteUser = useSelector(state => state.deleteUser)

    const [loading,setLoading] = useState(false)

    const[userId, setUserId] = useState()

    const dispatch = useDispatch()

    const [flag, setFlag] = useState(false)


    

    useEffect(() => {
        dispatch(getUsers())
        setFlag(false)
    }, [flag])



    function handleClick(id){
        promoteUser === false ? dispatch(changeusertype(true)) : dispatch(changeusertype(false));
        setUserId(id)
    }

    function handleDeleteClick(id){
        deleteUser === false ? dispatch(deleteUsers(true)) : dispatch(deleteUsers(false));
        setUserId(id)
    }

    function handleReset(email){
        setLoading(true)
        axios
        .post(`http://localhost:3001/mailer/send/${email}`)
        .then(result=>{
            if(result){
                setLoading(false)
                alert('se ha resetado el password')
            }
        });
    }

    console.log(users)
    console.log(typeof users)

    if(!userData.id){
        return <Redirect to="/ingresar"></Redirect>;    
    }

    return (
        <div className={style.container} style={loading?{'cursor':'progress'}:null}>
            {promoteUser === true && <PromoteUsers userId = {userId} />}
            {deleteUser === true && <DeleteUsers userId = {userId} />}
            <div >
                    <UserSearchBar />

            <table className={style.table}>
                
                
                <tr>
                    <th className={style.title}>
                        Usuarios:
                    </th>
                </tr>
                <tr className = {style.column}>
                    <td>nombre</td>
                    <td>apellido</td>
                    <td>usuario</td>
                    <td>email</td>
                    <td>tipo</td>
                    <td>estado</td>
                </tr>
                {users.length ? users && users.map((u) => (
                    <tr className={style.users}>
                        <td>{u.name}</td>
                        <td>{u.lastname}</td>
                        <td>{u.username}</td>
                        <td>{u.email}</td>
                        <td>{u.type}</td>
                        <td>{u.state}</td>

                        <th className={style.th}>
                                <div className={style.btnContainer}>
                                    <div className={style.btnContainer} onClick ={() => handleClick(u.id)}>
                                        <img className={style.icon} src={edit} alt="edit item" />
                                    </div>

                                    <div className={style.btnContainer} onClick ={() => handleDeleteClick(u.id)} >
                                    <img className={style.icon} src={deleteuser} alt="edit item" />
                                    </div>
                                    {!(u.logType)?
                                    <div className={style.btnContainer} onClick ={() => handleReset(u.email)} >           
                                        <div>reset</div>
                                    </div>
                                    :null}
                                </div>
                            </th>
                    </tr>
                )) : <div>No se encontró el usuario</div>}
            </table>
            </div>
        </div>
    )
}

export default AllUsers