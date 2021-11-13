import React from 'react'
import style from './Navbar.module.css'
import { Link } from 'react-router-dom'
import { BRAND_ROUTE, CATALOG_ROUTE, DEVICE_ALL } from '../../Utils/Consts'


export default function NavBar() {

    return (
        <div className={style.sticky}>
            <div className={style.container}>
                    <strong>
                <ul className={style.bar}>
                        <li><Link className={style.a} to={CATALOG_ROUTE}>Каталог</Link></li>
                        <li><Link className={style.a} to={BRAND_ROUTE}>Бренд</Link></li>
                        <li><Link className={style.a} to={DEVICE_ALL}> Все товары </Link></li>
                        <li>О нас</li>
                </ul>
                    </strong>
                <ul className={style.bar2}>
                    <li>Хит продаж</li>
                    <li>Скидки</li>
                    <li>Наборы</li>
                    <li>Новинки</li>
                </ul>
            </div>
        </div>
    )
}
