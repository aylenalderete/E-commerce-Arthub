import React, {useState} from 'react';
import { connect } from 'react-redux';
import Styles from '../PopUpFilters/popUp.module.css';

function Sort() {

    //hooks for select input change
        
    const [select, setSelect] = useState('')

    //handle category select state
    const handleSortChange = (e) => {
        e.preventDefault();
        setSelect(e.target.value);
    }

    //handle submit

    const handleSubmit = (e) => {
        e.preventDefault();
        
    }

    return (
        <div className={Styles.mainDivPopUp}>
            <form className={Styles.formFilter} onSubmit={handleSubmit}>

                <label className={Styles.formLabel}>alfabético</label>
                <select className={Styles.selectCategory} onChange={handleSortChange}>
                    <option className={Styles.option} value="a-z">a-z</option>
                    <option className={Styles.option} value="z-a">z-a</option>
                </select>

                <label className={Styles.formLabel}>precio</label>
                <select className={Styles.selectCategory} onChange={handleSortChange}>
                    <option className={Styles.option} value="">menor precio</option>
                    <option className={Styles.option} value="">mayor precio</option>
                </select>

                <button className={Styles.btn}>ordenar</button>
            </form>

        </div>
    )
}

export default connect(null, null)(Sort);
