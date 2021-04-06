import axios from 'axios';

export default function mailinAuction (userEmail) {
    return async dispatch => {
        await axios.post(`http://localhost:3001/mailer/auction/${userEmail}`
)
            .then((res) => dispatch({ type: "SEND_MAIL_AUCTION", payload: res.data }))
    }
}