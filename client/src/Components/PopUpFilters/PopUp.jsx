import React, { useEffect, useState } from 'react';
import getCategories from '../../Actions/filter';
import setFilters from '../../Actions/setFilters';
import showFilters from '../../Actions/showFilters';
import getUsersArtists from '../../Actions/getUsersArtists';
import Styles from './popUp.module.css';
import searchFilters from '../../Actions/searchFilters';
import activeFilters from '../../Actions/activeFilters';
import close from '../../Images/cancel.svg';



import { connect } from 'react-redux';

function Filters({ categories, getCategories, setFilters, showFilters, getUsersArtists, search, searchFilters , activeFilters, isActiveFilters}) {
    //get all the categories once the component mounts
    useEffect(() => {

        getCategories();
        getUsersArtists();
       return ()=> {showFilters(false);}
    }, []);

    //hooks for select category change

    const [select, setSelect] = useState({
        category: '',
        user: ''
    })

    //handle input change
    const handleInputChange = (e) => {
        setSelect({
            ...select,
            [e.target.name]: e.target.value
          });
    }
    

    //handle submit

    const handleSubmit = (e) => {
         e.preventDefault();
         if(search[0]){
             
             activeFilters(true)
             searchFilters(select.category);
         }
         else{
            activeFilters(true)
         setFilters(select.category);}
         showFilters(false);
         
         
    }

    const onClose =  () => {
        showFilters(false);
    }

    return (
        <div className={Styles.mainDivPopUp}>
            <form className={Styles.formFilter} onSubmit={handleSubmit}>
                
                <label className={Styles.formLabel}>categoría</label>
                <select className={Styles.selectCategory} name="category" onChange={handleInputChange}>
                    {categories.map(c =>
                        <option className={Styles.option} value={c.name}>{c.name}</option>
                    )}
                </select>
                {isActiveFilters? <div>Filtros activados</div> : <div>Filtros desactivados</div>}
                <button className={Styles.btn}>filtrar</button>
            </form>

            <button onClick={()=>onClose()}  className={Styles.btnClose}>
                <img className={Styles.close} src={close} alt="close filters"/>
            </button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        search: state.search,
        isActiveFilters: state.isActiveFilters,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: () => dispatch(getCategories()),
        setFilters: (category) => dispatch(setFilters(category)),
        showFilters: (condition) => dispatch(showFilters(condition)),
        getUsersArtists: () => dispatch(getUsersArtists()),
        searchFilters: (category) => dispatch(searchFilters(category)),
        activeFilters: (condition) => dispatch(activeFilters(condition))
        
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);


