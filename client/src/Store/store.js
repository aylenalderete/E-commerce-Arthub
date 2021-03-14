// Importante: En este archivo se encuentran unificados el store y su respectivo reducer! 

import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
//redux dev tool para browser 
import { composeWithDevTools } from 'redux-devtools-extension';

// estado inicial 
const initialState = {
    products: [],
    urlImages: []
}

//reducer 
const reducer = function (state = initialState, action) {
    switch (action.type) {
        //aca crear los switch cases de cada action 

        case 'GET_PRODUCTS':
            return{
                ...state, 
                products: action.payload
            }
        case "GET_INITIAL_PRODUCTS":
            return {
                ...state,
                products: action.payload,
            };
        case 'SET_URL_IMAGES':
        console.log('payload reducer es: ', action.payload)
            return{
                ...state,
                urlImages: action.payload
            }
        default :
        return state;
    }
}



export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));