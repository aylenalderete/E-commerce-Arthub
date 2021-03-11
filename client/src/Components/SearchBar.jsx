import React, { useState } from 'react';
import { connect } from 'react-redux';
import Styles from './searchBar.module.css';
import SearchIcon from '../Images/search.svg';
import {getProducts} from '../Actions/getActions';

function SearchBar({getProducts}) {

    //hooks
    const [input, setInput] = useState('');

    function handleInputChange(e) {
        setInput(e.target.value);
    }

    //----------------------------------------

    //Submit

    function handleSubmit(e){
        e.preventDefault();
        getProducts(input);
    }
    

    return (
        <div className={Styles.mainContainer}>
            <form onSubmit={handleSubmit} className={Styles.formStyle}>
                <input type='text' onChange={handleInputChange} className={Styles.inpt} placeholder='Buscar...'></input>
                <button className={Styles.btn}>
                    <img className={Styles.searchIcon} src={SearchIcon} alt='search icon' />
                </button>
            </form>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: search => dispatch(getProducts(search))
    }
}

export default connect(null, mapDispatchToProps)(SearchBar);

