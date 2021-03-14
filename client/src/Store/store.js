// Importante: En este archivo se encuentran unificados el store y su respectivo reducer! 

import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
//redux dev tool para browser 
import { composeWithDevTools } from 'redux-devtools-extension';

// estado inicial 
const initialState = {
    products: [],
    categories: [],
    isOpenFilters: false,

}

//reducer 
const reducer = function (state = initialState, action) {
    switch (action.type) {
        //aca crear los switch cases de cada action

        case "GET_PRODUCTS":
            return {
                ...state,
                products: action.payload,
            };
        case "GET_INITIAL_PRODUCTS":
            return {
                ...state,
                products: action.payload,
            };
        case 'GET_CATEGORIES':
            return {
                ...state,
                categories: action.payload,
            }

        case 'SET_FILTERS':

            return {
                ...state,
                products: [
                    ...state.products.filter((products) =>
                        products.categories && products.categories.find(c => c.name == action.payload)

                    ),
                ],
            }

        case 'SHOW_FILTERS':

            return {
                ...state,
                isOpenFilters: action.payload
            }


        default:
            return state;
    }
}



export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));