import React, { useState } from 'react';
import { connect } from 'react-redux';
import Styles from './searchBar.module.css';
import SearchIcon from '../../Images/search.svg';
import getProductsByName from '../../Actions/getActions';
import searchFilters from '../../Actions/searchFilters';

function SearchBar({getProductsByName, search , searchFilters}) {

    //hooks
    const [input, setInput] = useState('');

    function handleInputChange(e) {
        setInput(e.target.value);
    }

    //----------------------------------------

    //Submit

    function handleSubmit(e){
        e.preventDefault();

        if (!search[0]){
        getProductsByName(input);}
        else{
            searchFilters(input)
        }
    }
    

    return (
        <div className={Styles.mainContainer}>
            <form onSubmit={handleSubmit} className={Styles.formStyle}>
                <input type='text' onChange={handleInputChange} className={Styles.inpt} placeholder='buscar...'></input>
                <button className={Styles.btn}>
                    <img className={Styles.searchIcon} src={SearchIcon} alt='search icon' />
                </button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        search: state.search
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProductsByName: search => dispatch(getProductsByName(search)),
        searchFilters: category => dispatch(searchFilters(category))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

