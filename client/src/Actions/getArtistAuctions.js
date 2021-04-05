import axios from 'axios';

export default function getArtistAuctions (artistId){
    console.log(artistId)
    return dispatch =>{
        axios.get(`http://localhost:3001/auctions/user/${artistId}`)
        .then(r => 
            { console.log(r)
                dispatch({
            type: 'GET_ARTIST_AUCTIONS', payload: r.data
        })})
    }
}