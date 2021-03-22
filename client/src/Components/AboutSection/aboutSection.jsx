import React from 'react';
import Styles from './aboutSection.module.css';
import aylu from '../../Images/team/aylu.jpg'
import flor from '../../Images/team/flor.jpg';
import jorge from '../../Images/team/jorge.jpeg';
import liz from '../../Images/team/liz.jpg';
import mati from '../../Images/team/mati.jpg';
import santiL from '../../Images/team/santilongueira.jpeg';
import santiM from '../../Images/team/santimolina.jpg';
import noPic from '../Assets/profPic.jpg';
import andres from '../../Images/team/andres.jpeg';
import agustina from '../../Images/team/agustina.jpeg'
import linkedin from '../../Images/linkedin.svg';


export default function AboutUsSection() {
    return (
        <div className={Styles.mainContainer}>
            <h1 className={Styles.title}>Nuestro equipo</h1>
            <div className={Styles.teamCards}>

                <div className={Styles.teamCard}>
                    <div className={Styles.imgContainer}>
                        <img className={Styles.img} src={santiL} alt='Team member: Santi Longueira' />
                        <a className={Styles.link} target="_blank" href="https://www.linkedin.com/in/santiago-longueira-88501a1ba/">
                            <div className={Styles.divHover}>
                                <img className={Styles.logo} src={linkedin} alt='linkedin' />
                            </div>
                        </a>
                    </div>
                    <div className={Styles.infoContainer}>
                        <p className={Styles.name}>Santi Longueira</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </div>
                </div>

                <div className={Styles.teamCard}>
                    <div className={Styles.imgContainer}>
                        <img className={Styles.img} src={liz} alt='Team member: Liza Saravia' />
                        <a className={Styles.link} target="_blank" href="https://www.linkedin.com/in/liza-saraviag/">
                            <div className={Styles.divHover}>
                                <img className={Styles.logo} src={linkedin} alt='linkedin' />
                            </div>
                        </a>
                    </div>
                    <div className={Styles.infoContainer}>
                        <p className={Styles.name}>Liza Saravia</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>

                    </div>

                </div>

                <div className={Styles.teamCard}>
                    <div className={Styles.imgContainer}>
                        <img className={Styles.img} src={flor} alt='Team member: Flor Almada' />
                        <a className={Styles.link} target="_blank" href="https://www.linkedin.com/in/floralmada/">
                            <div className={Styles.divHover}>
                                <img className={Styles.logo} src={linkedin} alt='linkedin' />
                            </div>
                        </a>
                    </div>
                    <div className={Styles.infoContainer}>
                        <p className={Styles.name}>Flor Almada</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>

                    </div>

                </div>

                <div className={Styles.teamCard}>
                    <div className={Styles.imgContainer}>
                        <img className={Styles.img} src={santiM} alt='Team member: Santi Molina' />
                        <a className={Styles.link} target="_blank" href="https://www.linkedin.com/in/santiago-molina-js/">
                            <div className={Styles.divHover}>
                                <img className={Styles.logo} src={linkedin} alt='linkedin' />
                            </div>
                        </a>
                    </div>
                    <div className={Styles.infoContainer}>
                        <p className={Styles.name}>Santi Molina</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>

                    </div>

                </div>

                <div className={Styles.teamCard}>
                    <div className={Styles.imgContainer}>
                        <img className={Styles.img} src={aylu} alt='Team member: Aylen Alderete' />
                        <a className={Styles.link} target="_blank" href="https:linkedin.com/in/aylenalderete/">
                            <div className={Styles.divHover}>
                                <img className={Styles.logo} src={linkedin} alt='linkedin' />
                            </div>
                        </a>
                    </div>
                    <div className={Styles.infoContainer}>
                        <p className={Styles.name}>Aylen Alderete</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>

                    </div>

                </div>

                <div className={Styles.teamCard}>
                    <div className={Styles.imgContainer}>
                        <img className={Styles.img} src={jorge} alt='Team member:Jorge Macias' />
                        <a className={Styles.link} target="_blank" href="https://www.linkedin.com/in/macias-jorge/">
                            <div className={Styles.divHover}>
                                <img className={Styles.logo} src={linkedin} alt='linkedin' />
                            </div>
                        </a>
                    </div>
                    <div className={Styles.infoContainer}>
                        <p className={Styles.name}>Jorge Macias</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>

                    </div>
                </div>

                <div className={Styles.teamCard}>
                    <div className={Styles.imgContainer}>
                        <img className={Styles.img} src={agustina} alt='Team member: Agustina Coronado' />
                        <a className={Styles.link} target="_blank" href="https://www.linkedin.com/in/agustina-coronado/">
                            <div className={Styles.divHover}>
                                <img className={Styles.logo} src={linkedin} alt='linkedin' />
                            </div>
                        </a>
                    </div>
                    <div className={Styles.infoContainer}>
                        <p className={Styles.name}>Agustina Coronado</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>

                    </div>

                </div>

                <div className={Styles.teamCard}>
                    <div className={Styles.imgContainer}>
                        <img className={Styles.img} src={mati} alt='Team member: Matias Cheverry' />
                        <a className={Styles.link} target="_blank" href="https://www.linkedin.com/in/cheverry/">
                            <div className={Styles.divHover}>
                                <img className={Styles.logo} src={linkedin} alt='linkedin' />
                            </div>
                        </a>
                    </div>
                    <div className={Styles.infoContainer}>
                        <p className={Styles.name}>Matias Cheverry</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>

                    </div>

                </div>

                <div className={Styles.teamCard}>
                    <div className={Styles.imgContainer}>
                        <img className={Styles.img} src={andres} alt='Team member: Andres Gomez' />
                        <a className={Styles.link} target="_blank" href="https://www.linkedin.com/in/andres-alberto-gomez-mora-react-native/">
                            <div className={Styles.divHover}>
                                <img className={Styles.logo} src={linkedin} alt='linkedin' />
                            </div>
                        </a>
                    </div>
                    <div className={Styles.infoContainer}>
                        <p className={Styles.name}>Andres Gomez</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>

                    </div>

                </div>

            </div>


        </div>
    )
}

