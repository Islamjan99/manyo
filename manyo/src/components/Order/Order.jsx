import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../..'
import style from './Order.module.css'
import { nanoid } from 'nanoid'

export default function Order() {
    const { device } = useContext(Context)
    const { user } = useContext(Context)
    const [ agr, setAgr ] = useState(false)
    const [ ref, setRef ] = useState(false)
    const size = 8
    let id = nanoid(size)
    // Адрес
    const [ town, setTown ] = useState()
    const [ street, setStreet] = useState()
    const [ houseNumber, sethouseNumber ] = useState()
    const [ entrance, setEntrance ] = useState()
    const [ floor, setFloor ] = useState()
    const [ apartmentNumber, setApartmentNumber ] = useState()
    // 

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
    const log2 = () => {
        console.log(user.users.email);
        console.log(`ID пользователя: ${user.users.id}. Имя: ${user.users.name}. Фамилия: ${user.users.lastName}. Тел: ${user.users.phone}`);
        console.log(product);
    }
    const log = () => {
        console.log(`${town}, ${street}, ${houseNumber}, ${entrance}, ${floor}, ${apartmentNumber}` , id)
    }

    // дата и время

    let date = new Date();
    console.log(`Год: ${date.getFullYear()}, Месяц: ${date.getMonth()}, День: ${date.getDate()}, Время: ${date.getHours()}:${date.getMinutes()}`);
    return (
        <div className={style.container}>
            <center>
                <h2>Подтверждение заказа</h2>
                <h3>Пожауйста проверти данные</h3>
            </center>
            <button onClick={log}>log</button>
            <div className={style.order__block}>
                <div className={style.order__product}>
                    <div>
                        <h3 className={style.h3}>Подобности заказа</h3>
                        
                    </div>
                    <div>
                        <div>
                            <p className={style.line}>Название, количество, цена продукта</p>
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

                <div className={style.personal__data}>
                    <h3 className={style.h3}>Личные данные</h3>
                    <div className={style.order__form}>
                        
                        <div className={style.personal__data}>
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
                            <div>
                                Доставка {ref ? <input type="checkbox" onClick={refuse}/> : <input type="checkbox" onClick={agree}/> }

                                    <div className={style.p}><span >Согласен получитить <br /> товар без точной даты  </span> <input className={style.i} type="checkbox"/> </div>
                                    <p>(Ваш заказ будет подтвержден <br />  менеджером по телефону <br />  в течение суток)</p>

                            </div>
                        </div>

                        <div className={style.delivery__form}>
                            <div>
                                
                                {
                                    agr 
                                    ? 
                                    <div className={style.delivery__inp}>
                                        <div> Введите адрес доставки</div>

                                        <p className={style.line__info}>Город</p>
                                        <input 
                                            className={style.inp__address} 
                                            onChange={e => setTown(e.target.value)}
                                            value={town} 
                                            type="text" 
                                            placeholder="Введите город"
                                        />
                                        
                                        <p className={style.line__info}>Улица</p>
                                        <input 
                                            className={style.inp__address} 
                                            onChange={e => setStreet(e.target.value)}
                                            value={street} 
                                            type="text" 
                                            placeholder="Введите улицу"
                                        />

                                        <p className={style.line__info}>Номер дома</p>
                                        <input 
                                            className={style.inp__address} 
                                            onChange={e => sethouseNumber(e.target.value)}
                                            value={houseNumber} 
                                            type="text" 
                                            placeholder="Введите номер дома"
                                        />

                                        <p className={style.line__info}>Подъезд</p>
                                        <input 
                                            className={style.inp__address} 
                                            onChange={e => setEntrance(e.target.value)}
                                            value={entrance} 
                                            type="text" 
                                            placeholder="Введите подьезд дома"
                                        />

                                        <p className={style.line__info}>Этаж</p>
                                        <input 
                                            className={style.inp__address} 
                                            onChange={e => setFloor(e.target.value)}
                                            value={floor} 
                                            type="text" 
                                            placeholder="Введите этаж квартиры "
                                        />

                                        <p className={style.line__info}>Номер квартиры</p>
                                        <input 
                                            className={style.inp__address} 
                                            onChange={e => setApartmentNumber(e.target.value)}
                                            value={apartmentNumber} 
                                            type="text" 
                                            placeholder="Введите номер квартиры"
                                        />

                                        <p className={style.p}>(Стоимость доставки обговорит менеджер)</p>
                                        <button onClick={log}>подтвертить адрес</button>
                                    </div>
                                    : 
                                    ''
                                }
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
