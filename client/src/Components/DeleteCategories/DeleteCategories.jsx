import React, { useEffect, useState } from 'react';
import style from './deleteCategories.module.css';
import {useSelector, useDispatch} from 'react-redux'
import getCategories from '../../Actions/filter'


function DeleteCategories(props) {

    const [input, setInput] = useState({name:'' , descripction:''});
    // const [errors, setErrors] = useState({}); ---> Hacer despues 

    // function validate(){} ---> Hacer despues

    const categories = useSelector(state => state.categories)

    const [theCategory, setTheCategory] = useState()

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(getCategories());
    }, []);
    
    useEffect(() => {
        setTheCategory(categories.filter((element) => element.id == props.categoryId)[0])
    }, [categories])


    function deleteCategory() {
        try {
            fetch(`http://localhost:3001/products/category/${theCategory.id}`, {
                method: 'DELETE',
            })
            .then((res) => res.json())
            .then(response => alert('Categoria eliminada'))

        } catch (error) {
            console.log(error);
            alert('No se pudo eliminar la categoria')
        }
    }

        function handleChange(ev) {
            setTheCategory({
                ...theCategory,
                [ev.target.name]: ev.target.value
            });
    

    }
    

    return (
        <div className={style.create}>
            <h1>elimina una categoría</h1>
            <form >

                <input className={style.input} onChange={handleChange} type='text' required='required' placeholder='nombre*' name='name' value={theCategory?.name} />
                <input className={style.input} onChange={handleChange} type='text' required='required' placeholder='descripción*' name='description' value={theCategory?.description} />
                
                <div className = {style.btnSelect}>

                <button className={style.btn} onClick = {() => deleteCategory()}>
                    eliminar
                </button>

                </div>


            </form>



        </div>
    )
}


export default DeleteCategories
