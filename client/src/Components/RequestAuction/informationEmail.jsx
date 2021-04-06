// import React, { useEffect, useState } from 'react';
// import style from './informationEmail.module.css'
// import { useSelector, useDispatch } from 'react-redux'
// import close from '../../Images/cancel.svg'
// import emailInformation from '../../Actions/emailInformation'

// export default function informationEmail(props) {
//     const auctionEmailPU = useSelector(state => state.auctionEmailPU)

//     const dispatch = useDispatch()

//     function sendEmail(email){
//         dispatch(mailingAuction(email))
//       }

//     useEffect(() => {
//         return () => {dispatch(emailInformation(false))}
//     }, [])


//     return (
//         <div>
//             <button onClick={() => sendEmail(props.email)}>Email ganador</button>
//         </div>
//     )
// }


