import axios from 'axios';

export default function getArtistAuctions (artistId){
 
    return dispatch =>{
        axios.get(`http://localhost:3001/auctions/user/${artistId}`)
        .then(r => 
            {
                dispatch({
            type: 'GET_ARTIST_AUCTIONS', payload: r.data
        })})
    }
}