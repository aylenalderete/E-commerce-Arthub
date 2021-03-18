// Importante: En este archivo se encuentran unificados el store y su respectivo reducer! 

import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
//redux dev tool para browser 
import { composeWithDevTools } from 'redux-devtools-extension';

// estado inicial 
const initialState = {
    //global states
    products: [],
    search: [],
    categories: [],
    //firebase
    urlImages: [],
    //filter states
    isOpenFilters: false,
    filteredProducts: [],
    //artist states 
    usersArtists: [],
    artistsProducts: [],
    //carousel states
    isActiveFilters: false,

    userData: {
        id: 0,
        username: "",
        name: "",
        lastname: "",
        email: "",
        birth: "",
        type: "",
        state: ""

    },

    carouselActive: 1,
    //PopUp categories states
    isOpenCategory: false,
    isOpenDeleteCat: false,

    //log states
    isUserLogged: false,

    //Delete product state
    isOpenDeleteProd: false

}

//reducer 
const reducer = function (state = initialState, action) {
    switch (action.type) {


        //aca crear los switch cases de cada action

        case "GET_PRODUCTS":
            if (state.filteredProducts.length > 0 && !state.search[0]) {
                return {
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

            return {
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
            return {
                ...state,
                urlImages: []
            }

        case 'SEARCH_FILTERS':
            let searchF = state.search.filter(f => f.categories.find(x => x.name === action.payload))
            if (!searchF[0]) {
                searchF = 'void'
            }
            return {
                ...state,
                search: searchF
            }

        case 'ACTIVE_FILTERS':
            return {
                ...state,
                isActiveFilters: action.payload
            }

        case "SIGN_IN":
            if (action.payload.auth === true)
                return {
                    ...state,
                    userData: action.payload.user,

                };
            else
                return {
                    ...state,
                };

        case "SIGN_IN_REFRESH":
            return {
                ...state,
                userData: action.payload,
            }

        case 'MOVE_CAROUSEL':
            if (action.payload === 'next' && state.carouselActive < 3) {
                return {
                    ...state,
                    carouselActive: state.carouselActive + 1
                }
            }


       

            if (action.payload === 'prev' && state.carouselActive > 1) {
                return {
                    ...state,
                    carouselActive: state.carouselActive - 1
                }
            }

            if (action.payload === 'next' && state.carouselActive === 3) {
                return {
                    ...state,
                    carouselActive: 1
                }
            }

            if (action.payload === 'prev' && state.carouselActive === 1) {
                return {
                    ...state,
                    carouselActive: 3
                }
            }

        case 'IS_USER_LOGGED':
            return {
                ...state,
                isUserLogged: action.payload}

              
               case 'POP_UP_CATEGORY' :
            return{
                ...state,
                isOpenCategory: action.payload
            }

        case 'POP_UP_DELETE_CATEGORY' :
            return{
                ...state,
                isOpenDeleteCat: action.payload
            }
        case 'POP_UP_DELETE_PRODUCT' :
            return{
                ...state,
                isOpenDeleteProd: action.payload
            }



        default:
            return state;


    }
}



export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));