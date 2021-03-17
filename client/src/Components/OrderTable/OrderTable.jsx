import React from 'react'
import fakeList from "../../fakeList"
import Styles from "./OrderTable.module.css"

function OrderTable() {
    return (
        <div className={Styles.mainContainer}>
            <div>
                <p className={Styles.p}>Ordenes</p>
            </div>
            <table className={Styles.table}>
                <tr className={Styles.tr}>
                    <th className={Styles.th}>N° orden</th>
                    <th className={Styles.th}>Fecha</th>
                    <th className={Styles.th}>Estado</th>
                    <th className={Styles.th}>Productos</th>
                    <th className={Styles.th}>Nombre del cliente</th>
                    <th className={Styles.th}>Precio total</th>
                    <th className={Styles.th}></th>                    
                </tr>
                {
                    fakeList.map((p) => (
                        <tr className={Styles.tr}>
                            <th className={Styles.th}>1</th>
                            <th className={Styles.th}>17/3/2021</th>
                            <th className={Styles.th}>Pendiente</th>
                            <th className={Styles.th}>1 cuadro {p.name}</th>
                            <th className={Styles.th}>{p.artist}</th>
                            <th className={Styles.th}>$2000</th>
                            <button className={Styles.btn}>Ver más</button>
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}

export default OrderTable
