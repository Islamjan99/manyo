import React, { useEffect, useState, useContext } from 'react'
import { Container, Image, } from 'react-bootstrap'
import style from './DevicePage.module.css';
import star from '../../assets/star.png'
import { useParams } from 'react-router-dom'
import { fetchDevicees, fetchOneDevice } from "../../Http/DeviceAPI";
import { observer } from 'mobx-react-lite';
import { Context } from '../../index'
import { $authHost } from '../../Http';
import DeviceModals from '../../store/DeviceModals';
import change from '../../assets/pen_edit_modify_icon_178422.png'

const Devicepage  = observer(() => {
    const { device } = useContext(Context)
    const [ smShow, setSmShow] = useState(false);
    const [ addGood, setAddGood ] = useState(false)
    const [ devicce, setDevicce] = useState({info: []})
    const [ sum, setSum] = useState(0)
    const [ coun, setCoun ] = useState()
    const { id } = useParams()
        
    useEffect(() => {
        fetchOneDevice(id).then(data => setDevicce(data))
        fetchOneDevice(id).then(data => setSum(data.price))
        fetchOneDevice(id).then(data => setCoun(data))
        fetchDevicees().then(data => {
            device.setDevicees(data.rows)
        })
        test()
    }, [])

    const [ roles, setRoles ] = useState()
    const [ role, setRole ] = useState()

    const rolecheck = () => {
            const token = localStorage.getItem("token");
            setRoles(JSON.parse(window.atob(token.split(".")[1])).role)
    }
        
    const test = async () => {
        const {data} = await $authHost.get('api/user/auth' )
        setRole(data.token)
        rolecheck(role)
        
    }
    
    const modalPanel = () => {
        setSmShow(true)

        setTimeout(() => {
            setSmShow(false)
        }, 2000);
    }
    
    let so = [];
    let PM = true 
    const addBasket = (id) => {
        if (device.basket !== null) {
            device.basket.map(i => so.push(i))
        }
        check(id)
    }

    let itemID = false 

    const check = (id) => {
        if (so !== null) {
            so.map(item => {
                if (item.id === id) {
                    itemID = true
                    PM = false
                } else {
                    itemID = false
                }
            })
        }
    
        if (itemID === false) {
            if (PM === true) {
                device.addBasket(device)
                setAddGood(true)
                modalPanel(device)
                PM = true 
            } else {
                setAddGood(false)
                modalPanel()
            }
        } else {
            setAddGood(false)
            modalPanel()
        }
        console.log(itemID);
        so = [1]
        
    }

    const changeProduct = () => {
        
    }

    useEffect(() => {
        fetchDevicees(device.selectedType.id, device.selectedBrand.id, device.page, 3).then(data => {
            device.setDevicees(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device, device.page, device.selectedType, device.selectedBrand,])

    
    return (
        <Container  className="d-flex justify-content-around mt-3">
            <div mt={2}>
                <Image className={style.sticky} width={550} height={550} src={process.env.REACT_APP_API_URL + devicce.img}/>
            </div>
            <div className={style.device__block}>
                <div className={style.dev}>
                    <div className={style.dev__name}>
                        {devicce.name}
                    </div>
                    <button className={style.change__btn} onClick={changeProduct}> {roles === 'ADMIN' ? <img className={style.change__img} src={change} alt={change}/> : '' }</button>
                </div>    
                <div className={style.block}>
                    <div className={style.rating}>{devicce.rating} </div>
                    <div className={style.star}><Image width={17} height={17} src={star}/></div> 
                </div>
                    <div className={style.in}>Информация по товару</div>
                    <div className={style.line}></div>

                {devicce.info.map((info, index) =>
                    <div className={style.info} key={info.id} >
                        <div className={style.title}>{info.title}:</div> <p className={style.desc}>{info.description}</p>
                    </div>
                )}
                <div  className={style.line__price}></div>
                
                <div className={style.price__block}>
                    <div className={style.price}> {sum}</div> <p>Сом</p>
                    <button onClick={() => addBasket(id)} className={style.block__basket}>В корзину</button>
                </div>
                <DeviceModals 
                smShow={smShow}
                setSmShow={setSmShow}
                addGood={addGood}
                />
                <div className={style.block__count}>
                </div>
            </div>   
        </Container>
    )
})

export default Devicepage