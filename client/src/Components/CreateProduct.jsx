import React, {useState, useEffect } from 'react'
import Styles from "./CreateProduct.module.css"
import firebase from 'firebase';
import axios from 'axios'
import {setUrlImages} from "../Actions/setUrlImage.js"
import { connect, useSelector } from "react-redux";

const firebaseConfig = {
    apiKey: "AIzaSyDJ5J7_0pkNGDhDo1mIkVB0Gyrzvyk7J5U",
    authDomain: "henry-art.firebaseapp.com",
    projectId: "henry-art",
    storageBucket: "henry-art.appspot.com",
    messagingSenderId: "780293113241",
    appId: "1:780293113241:web:89382d33be6a51b0cebf08",
    measurementId: "G-HWGTY5PZ8T"
  };

  firebase.initializeApp(firebaseConfig)

function CreateProduct(props) {
    const [product, setProduct] = useState({title: "", description: "", price: "", stock: "", categories: []})
    const {urlImages} = useSelector(state=>state)
    //carga de imagenes
    const [upload,setUpload] = React.useState({process:0,
        picture:''});

    const[refresh,setRefresh] = React.useState([])
    function handleUpload(event){

    const file = event.target.files[0];
    console.log(event.target.files)

    if(event.target.files.length){
        const storageRef = firebase.storage().ref(`/images/${file.name}`)
        const task = storageRef.put(file)

        task.on('state_changed', snapshot =>{
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes)*100
            console.log(snapshot)
            setUpload({
                process:percentage
            })

        },error => {
            console.log(error.message)
            },()=>{
                storageRef.getDownloadURL().then(url => {
                    console.log('la url es: ',url)
                    let arrayImages = props.urlImages;
                    arrayImages.push(url)
                    props.setUrlImages(arrayImages)
                    console.log('termino1', props.urlImages)
                    setRefresh([1,2])
                          
                    });

                } )
        }

    }

    function onDelete(event) {

        console.log('imagen tocada:',event.target.value)
        let urlImages = props.urlImages.filter(value=>value!=event.target.value)
        props.setUrlImages(urlImages)
        console.log('restante:',urlImages)
    }
    //******************************************* */

    const handleChange = (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]:value})
      }
      
    const sendProduct = () => {
        console.log(product, urlImages)
        axios.post(`http://localhost:3001/products`, {...product, images: urlImages })
        .then((res) => {
            alert("Producto creado")
            console.log(res.data)
        })
        .catch((error) => {
            alert("No se pudo crear el producto")
            console.log(error)
        })
    }

    const handleSubmit = (e) => e.preventDefault();

    // ---------- Select de categorias ----------
    const [categories, setCategories] = useState([]);
    const [selectedCat, setSelectedCat] = useState('');


    useEffect(async () => {
        let cat = (await axios.get('http://localhost:3001/products/category')).data;
        // console.log('Estas categorias vienen de la base de datos: ', cat)
        setCategories(cat)
    }, [])

    function handleChangeCat(ev) {
        setSelectedCat(
            ev.target.value
        );
    }

    function handleSubmitCat(ev) {
        ev.preventDefault();
        if (product.categories.includes(selectedCat)) {
            alert(`Ya se agregó ${getNames([selectedCat])[0]} como categoria`)
        }else{
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
                    names.push(c.name)
                }
            })

        })
        return names;
    }
    // ---------- Select de categorias ----------

    return (
        <div>
            <div className={Styles.divTitle}>
                <p>Crear producto</p>
            </div>
             {/* ---------- Select de categorias ---------- */}

             <form className='form-bottom' onSubmit={handleSubmitCat}>
                <select onChange={handleChangeCat} name="categories" value={selectedCat}  >
                    {
                        categories.map((c) => (

                            <option value={c.id} key={c.id}>{c.name}</option>
                        ))
                    }

                </select>
                <button type='submit'>Agregar</button>
                <div>
                    {
                        getNames(product.categories).map((c) => <p className={Styles.cat} >{c}</p>)
                    }
                </div>
            </form>
            {/* ---------- Select de categorias ---------- */}
            <form className={Styles.form} onSubmit={handleSubmit}>
                <input className={Styles.input} value={product.title} name= "title" onChange={handleChange} placeholder="título"></input>
                <input className={Styles.input} value={product.description} name= "description" onChange={handleChange} placeholder="descripción"></input>
                <input className={Styles.input} value={product.price} name= "price" onChange={handleChange} placeholder="precio"></input>
                <input className={Styles.input} value={product.stock} name= "stock" onChange={handleChange} placeholder="stock"></input>
                {/* <Select
                    isMulti
                    isClearable={this.state.value.some(v => !v.isFixed)}
                    name="category"
                    onInputChange={handleInputChange}
                    options={selectCategory}
                    onChange={(e) => data.categories = e.map((value) => {return value.value})}
                /> */}
                <div className={Styles.file}>
                    <div className={Styles.gridFirebase}>
                                {
                                    props.urlImages && props.urlImages.map(value=>(
                                    
                                    <div className={Styles.pictureAdd}>
                                        <div className={Styles.containerArtImage}>
                                            <img width='100' height='100' src={value} />
                                        </div>
                                        <button onClick={onDelete} value={value}>x</button>
                                    </div>

                                    ))
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
                                    <input  className={Styles.inputFile} type='file' id='files' onChange={handleUpload} />
                                    {/* </div> */}
                                </div>
                            </div>
                    {/* <input className={Styles.btnFile} type="file" name="file" accept= ".jpeg, .png, .jpg"/> */}
                </div>
            </form>
            <div className={Styles.btnProduct}>
                <button className={Styles.btn} onClick={sendProduct}>Crear producto</button>
            </div>
        </div>
    )
}

//imagenes
function mapStateToProps(state) {
    return {
      urlImages : state.urlImages//Firebase
    };
  }
  
  function mapDispatchToProps(dispatch) {
      return {
       setUrlImages: (urlImages) => dispatch(setUrlImages(urlImages)),//Firebase
      };
    }

    export default connect(
        mapStateToProps,
        mapDispatchToProps
      )(CreateProduct);

// export default CreateProduct
