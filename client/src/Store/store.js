// Importante: En este archivo se encuentran unificados el store y su respectivo reducer! 

import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
//redux dev tool para browser 
import { composeWithDevTools } from 'redux-devtools-extension';

// estado inicial 
const initialState = {
    products: [],
    search:[],
    urlImages: [],
    categories: [],
    isOpenFilters: false,
    filteredProducts: [],
    usersArtists : [],
    artistsProducts: [],
    isActiveFilters: false,

}

//reducer 
const reducer = function (state = initialState, action) {
    switch (action.type) {

        //aca crear los switch cases de cada action

        case "GET_PRODUCTS":
            
            
            if ( state.filteredProducts.length>0 && !state.search[0]){
               return{
                   ...state, 
                   filteredProducts: action.payload
               }
            }
            return {
                ...state,
                search: action.payload,
            };

        case "GET_INITIAL_PRODUCTS":
            return {
                ...state,
                products: action.payload,
            };

        case 'SET_URL_IMAGES':
      
            return{
                ...state,
                urlImages: action.payload
            }

        case 'GET_CATEGORIES':
            return {
                ...state,
                categories: action.payload,
            }

        case 'SET_FILTERS':

                return {
                    ...state,
                    filteredProducts: action.payload
                }
            

        case 'SHOW_FILTERS':

            return {
                ...state,
                isOpenFilters: action.payload
            }

        // case 'GET_USERS_ARTISTS':

        //     return {
        //         ...state,
        //         users: action.payload
        //     }

        case 'GET_USER_PRODUCTS':
            return {
                ...state,
                products: action.payload
            }

        case 'GET_USERS_ARTISTS':
            return {
                ...state,
                usersArtists: action.payload
            }

        case 'GET_ARTISTS_PRODUCTS':
            return {
                ...state,
                artistsProducts: action.payload
            }

        case 'CLEAR_URL_IMAGES':
            return{
                ...state,
                urlImages: []
            }
        case 'SEARCH_FILTERS':
            let searchF = state.search.filter(f => f.categories.find(x => x.name === action.payload))
            if (!searchF[0]){
                searchF = 'void'
            }
            return{
                 ...state,
                 search: searchF
            }

        case 'ACTIVE_FILTERS':
            return{
                ...state,
                isActiveFilters: action.payload
            }



        default:
            return state;

    }
}



export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));