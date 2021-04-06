import axios from 'axios';

export default function getArtistAuctions (artistId){
    return dispatch =>{
        axios.get(`http://localhost:3001/auctions/art/${artistId}`)
        .then(result => 
            { console.log(result)
                dispatch({
            type: 'GET_ARTIST_AUCTIONS', payload: result.data
        })})
    }
}