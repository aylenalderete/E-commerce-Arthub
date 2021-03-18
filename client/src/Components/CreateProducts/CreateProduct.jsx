import React, { useState, useEffect } from "react";
import Styles from "./CreateProduct.module.css";
import firebase from "firebase";
import axios from "axios";
import { setUrlImages } from "../../Actions/setUrlImage.js";
import { clearUrlImage } from "../../Actions/clearUrlImage";
import { connect, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar.jsx";

const firebaseConfig = {
    apiKey: "AIzaSyDJ5J7_0pkNGDhDo1mIkVB0Gyrzvyk7J5U",
    authDomain: "henry-art.firebaseapp.com",
    projectId: "henry-art",
    storageBucket: "henry-art.appspot.com",
    messagingSenderId: "780293113241",
    appId: "1:780293113241:web:89382d33be6a51b0cebf08",
    measurementId: "G-HWGTY5PZ8T",
};

firebase.initializeApp(firebaseConfig);

export const validate = (product) => {

    let errors = {};
    if (!product.title) {
        errors.title = 'el título es obligatorio';
    } else if (product.title.length > 40) {
        errors.title = 'el título debe tener menos de 40 caracteres';

    }

    if (!product.description) {
        errors.description = 'la descripción es obligatoria';
    }

    if (!product.price) {
        errors.price = 'el precio es obligatorio';
    } else if (!/^\d+(\.\d+)?$/.test(product.price)) {
        errors.price = 'el precio es invalido';
    }

    if (!product.stock) {
        errors.stock = 'el stock es obligatorio';
    } else if (!/^\d+$/.test(product.stock)) {
        errors.stock = 'el stock es invalido';
    }

    if (product.categories.length === 0) {
        errors.categories = 'debe seleccionar por lo menos una categoria';
    }

    // if (urlImages.length === 0) {
    //     errors.images = 'debe cargar por lo menos una imagen'
    // }
    return errors;
};

function CreateProduct(props) {
    const [product, setProduct] = useState({
        title: "",
        description: "",
        price: "",
        stock: "",
        categories: [],
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const { urlImages } = useSelector((state) => state);
    //carga de imagenes
    const [upload, setUpload] = React.useState({
        process: 0,
        picture: "",
    });

    const [refresh, setRefresh] = React.useState([]);
    function handleUpload(event) {
        const file = event.target.files[0];
        console.log(event.target.files);

        if (event.target.files.length) {
            const storageRef = firebase.storage().ref(`/images/${file.name}`);
            const task = storageRef.put(file);

            task.on(
                "state_changed",
                (snapshot) => {
                    let percentage =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(snapshot);
                    setUpload({
                        process: percentage,
                    });
                },
                (error) => {
                    console.log(error.message);
                },
                () => {
                    storageRef.getDownloadURL().then((url) => {
                        console.log("la url es: ", url);
                        let arrayImages = props.urlImages;
                        arrayImages.push(url);
                        props.setUrlImages(arrayImages);
                        console.log("termino1", props.urlImages);
                        setRefresh([1, 2]);
                    });
                }
            );
        }
    }

    function onDelete(event) {
        console.log("imagen tocada:", event.target.value);
        let urlImages = props.urlImages.filter(
            (value) => value != event.target.value
        );
        props.setUrlImages(urlImages);
        console.log("restante:", urlImages);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value, userId: 3 });
        setErrors(validate({
            ...product,
            [name]: value
        }));
    };

    function onFocus(ev) {
        setTouched({
            ...touched,
            [ev.target.name]: true
        })
    }

    const sendProduct = () => {
        // console.log(product, urlImages);
        // if (product.title.length >= 40) {
        //     alert('El titulo no puede tener mas de 40 caracteres');
        // }
        if (product.categories.length === 0) {
            alert('Debe seleccionar por lo menos una categoria');
        }
        else if (urlImages.length === 0) {
            alert('Debe agregar por lo menos una imagen');

        } else {

            axios
                .post(`http://localhost:3001/products`, { ...product, images: urlImages })
                .then((res) => {
                    alert("Producto creado");
                    console.log(res.data);
                })
                .catch((error) => {
                    alert("No se pudo crear el producto");
                    console.log(error);
                });
            props.clearUrlImage();
        }
    };

    const handleSubmit = (e) => e.preventDefault();

    // ---------- Select de categorias ----------
    const [categories, setCategories] = useState([]);
    const [selectedCat, setSelectedCat] = useState("");

    useEffect(() => {

        async function request() {
            let cat = (await axios.get("http://localhost:3001/products/category")).data;
            setCategories(cat);
        }

        request();

    }, []);

    function handleChangeCat(ev) {
        setSelectedCat(ev.target.value);
        setErrors(validate({
            ...product,
            [ev.target.name]: ev.target.value
        }));
    }

    function handleSubmitCat(ev) {
        ev.preventDefault();
        if (product.categories.includes(selectedCat)) {
            alert(`Ya se agregó ${getNames([selectedCat])[0]} como categoria`);
        } else {
            setProduct({
                ...product,
                categories: [...product.categories, selectedCat],
            });
        }
    }

    function getNames(arr) {
        let names = [];
        categories.forEach((c) => {
            arr.forEach((id) => {
                if (parseInt(id) === c.id) {
                    names.push(c.name);
                }
            });
        });
        return names;
    }

    return (
        <div className={Styles.navBaralign}>
            <NavBar renderTop={false}></NavBar>
            <div className={Styles.mainContainer}>
                <div className={Styles.secondContainer}>
                    <div className={Styles.divTitle}>
                        <p>crear producto</p>
                    </div>
                    <form
                        className={Styles.formCategory}
                        onSubmit={handleSubmitCat}
                    >
                        <div className={Styles.alignForm}>
                            <select
                                className={Styles.selectCategory}
                                onChange={handleChangeCat}
                                name="categories"
                                value={selectedCat}
                                >
                                {categories.map((c) => (
                                    <option
                                        onFocus={onFocus}
                                        className={Styles.options}
                                        value={c.id}
                                        key={c.id}
                                    >
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            <button className={Styles.btnCategory} type="submit">
                                Agregar
                    </button>
                        </div>
                        <div className={Styles.alignSelectedCat}>
                            {getNames(product.categories).map((c) => (
                                <p className={Styles.showCategory}>{c}</p>
                            ))}
                        </div>
                        {
                            errors.categories && touched.categories && <p>{errors.categories}</p>
                        }
                    </form>

                    <form className={Styles.containerForm2} onSubmit={handleSubmit}>
                        <input
                            className={Styles.input}
                            value={product.title}
                            name="title"
                            onChange={handleChange}
                            placeholder="título"
                            required
                            onFocus={onFocus}
                        ></input>
                        {
                            errors.title && touched.title && <p>{errors.title}</p>
                        }
                        <input
                            className={Styles.input}
                            value={product.description}
                            name="description"
                            onChange={handleChange}
                            placeholder="descripción"
                            required
                            onFocus={onFocus}
                        ></input>
                        {
                            errors.description && touched.description && <p>{errors.description}</p>
                        }
                        <input
                            className={Styles.input}
                            value={product.price}
                            name="price"
                            onChange={handleChange}
                            placeholder="precio"
                            required
                            onFocus={onFocus}
                        ></input>
                        {
                            errors.price && touched.price && <p>{errors.price}</p>
                        }
                        <input
                            className={Styles.input}
                            value={product.stock}
                            name="stock"
                            onChange={handleChange}
                            placeholder="stock"
                            required
                            onFocus={onFocus}
                        ></input>
                        {
                            errors.stock && touched.stock && <p>{errors.stock}</p>
                        }

                        <div className={Styles.file}>
                            <div className={Styles.containerImgs}>
                                <div className={Styles.container2}>
                                    {props.urlImages &&
                                        props.urlImages.map((value) => (
                                            <div className={Styles.pictureAdd}>
                                                <img width="100" height="100" src={value} />

                                                <button
                                                    className={Styles.btnDelete}
                                                    onClick={onDelete}
                                                    value={value}
                                                >
                                                    x
                        </button>
                                            </div>
                                        ))}
                                </div>


                                <div className={Styles.container3}>
                                    <label className={Styles.label2} for="files">
                                        <div className={Styles.containerArtImage}>
                                            Seleccionar imagen
                    </div>
                                        <div className={Styles.progressBar}>
                                            <progress value={upload.process}></progress>
                                        </div>
                                        <div className={Styles.btnSelect}>seleccionar</div>
                                    </label>
                                    {/*  <div className='inputFile'> */}
                                    <input
                                        className={Styles.inpt}
                                        type="file"
                                        id="files"
                                        onChange={handleUpload}
                                    />
                                    {/* </div> */}
                                </div>
                            </div>
                            {/* <input className={Styles.btnFile} type="file" name="file" accept= ".jpeg, .png, .jpg"/> */}
                        </div>
                    </form>

                    <button className={Styles.btn} onClick={sendProduct}>
                        Crear producto
        </button>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        urlImages: state.urlImages, //Firebase
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setUrlImages: (urlImages) => dispatch(setUrlImages(urlImages)), //Firebase
        clearUrlImage: () => dispatch(clearUrlImage()), //Firebase

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
