import React, { useEffect, useState } from 'react';
import Styles from './EditProduct.module.css';
import axios from 'axios';
import firebase from 'firebase';

// const firebaseConfig = {
//     apiKey: "AIzaSyDJ5J7_0pkNGDhDo1mIkVB0Gyrzvyk7J5U",
//     authDomain: "henry-art.firebaseapp.com",
//     projectId: "henry-art",
//     storageBucket: "henry-art.appspot.com",
//     messagingSenderId: "780293113241",
//     appId: "1:780293113241:web:89382d33be6a51b0cebf08",
//     measurementId: "G-HWGTY5PZ8T"
// };

// firebase.initializeApp(firebaseConfig);

function EditProduct({ id }) {

    // ------- firebase ------
    const [upload, setUpload] = React.useState({
        process: 0,
        picture: ''
    });

    const [refresh, setRefresh] = React.useState([])

    function handleUpload(event) {

        const file = event.target.files[0];
        console.log(event.target.files)

        if (event.target.files.length) {
            const storageRef = firebase.storage().ref(`/images/${file.name}`)
            const task = storageRef.put(file)

            task.on('state_changed', snapshot => {
                let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log(percentage)
                setUpload({
                    process: percentage
                })

            }, error => {
                console.log(error.message)
            }, () => {
                storageRef.getDownloadURL().then(urlImg => {

                    console.log('la url es: ', urlImg)
                    // let arrayImages = props.urlImages;
                    // arrayImages.push(url)
                    // props.setUrlImages(arrayImages)
                    // console.log('termino1', props.urlImages)
                    // setRefresh([1, 2])
                    setInput({
                        ...input,
                        images: [...input.images, {url: urlImg}]
                    });

                });
            })
        }
    }
    // ------- firebase ------

    // llenamos los inputs con la info del producto
    const [input, setInput] = useState({
        title: '',
        description: '',
        price: '',
        stock: '',
        images: [],
        categories: []
    });

    // useEffect para traer los datos de un producto por id
    // const [prod, setProd] = useState({});
    useEffect(async () => {
        let prod = (await axios.get(`http://localhost:3001/products/${id}`)).data;
        console.log(prod);

        // setProd(prod);
        setInput({
            ...prod,
            categories: prod.categories.map(cat => cat.id),
            images: prod.images.map(img => ({ url: img.url }))
        });
    }, [])


    // ---------- para el select de cateogrias ----------
    const [categories, setCategories] = useState([]);
    const [selectedCat, setSelectedCat] = useState('');


    useEffect(async () => {
        let cat = (await axios.get('http://localhost:3001/products/category')).data;
        // console.log('Estas categorias vienen de la base de datos: ', cat)

        setCategories(cat);
    }, [])

    function handleChangeCat(ev) {
        // console.log(ev.target.value)
        setSelectedCat(
            parseInt(ev.target.value)
        );
    }
    function handleSubmitCat(ev) {
        ev.preventDefault();
        // console.log('ENTRE AQUI');

        if (input.categories.find(cat => cat === selectedCat)) {
            alert(`Ya se agregó como categoria`);
            console.log('ENTRE AQUI');
        } else {
            setInput({
                ...input,
                categories: [...input.categories, parseInt(selectedCat)],
            });
        }
    }

    function handleClickCat(ev){
        console.log('handleClickCat');
        setInput({
            ...input,
            categories: [...input.categories.filter(cat => cat !== parseInt(ev.target.value))]
        });
    }

    function getNames(arr) {
        let names = [];
        categories.forEach((c) => {
            arr.forEach((id) => {
                if (parseInt(id) === c.id) {
                    names.push(c.name)
                }
            })

        })
        return names;
    }
    // ---------- para el select de cateogrias ----------


    // deberia haber una accion de editar producto


    function handleChange(e) {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }


    async function handleSubmit(e) {
        e.preventDefault();
        let res = await fetch(`http://localhost:3001/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input) // pasar la info de esta forma categories debe ser array de numeros y images debe ser array de obj con prop url
        })
        console.log(res);
        console.log(input);
    }

    // ----- borrar imagenes ---
    function onDelete(ev) {
        setInput({
            ...input,
            images: [...input.images.filter(img => img.url !== ev.target.value)]
        });
    }

    return (
        <div>
            <div className={Styles.divTitle}>
                <p>Editar producto</p>
            </div>
            <div className='formcontainer'>
                <p>Categorias</p>
                {
                    input.categories.map(cat => (
                        categories.find(category => category.id === cat) && 
                        <div >
                            <p>{getNames([cat])}</p> {/* la funcion get names me trae el nombre pero recibe array asi que por eso está asi */}
                            <button onClick={handleClickCat} value={cat}>x</button>
                        </div>
                    ))
                }
                <form className='form-bottom' onSubmit={handleSubmitCat}>
                    <select onChange={handleChangeCat} name="categories" value={selectedCat}  >
                        {
                            categories.map((c) => (

                                <option value={c.id} key={c.id}>{c.name}</option>
                            ))
                        }

                    </select>
                    <button type='submit'>Agregar</button>
                    {/* <div>
                        {
                            getNames(input.categories).map((c) => <p>{c}</p>)
                        }
                    </div> */}
                </form>

                <form onSubmit={handleSubmit} className='form'>
                    <p>Titulo</p>
                    <input name="title"
                        type="text"
                        value={input.title}
                        placeholder="Titulo"
                        onChange={handleChange}
                        required />
                    <br />
                    <p>Descripcion</p>
                    <textarea name="description"
                        type="text"
                        value={input.description}
                        placeholder="Descripcion"
                        onChange={handleChange}
                        required />
                    <br />
                    <p>Precio</p>
                    <input name="price"
                        type="text"
                        value={input.price}
                        placeholder="Precio"
                        onChange={handleChange}
                        required />
                    <br />
                    <p>Stock</p>
                    <input name="stock"
                        type="text"
                        value={input.stock}
                        placeholder="Stock"
                        onChange={handleChange}
                        required />
                    <br />


                    <br />
                    <p>Imagenes</p>
                    <div className={Styles.imgContainer}>
                        {
                            input.images.map(img =>
                                // <div className={Styles.images}>
                                //     <img src={img.url} />
                                //     <button onClick={onDelete} value={img.url}>X</button>
                                // </div>
                                <div className={Styles.pictureAdd}>
                                    <div className={Styles.containerArtImage}>
                                        <img width='100' height='100' src={img.url} />
                                    </div>
                                    <button onClick={onDelete} value={img.url}>x</button>
                                </div>
                            )
                        }
                        <div className={Styles.pictureAdd}>
                            <label for='files' >
                                <div className={Styles.containerArtImage}>
                                    Seleccionar imagen
                                        </div>
                                <div className={Styles.progressBar}>
                                    <progress value={upload.process} ></progress>
                                </div>
                            </label>
                            {/*  <div className='inputFile'> */}
                            <input className={Styles.inputFile} type='file' id='files' onChange={handleUpload} />
                            {/* </div> */}
                        </div>
                    </div>

                    <button type="submit" value="Editar" className='button'
                    >EDITAR</button>
                </form>

            </div>
            {/* <div className={Styles.btnProduct}>
                <button className={Styles.btn} >Editar producto</button>
            </div> */}
        </div>
    )
}

export default EditProduct
