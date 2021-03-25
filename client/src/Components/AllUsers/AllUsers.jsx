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


function AllUsers() {
    const users = useSelector(state => state.users)

    const promoteUser = useSelector(state => state.promoteUser)

    const deleteUser = useSelector(state => state.deleteUser)

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

    

    return (
        <div className={style.container}>
            {promoteUser === true && <PromoteUsers userId = {userId} />}
            {deleteUser === true && <DeleteUsers userId = {userId} />}
            <div>
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
                {users.map((u) => (
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
                                </div>
                            </th>
                    </tr>
                ))}
            </table>
            </div>
        </div>
    )
}

export default AllUsers