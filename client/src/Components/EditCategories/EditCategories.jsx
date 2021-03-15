import React, { useEffect, useState } from 'react';
import style from './editCategories.module.css'
import {useSelector, useDispatch} from 'react-redux'
import getCategories from '../../Actions/filter'

function EditCategories() {

    const [input, setInput] = useState({ name: '', description: '' });
    // const [errors, setErrors] = useState({}); ---> Hacer despues 

    // function validate(){} ---> Hacer despues

    const categories = useSelector(state => state.categories)

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(getCategories());

    }, []);

    const [category, setCategory] = useState({
        category: '',
    })

    const handleInputChange = (e) => {
        setCategory({
            ...category,
            category: e.target.value
          });
    }

    // console.log(category)

    function handleSubmit(ev) {
        ev.preventDefault();
        try {
            fetch(`http://localhost:3001/products/category/${category.category}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(input)
            })
            .then((res) => res.json())
            .then(response => alert('Categoria editada'))

        } catch (error) {
            console.log(error);
            alert('No se pudo editar la categoria')
        }
    }

    function handleChange(ev) {
        setInput({
            ...input,
            [ev.target.name]: ev.target.value
        });
            console.log(input)
        // setErrors(validate()) ---> Hacer despues
    }

    // console.log(category)

    function deleteCategory() {
        try {
            fetch(`http://localhost:3001/products/category/${category.category}`, {
                method: 'DELETE',
            })
            .then((res) => res.json())
            .then(response => alert('Categoria eliminada'))

        } catch (error) {
            console.log(error);
            alert('No se pudo eliminar la categoria')
        }
    

    }

    return (
        <div className={style.create}>
            <h1>edita/elimina una categoría</h1>
            <form onSubmit={handleSubmit} >

                <input className={style.input} onChange={handleChange} type='text' required='required' placeholder='nombre*' name='name' value={input.name} />
                <input className={style.input} onChange={handleChange} type='text' required='required' placeholder='descripción*' name='description' value={input.description} />
                
                <div className = {style.btnSelect}>
                    <button className={style.btn} type='submit'>
                        editar
                    </button>

                    <select className={style.selectCategory} name="category" onChange={handleInputChange}>
                        {categories.map(c =>
                            <option className={style.option} value={c.id} key={c.id}>{c.name}</option>
                        )}
                    </select>

                    <button className={style.btn} onClick = {() => deleteCategory()}>
                        eliminar
                    </button>
                </div>


            </form>

        </div>
    )
}

export default EditCategories
