import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../..'
import style from './Order.module.css'
import { createHistoryOrder, getOrder } from '../../Http/DeviceAPI'
import axios from 'axios'
import OrderModals from './OrderModals'

export default function Order() {
    const { device } = useContext(Context)
    const { user } = useContext(Context)
    const [ agr, setAgr ] = useState(false)
    const [ check, setCheck ] = useState(false)
    const [ handleChange, setHandleChange ] = useState(false)
    const [ smShow, setSmShow] = useState(false);
    let orderNum = device.OrderHistory.length + 1;
    // Адрес
    const [ town, setTown ] = useState()
    const [ street, setStreet] = useState()
    const [ houseNumber, sethouseNumber ] = useState()
    const [ entrance, setEntrance ] = useState()
    const [ floor, setFloor ] = useState()
    const [ apartmentNumber, setApartmentNumber ] = useState()
    // 
    const [ name, setName ] = useState(user.users.name)
    const [ phone, setPhone ] = useState(user.users.phone)
    const [ email, setEmail ] = useState(user.users.email)

    let product = []
    let createAddress = {}

    const finalPrice = []
    const [ b, setB] = useState()

    let a = []
    let x = 0

    let date = new Date();
    let AddDate = null
    let month = date.getMonth()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    
    useEffect(() => {
        AddDate = `День: ${date.getDate()} Месяц: ${month +=1} год: ${date.getFullYear()} Время: ${hours}:${minutes}`
        getOrder().then(data => device.setOrderHistory(data))
        finPrice()
        prod()
    })

    const saveAddress = () => {
        createAddress = {
            'Город': `${town}`,
            'Улица': `${street}`,
            'Дом': `${houseNumber}`,
            'Подьезд': `${entrance}`,
            'Этаж': `${floor}`,
            'Квартира': `${apartmentNumber}`,
        }
    }

    const prod = () => {
        product = []
        device.basket.map(item => {
            let tovar = `%0A Продукт: %0A Название: ${item.name}, %0A Цена: ${item.prices}, %0A Количество: ${item.count}`
            product.push(tovar)
            return item
        })
    }

    const agree = () => {
        setAgr(!agr)
    }

    const finPrice = () => {
        device.basket.map(item => finalPrice.push(item.price))

        a.push(finalPrice.map(i=>x+=i, x=0).reverse()[0])
        
        a.map((number) => setB(number))
    }

    const toggle = () => {
        setCheck(!check)
    }
    const checks = () => {
        if (name !== undefined) {
            if (phone !== undefined) {
                addOrger()
            } else {
                alert('Пожалуйста ваш сотовой номер')
            }
        } else {
            alert('Пожалуйста введите ваше имя')
        }
    }

    const addOrger = () => {
        prod()
        saveAddress()

        const formData = new FormData()
        if (user.users.id !== null) {
            formData.append('userId', user.users.id)
        } else {
            formData.append('userId', 0)
        }
        
        formData.append('info', JSON.stringify(product))
        formData.append('date',  AddDate)
        formData.append('userName', name)
        formData.append('userEmail', email)
        if (agr !== false) {
            formData.append('userAddress', JSON.stringify(createAddress))
        } else {
            formData.append('userAddress', 'Самовывоз')
        }
        formData.append('userPhone', phone)
        formData.append('OrderNumber', orderNum)

        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' +  pair[1]); 
        }

        createHistoryOrder(formData)
        
        axios.post(`${process.env.REACT_APP_API_URL_POST}
                %0A Заказ:  №: ${device.OrderHistory.length + 1}
                %0A Имя: ${name}
                %0A Телефон: ${phone}
                %0A Email: ${email}
                %0A Заказаный товар: %0A ${JSON.stringify(product)}
                %0A Доставка: ${handleChange 
                ? `
                %0A Город: ${town}
                %0A Улица: ${houseNumber}
                %0A дом: ${street}
                %0A Подъезд: ${entrance}
                %0A Этаж: ${floor}
                %0A Квартира: ${apartmentNumber}
                `:  
                'Самовывоз'
            }`)
            setSmShow(true)
            
    }

    
    return (
        <div className={style.container}>
            <center>
                <h2>Подтверждение заказа №: {device.OrderHistory.length + 1}</h2>
                <h3>Пожауйста проверти данные</h3>
            </center>
            <div className={style.order__block}>

                <div className={style.block__data}>
                    <h3 className={style.h3}>Личные данные</h3>
                    <div className={style.order__form}>
                        
                        <div className={style.personal__data}>
                            <p>Имя (обязательно)</p> 
                            <div className={style.order__inp}>
                                <input 
                                    className={style.inp}  
                                    type="text" 
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                /> 
                            </div>

                            <p>Номер телефона (обязательно)</p>
                            <div className={style.order__inp}>
                                <input 
                                    className={style.inp} 
                                    type="number" 
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                />
                            </div>
                            <p>E-mail</p>
                            <div className={style.order__inp}>
                                <input 
                                    className={style.inp} 
                                    type="text" 
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                Доставка <input type="checkbox" onClick={agree} onChange={e => setHandleChange(e.target.checked)}/>

                                    <div className={style.p}>
                                        <span  className={style.pod}>
                                            Согласен получитить <br /> 
                                            товар без точной даты  <br />
                                            (Для заказа вам надо поставить галочку)
                                        </span> 
                                        <input 
                                            onClick={() => toggle()} 
                                            className={style.i} 
                                            type="checkbox"
                                        /> 
                                    </div>

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
                                            placeholder="Введите подьезд квартиры"
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
                                        <button onClick={saveAddress}>подтвертить адрес</button>
                                    </div>
                                    : 
                                    ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.order__product}>
                    <div>
                        <h3 className={style.h3}>Подробности заказа</h3>
                        
                    </div>
                    <div className={style.order__info}>
                        <div>
                            <p className={style.linen}>Название, количество, цена продукта</p>
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
                        <h4 className={style.sum}>{b} KGS</h4>
                        {
                            check ? 
                                <div className={style.block__order}>
                                    <button onClick={() => checks()} className={style.btn__order}>заказать</button>
                                </div>
                            : 
                                ""
                        }
                        
                    </div>
                </div>
            <OrderModals
                smShow={smShow}
                setSmShow={setSmShow}
            />
        </div>
    )
}
