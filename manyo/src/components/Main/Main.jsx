import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import style from './Main.module.css'
import heart from '../../imgContainer/img/heart.png'
import mainBackground from '../../imgContainer/img/9c5928f7eca80b5c5fbf8bc9b9b06b22.jpg'

const PORT = 5000;

export default function Main() {
    // const [das, setDas] = useState([])

    // const getData = async () =>  {
    //  let {rows} = await axios(`http://localhost:5000/api/device`)
    //  setDas(rows)
     
    // }

    return (
        <div className={style.container} >
            <div className={style.main}>
                <img src={mainBackground} alt={mainBackground} />
            </div>
            <div className={style.block}>
                 {
                     das.map(item => (
                         <ul key={item.id}>
                            <div className={style.blockImg}>
                                <img className={style.itemImg} src={item.urlImg} alt="" />
                            </div>

                            <li>{item.title}</li>
                            <li>{item.description}</li>
                            <li>{item.price}</li>
                            <button className={style.btn} >{item.status ? '❤️' : <button className={style.btn}><img className={style.hea} src={heart} alt="" /> </button>}</button>
                         </ul>
                         
                     ))
                 }
            </div>
            <button onClick={getData}>asd</button>
        </div>
    )
}
