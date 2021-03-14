import React, { useEffect, useState } from 'react';
import getCategories from '../../Actions/filter';
import setFilters from '../../Actions/setFilters';
import showFilters from '../../Actions/showFilters';
import Styles from './popUp.module.css';


import { connect } from 'react-redux';

function Filters({ categories, getCategories, setFilters, showFilters }) {
    //get all the categories once the component mounts
    useEffect(() => {

        getCategories();
    }, []);

    //hooks for select input change

    const [select, setSelect] = useState('')

    //handle category select state
    const handleCategoryChange = (e) => {
        e.preventDefault();
        setSelect(e.target.value);
    }

    //handle submit

    const handleSubmit = (e) => {
        e.preventDefault();
        //set filters and show results 
        setFilters(select);
        //close popUp
        showFilters(false);
       
    }

    return (
        <div className={Styles.mainDivPopUp}>
            <form className={Styles.formFilter} onSubmit={handleSubmit}>
                
                <label className={Styles.formLabel}>categoría</label>
                <select className={Styles.selectCategory} onChange={handleCategoryChange}>
                    {categories.map(c =>
                        <option className={Styles.option} value={c.name}>{c.name}</option>
                    )}
                </select>
                
                <label className={Styles.formLabel}>artista</label>
                <select className={Styles.selectCategory} onChange={handleCategoryChange}>
                    {categories.map(c =>
                        <option className={Styles.option} value={c.name}>{c.name}</option>
                    )}
                </select>
                <button className={Styles.btn}>filtrar</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: () => dispatch(getCategories()),
        setFilters: (category) => dispatch(setFilters(category)),
        showFilters: (condition) => dispatch(showFilters(condition))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);


