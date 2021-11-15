import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../..'
import style from './Basket.module.css';
import Image from "react-bootstrap/Image";
import star from '../../assets/star.png'
import {useHistory} from "react-router-dom"
import { DEVICE_ROUTE, SENDING__AN_ORDER_ROUTER } from '../../Utils/Consts';
import { observer } from 'mobx-react-lite'
import { getOrder } from '../../Http/DeviceAPI';

const Basket = observer(() => {
    const history = useHistory()
    const { device } = useContext(Context)
    const { user } = useContext(Context)

    useEffect(() => {
        getOrder().then(data => device.setOrderHistory(data))
        if (localStorage.getItem('token') !== null) {
            user.setUsers()
        }
        if (device.basket !== null) {
        device.basket.map(item => data.push(item))
        log()
        }
       
    })

    const data = []
    const finalPrice = []
    const [ b, setB] = useState()

    let a = []
    let x = 0

    const remove = (id) => {
        device.removeProduct(id)
        log()
    }

    const Plus = (produ) => {
        device.basket.map(item  => {
            if (item.id === produ.id) {
                device.basketIncrement(produ)
                    log()
                }
                return item
        })
        
    }
    const Minus = (produ) => {
        device.basket.map(item  => {
            if (item.id === produ.id) {
                device.basketDecrement(produ)
                    log()
                }
                return item
        })
    }
    const order = () => {
        history.push(SENDING__AN_ORDER_ROUTER)
    }
    

    const log = () => {
        device.basket.map(item => finalPrice.push(item.price))

        a.push(finalPrice.map(i=>x+=i, x=0).reverse()[0])
        
        a.map((number) => setB(number))
    }

    return (
        <div className={style.container}>

            <div className={style.container}>
                <center><h2>Корзина</h2></center>
                <div className={style.block__item}>
                {
                    device.basket.map((produ, index) => {
                        return (
                            <div key={produ.id} className={style.item}>
                                <div  className={style.block__img} style={{width: 200}} border={"light"}  onClick={() => history.push(DEVICE_ROUTE + '/' + produ.id + '/' )}>
                                    <Image className={style.item_img} style={{cursor: "pointer"}} width={200} height={200} src={process.env.REACT_APP_API_URL + produ.img}/>
                                </div>
                                    <div className={style.block__name}>
                                        <div>
                                            {produ.name}
                                        </div>
                                        <div className={style.block__rating}>
                                            <div className={style.rating}>{produ.rating}</div>
                                            <Image className={style.rating__img} src={star} alt={star}/>
                                        </div>
                                    </div>
                                <div >
                                    <div className={style.block__price}>
                                      <p>Цена:</p>
                                      <p>{produ.price >= 1 ? produ.price: produ.price} сом</p>
                                    </div>
                                        
                                        <ul className={style.counter}>
                                            <li onClick={() => Plus(produ)} className={style.coun} >+</li>
                                            <div key={produ.id} className={style.count}>
                                                <p>{produ.count >= 1 ? produ.count: produ.count}</p>
                                            </div>
                                            <li onClick={() => Minus(produ)} className={style.coun} >-</li>
                                        </ul>
                                            
                                    <div className={style.remove__btn}>
                                        <button onClick={() => remove(produ.id)}>удалить</button>
                                    </div>
                                </div>
                            </div>
                        )  
                        })
                }
                </div>

                <div className={style.fil__price}>
                    <div className={style.fil__one}>
                        <h2>Итоговая сумма:</h2>
                        </div>
                    <div className={style.fil__two}>
                        <h3>{b !== undefined ? b : 0 } KGS</h3> 
                    </div>
                </div>
                
                <div className={style.orber__block}>
                    {
                        b !== undefined 
                        ? <button onClick={order} className={style.btn__order}>Заказать</button> 
                        : <h2 className={style.bas__empty}>Корзина пуста</h2>
                    }
                </div>
                
            </div>
        </div>
    )
})

export default Basket