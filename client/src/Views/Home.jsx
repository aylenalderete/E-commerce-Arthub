import React from 'react'
import NavBar from '../Components/NavBar'
import Carrousel from '../Components/Carrousel/carrousel';
import Styles from './home.module.css'

function Home() {
    return (
        <div>
            
            <NavBar renderTop={true} />
            <div className={Styles.titleContainer}>
                <h1 className={Styles.title}>arthub</h1>
                <p className={Styles.subtitle}>art on the spotlight and stuff</p>
            </div>
            <Carrousel></Carrousel>
        </div>
    )
}


export default Home
