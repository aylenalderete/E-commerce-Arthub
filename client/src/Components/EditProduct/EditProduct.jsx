import React, { useEffect, useState } from 'react';
import Styles from './EditProduct.module.css';
import axios from 'axios';
import NavBar from '../NavBar/NavBar.jsx';
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
                        images: [...input.images, { url: urlImg }]
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
    useEffect(() => {

        async function prod() {
            let setProd = (await axios.get(`http://localhost:3001/products/${id}`)).data;
            setInput({
                ...setProd,
                categories: setProd.categories.map(cat => cat.id),
                images: setProd.images.map(img => ({ url: img.url }))
            });
        }

        prod();
    }, [])


    // ---------- para el select de cateogrias ----------
    const [categories, setCategories] = useState([]);
    const [selectedCat, setSelectedCat] = useState('');


    useEffect(() => {
        async function cat() {
            let setCat = (await axios.get('http://localhost:3001/products/category')).data;
            setCategories(setCat);
        }    // console.log('Estas categorias vienen de la base de datos: ', cat)
        cat();
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

    function handleClickCat(ev) {
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
        if (input.title.length >= 40) {
            alert('El titulo no puede tener mas de 40 caracteres');
        }
        else if (input.images.length === 0) {
            alert('Debe agregar por lo menos una imagen');

        } else if (input.categories.length === 0) {
            alert('Debe agregar por lo menos una categoria');
        }
        else {

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

    }

    // ----- borrar imagenes ---
    function onDelete(ev) {

        setInput({
            ...input,
            images: [...input.images.filter(img => img.url !== ev.target.value)]
        });
    }


    return (
        <div className={Styles.navBaralign}>
            <NavBar renderTop={false}></NavBar>


            <div className={Styles.mainContainer}>
                <div className={Styles.divTitle}>
                    <p className={Styles.divTitle}>Editar producto</p>
                </div>


                <form className={Styles.formCategory} onSubmit={handleSubmitCat}>
                    <p className={Styles.text}>Categorias</p>
                    <div className={Styles.alignForm}>
                        <select className={Styles.selectCategory} onChange={handleChangeCat} name="categories" value={selectedCat}  >
                            <option className={Styles.options} value='' >seleccionar</option>
                            {

                                categories.map((c) => (

                                    <option className={Styles.options} value={c.id} key={c.id}>{c.name}</option>
                                ))
                            }

                        </select>
                        <button className={Styles.btnCategory} type='submit'>Agregar</button>
                    </div>
                    <div className={Styles.alignSelectedCat}>
                        {

                            input.categories.map(cat => (
                                categories.find(category => category.id === cat) &&
                                <div className={Styles.alignCatSelected}>
                                    <p className={Styles.showCategory}>{getNames([cat])}</p> {/* la funcion get names me trae el nombre pero recibe array asi que por eso está asi */}
                                    <button className={Styles.btnDelete} onClick={handleClickCat} value={cat}>x</button>
                                </div>
                            ))
                        }
                    </div>
                    {/* <div>
                        {
                            getNames(input.categories).map((c) => <p>{c}</p>)
                        }
                    </div> */}
                </form>

                <form className={Styles.containerForm2} onSubmit={handleSubmit} >
                    <p className={Styles.text}>Titulo</p>
                    <input className={Styles.input}
                        name="title"
                        type="text"
                        value={input.title}
                        placeholder="Titulo"
                        onChange={handleChange}
                        required />
                    <br />
                    <p className={Styles.text}>Descripcion</p>
                    <textarea
                        className={Styles.input2}
                        name="description"
                        type="text"
                        value={input.description}
                        placeholder="Descripcion"
                        onChange={handleChange}
                        required />
                    <br />
                    <p className={Styles.text}>Precio</p>
                    <input
                        className={Styles.input}
                        name="price"
                        type="number"
                        value={input.price}
                        placeholder="Precio"
                        onChange={handleChange}
                        required />
                    <br />
                    <p className={Styles.text}>Stock</p>
                    <input
                        className={Styles.input}
                        name="stock"
                        type="number"
                        value={input.stock}
                        placeholder="Stock"
                        onChange={handleChange}
                        required />
                    <br />


                    <br />
                    <p className={Styles.text}>Imagenes</p>
                    <div className={Styles.file} >
                        <div className={Styles.containerImgs}>
                            <div className={Styles.container2}>
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
                                            <button className={Styles.btnDelete2} onClick={onDelete} value={img.url}>x</button>
                                        </div>
                                    )
                                }
                            </div>
                            <div className={Styles.container3}>
                                <label className={Styles.label2} for='files' >
                                    <div className={Styles.containerArtImage}>
                                        Seleccionar imagen
                                        </div>
                                    <div className={Styles.progressBar}>
                                        <progress value={upload.process} ></progress>
                                    </div>
                                    <div onChange={handleUpload} className={Styles.btnSelect}>seleccionar</div>
                                </label>
                                {/*  <div className='inputFile'> */}
                                <input className={Styles.inpt} type='file' id='files' onChange={handleUpload} />
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                    <button type="submit" value="Editar" className={Styles.btn}
                    >Editar</button>
                </form>

            </div>
            {/* <div className={Styles.btnProduct}>
                <button className={Styles.btn} >Editar producto</button>
            </div> */}
        </div>

    )
}

export default EditProduct
