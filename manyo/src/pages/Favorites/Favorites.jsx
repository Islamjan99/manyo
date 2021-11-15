import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../..'
import style from './Favorites.module.css'
import star from '../../assets/star.png'
import {useHistory} from "react-router-dom"
import { DEVICE_ROUTE } from '../../Utils/Consts';

const Favorites = observer(() => {
    const history = useHistory()
    const { device } = useContext(Context)
    const [ data, setData ] = useState([])


    useEffect(() => {
        if (localStorage.getItem('favorites') != null ) {
            device.getLocalFavorites()
            setData(JSON.parse(localStorage.getItem('favorites')))
        }
       
    }, [ device ])

    const getFavorites = () => {
        
    }

    const log = () => {
        device.favorites.map(i => console.log(i))
    }


    return (
        <div className={style.container}>
            <center><h2>Избранное</h2></center>
            <div>
                <button onClick={() => log()}>log</button>
                <button onClick={() => getFavorites()}>get</button>
            </div>
            <div className={style.block__item}>
            {
                    data.map(produ => {
                        return (
                            <div key={produ.id} className={style.item}>
                                <div  className="d-flex flex-wrap" style={{width: 200}} border={"light"}  onClick={() => history.push(DEVICE_ROUTE + '/' + produ.id + '/' )}>
                                    <img className={style.item_img} style={{cursor: "pointer"}} width={200} height={200} src={process.env.REACT_APP_API_URL + produ.img} alt=""/>
                                    <div className="text-black-50 mt-1 d-flex align-items-center">
                                        <div style={{cursor: "pointer"}}></div>
                                    </div>
                                </div>
                                    <div className={style.block__name}>
                                        <div>
                                            {produ.name}
                                        </div>
                                        <div className={style.block__rating}>
                                            <div className={style.rating}>{produ.rating}</div>
                                            <img className={style.rating__img} src={star} alt={star}/>
                                        </div>
                                    </div>
                                <div >
                                    <div className={style.block__price}>
                                      <p>Цена:</p>
                                      <p>{produ.price >= 1 ? produ.price: produ.price}</p>
                                    </div>
                                        

                                </div>
                            </div>
                        )  
                        })
                }
            </div>
            
        </div>
    )
})

export default Favorites