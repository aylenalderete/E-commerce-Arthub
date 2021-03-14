// filter action by category  
import axios from 'axios';
export default function setFilters(category) {
        return async dispatch => {
            return await axios.get(`http://localhost:3001/products/categorias/${category}`)
            .then(result => dispatch({type: 'SET_FILTERS', payload: result.data}));
        }
 
}
