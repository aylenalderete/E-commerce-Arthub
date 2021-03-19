import React, {useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminUser from '../../Components/AdminUser/AdminUser';
import BuyerUser from '../../Components/BuyUser/buyUser';


export default function MyProfile() {
    const userType = useSelector(state => state.userData.type);    


    if (userType === '') {
        return <Redirect to='/ingresar' />
    }
    else if (userType === 'admin' || userType === 'artist') {
        return (
            <AdminUser/>
        )
    }
    else if (userType === 'user') {
        return (
            <BuyerUser/>
        )
    }
}