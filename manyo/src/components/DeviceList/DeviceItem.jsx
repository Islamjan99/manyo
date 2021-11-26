import React, { useEffect, useState } from 'react';
import Image from "react-bootstrap/Image";
import star from '../../assets/star.png'
import {useHistory} from "react-router-dom"
import {DEVICE_ROUTE} from "../../Utils/Consts";
import style from './Device.module.css';
import hard from '../../imgContainer/img/pngegg.png'
import hardLike from '../../imgContainer/img/heart-symbol-01.jpg' 

const DeviceItem = ({ device, addFavorites, removeLocalStorage, addBasket }) => {
    const history = useHistory()
    const [ likes, setLikes] = useState(false)
    const [ prod, setProd ] = useState()

    useEffect(() => {
        if (localStorage.getItem('favorites') != null) {
            const cart = JSON.parse(localStorage.getItem('favorites'));
            setProd(cart)
        }
    }, [])

    const localFavorites = (device) => {
        if (localStorage.getItem('favorites') != null) {
            const cart = JSON.parse(localStorage.getItem('favorites'));
            setProd(cart)
            console.log('if 1');
            if (prod != null) {
                addprod(device)

            } else {
                addprod(device)
                console.log('else 2');
            }

        } else {
            addprod(device)
            console.log('else 1');
        } 

    }

    const addprod = (device) => {
        if (likes === false) {
            setLikes(!likes)
            addFavorites(device)
            
        }
    }
    const removeLocal = (device) => {
        setLikes(!likes)
        removeLocalStorage(device.id)
    }
    const basMod = (device) => {
        addBasket(device)

    }

    return (
            <div className={style.item}>
                    <Image 
                        className={style.item_img} 
                        style={{cursor: "pointer"}}
                        width={350} height={350} 
                        src={process.env.REACT_APP_API_URL + device.img}
                        onClick={() => history.push(DEVICE_ROUTE + '/' + device.id )}
                    />
                        <div className={style.art}>Артикул товара: {device.id}</div>
                <div  className={style.block} style={{width: 350}} border={"light"}>
                    <div className={style.device__block}>
                        <div className={style.item_name} onClick={() => history.push(DEVICE_ROUTE + '/' + device.id )}>{device.name}</div>
                        <div>   {
                                    likes 
                                    ?
                                    <img 
                                        onClick={() => removeLocal(device)} 
                                        className={style.favorites} 
                                        src={hardLike} alt="" 
                                    /> 

                                    :
                                    <img 
                                        onClick={() => localFavorites(device)}
                                        className={style.favorites} 
                                        src={hard} alt="" 
                                    />

                                }
                        </div>
                        <div className={style.device__rating}>
                            <div>{device.rating}</div>
                            <Image className="d-flex flex-wrap" width={18} height={18} src={star}/>
                        </div>
                    </div>
                </div>
                <div className={style.item_cor}>
                    <div className={style.item_price}>
                    <p>{device.price} сом</p>
                    </div>
                </div> 
                    <button onClick={() => basMod(device)} key={device.id} className={style.item_btn}>В корзину</button> 
            </div>                                                                                                     
    );
};

export default DeviceItem;
