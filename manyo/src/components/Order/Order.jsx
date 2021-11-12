import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../..'
import style from './Order.module.css'

export default function Order() {
    const { device } = useContext(Context)
    const { user } = useContext(Context)
    const [ agr, setAgr ] = useState(false)
    const [ ref, setRef ] = useState(false)

    let product = []

    const finalPrice = []
    const [ b, setB] = useState()

    let a = []
    let x = 0

    useEffect(() => {
        finPrice()
        product = []

        device.basket.map(item => {
            product.push(item)
        })
    })

    const agree = () => {
        setAgr(true)
        setRef(true)
    }
    const refuse = () => {
        setAgr(false)
        setRef(false)
    }

    const finPrice = () => {
        device.basket.map(item => finalPrice.push(item.price))

        a.push(finalPrice.map(i=>x+=i, x=0).reverse()[0])
        
        a.map((number) => setB(number))
    }
    const log = () => {
        console.log(user.users.email);
        console.log(`ID пользователя: ${user.users.id}. Имя: ${user.users.name}. Фамилия: ${user.users.lastName}. Тел: ${user.users.phone}`);
        console.log(product);
    }


    return (
        <div className={style.container}>
            <center>
                <h2>Подтверждение заказа</h2>
                <h3 className={style.h3}>Пожауйста проверти данные</h3>
            </center>
            <button onClick={log}>log</button>
            <div className={style.order__block}>
                <div className={style.order__product}>
                    <div>
                        <h3 className={style.h3}>Подобности заказа</h3>
                        
                    </div>
                    <div>
                        <div>
                            <p className={style.line__info}>Название продукта, количество и  цена за 1 ед</p>
                        </div>
                        
                        <div className={style.block__prod}>
                            {device.basket.map(item => 
                                <> 
                                    <p>Название: {item.name}</p> 
                                    <p>Количество: {item.count} шт.</p>
                                    <p>Цена: {item.prices} KGS 1 ед.</p>
                                    <div className={style.line}> </div>
                                </>
                            )}
                        </div>
                        <h4 className={style.h4}>Итоговая сумма заказа </h4>
                        <h4>{b} KGS</h4>
                    </div>
                </div>

                <div className={style.order__form}>
                    <h3 className={style.h3}>Личные данные</h3>
                    <p>Имя</p> 
                    <div className={style.order__inp}>
                        <input className={style.inp} type="text" defaultValue={user.users.name}/> 
                        <input className={style.inp__checkbox} type="checkbox" onClick={refuse}/>
                    </div>
                    <p>Номер телефона</p>
                    <div className={style.order__inp}>
                        <input className={style.inp} type="number" defaultValue={user.users.phone}/>
                        <input className={style.inp__checkbox} type="checkbox" onClick={refuse}/>
                    </div>
                    <p>E-mail</p>
                    <div className={style.order__inp}>
                        <input className={style.inp} type="email" defaultValue={user.users.email}/>
                        <input className={style.inp__checkbox} type="checkbox" onClick={refuse}/>
                    </div>

                    <div className={style.delivery__form}>
                        <div>
                            Доставка {ref ? <input type="checkbox" onClick={refuse}/> : <input type="checkbox" onClick={agree}/> }
                        </div>
                        {
                            agr 
                            ? <div><div> Введите адрес доставки</div><input type="text" /> </div>
                            : <div>Точку самовывоза согласует менеджер по телефону </div>
                        }
                    </div>
                    <div>
                        <p>Согласен получитить товар без точной даты </p> 
                        <p>(Ваш заказ будет подтвержден менеджером по &nbsp;телефону в течение суток)</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
