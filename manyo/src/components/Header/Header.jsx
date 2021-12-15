import React, { useContext, useEffect, useState } from 'react'
import style from './Header.module.css'
import NavBar from "../NavBar/NavBar";
import { Link, useHistory} from 'react-router-dom'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'
import { ADMIN_ROUTE, BASKET_ROUTE, CABINET_ROUTER, FAVORITES_ROUTE, LOGIN_ROUTE, SEARCH_ROUTE } from '../../Utils/Consts'
import { fetchDevicees } from '../../Http/DeviceAPI';
import { authuser } from '../../Http/UserAPI';



const Header = observer(() => {
    const history = useHistory()
    const { user } = useContext(Context)
    const { device } = useContext(Context)
    const { FavoritesStore} = useContext(Context)
    const [ roles, setRoles ] = useState()
    const [ userInfo, setUserInfo ] = useState()

    let prodId = []
    
    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            user.setUsers()
            authuser(user.users.id).then(data => setUserInfo(data))
            setRoles(user.users.role)
        }
        if (localStorage.getItem('favorites') !== null) {
            FavoritesStore.setFavorites()
        }
    }, [ user ])
    
    useEffect(() => {
        fetchDevicees(device.selectedType.id, device.selectedBrand.id, device.page, 3).then(data => {
            device.setDevicees(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device, device.page, device.selectedType, device.selectedBrand,])

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        delete localStorage.token;
        delete localStorage.image;
    }
        
    const test = async () => {
        setRoles(user.users.role)
    }
    const basketRoute = () => {
        history.push(BASKET_ROUTE)
    }
    const favoritesRoute = () => {
        history.push(FAVORITES_ROUTE)
    }
    const searchRoute = () => {
        history.push(SEARCH_ROUTE)
    }

    
    useEffect(() => {
       if (localStorage.getItem('token') !== null) {
            test()
            user.getUsersId(userInfo)
        }
        
        device.getLocalFavorites()
    })

    return (
    <div>
        <div className={style.header }>
            <div className={style.container}>
                <div className={style.f}>
                <p> </p>
                <div className={style.left}>
                    <p>Вас приветствует ma:nyo factory</p>
                </div>
                
                    {user.isAuth ? 
                            <ul className={style.right}>
                            <li>{roles === "ADMIN" 
                                ? <button onClick={() => history.push(ADMIN_ROUTE)} className={style.log_off}>Админ панель</button> 
                                : <button onClick={() => history.push(CABINET_ROUTER)} className={style.log_off}>Личный кабинет</button> }
                            </li>
                            <li>
                                <button 
                                    onClick={() => logOut()} 
                                    className={style.log_off}>
                                        Выйти
                                 </button>
                            </li> 
                            </ul>
                        : 
                        <ul className={style.right}>
                            <li>
                                <button 
                                    className={style.voy} 
                                    onClick={() => 
                                    history.push(LOGIN_ROUTE)
                                    }> Авторизация </button>
                            </li>
                        </ul>
                        }
                
                </div>
            </div>
        </div>

        <div className={style.line}></div>
        
        <div className={style.heading}>
            <div >
                <p className={style.kurs}>KGS</p>
            </div>
            <Link to="/" className={style.a}><h1 className={style.name}>ma:nyo</h1> </Link> 

            <div className={style.header__right}>
                <button onClick={searchRoute}>
                    <div className={style.inp__block}></div>
                </button>


                <button className={style.basket__block} onClick={basketRoute}>
                    <div className={style.basket__img}> 
                        <p className={style.basket__count}>{device.basket.length >= 1 ? device.basket.length : ''}</p>
                    </div>
                </button>

                <button onClick={favoritesRoute}>
                    <div className={style.heart}></div>
                </button>

            </div>
        </div>
        <div className={style.search__block}>
            <div className={style.search__panel}>
                {/* <Search /> */}
            </div>
        </div>
        <NavBar />
    </div>
    )                                                                                                                                                                                                   
}) 

export default Header