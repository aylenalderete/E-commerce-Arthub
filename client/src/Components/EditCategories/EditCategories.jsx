import React, { useEffect, useState } from 'react';
import style from './editCategories.module.css'
import {useSelector, useDispatch} from 'react-redux'
import getCategories from '../../Actions/filter'

function EditCategories(props) {

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


    // const [category, setCategory] = useState({
    //     category: '',
    // })

    // const handleInputChange = (e) => {
    //     setCategory({
    //         ...category,
    //         category: e.target.value
    //       });
    // }

    // console.log(category)

    function handleSubmit(ev) {

        ev.preventDefault();
        try {
            fetch(`http://localhost:3001/products/category/${theCategory.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: theCategory.name,
                    description : theCategory.description
                })
            })
            .then((res) => res.json())
            .then(response => alert('Categoria editada'))

        } catch (error) {
            console.log(error);
            alert('No se pudo editar la categoria')
        }
    }

    function handleChange(ev) {
        setTheCategory({
            ...theCategory,
            [ev.target.name]: ev.target.value
        });
            
        // setErrors(validate()) ---> Hacer despues
    }

    // console.log(category)

    return (
        <div className={style.create}>
            <h1>edita una categoría</h1>
            <form onSubmit={handleSubmit} >

                <input className={style.input} onChange={handleChange} type='text' required='required' placeholder='nombre*' name='name' value={theCategory?.name} />
                <input className={style.input} onChange={handleChange} type='text' required='required' placeholder='descripción*' name='description' value={theCategory?.description} />
                
                <div className = {style.btnSelect}>
                    <button className={style.btn} type='submit'>
                        editar
                    </button>

                </div>


            </form>

        </div>
    )
}

export default EditCategories
