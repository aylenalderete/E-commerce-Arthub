// Importante: En este archivo se encuentran unificados el store y su respectivo reducer! 

import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
//redux dev tool para browser 
import { composeWithDevTools } from 'redux-devtools-extension';

// estado inicial 
const initialState = {

}

//reducer 
const reducer = function (state = initialState, action) {
    switch (action.type) {
        //aca crear los switch cases de cada action 
    }
}



export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));