import axios from "axios"

export function getOffer() {
    return function (dispatch){
        return axios.get('http://localhost:3001/offer')
        .then((r) => {
            dispatch({ type: 'SET_OFFER', payload: r.data })
        })
    }
}

export function createOffer(offer) {
    return function (dispatch) {
        return axios.post('http://localhost:3001/offer', offer)
            .then(() => {
                axios.get('http://localhost:3001/offer')
                    .then((r) => {
                        dispatch({ type: 'SET_OFFER', payload: r.data })
                    })
            })
    }
}