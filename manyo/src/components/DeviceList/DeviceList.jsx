import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Context } from '../../index';
import DeviceModals from '../../store/DeviceModals';
import style from './Device.module.css';
import DeviceItem from './DeviceItem';

const DeviceList = observer(() => {
    const { device } = useContext(Context)
    const [ smShow, setSmShow] = useState(false);
    const [ addGood, setAddGood ] = useState(false)

    const data = [];

    const addFavorites = (device) => {
        data.push(device)
        addLocal()
    }
    
    const addLocal = () => {
        localStorage.setItem('favorites', JSON.stringify(data))
        
    }

    let a = []

    const removeLocalStorage = (id) => {

        data.map((item, index )=> {
            if (item.id === id) {
                a.push(index)
            } 
            if (item.id === id) {
                data.splice(a, 1);
            }
             return null
        })

        addLocal()

        a = []
    }
    
    //  избранное
    let so = [];

    const addBasket = (devic) => {
        if (device.basket !== '') {
            device.basket.map(i => so.push(i))
            check(devic)
        } else {
            device.addBasket(devic)
            setAddGood(true)
            modalPanel()
        }
    }

    let itemID = false 
    let PM = true 

    const check = (devic) => {
        if (so !== null) {
            so.map(item => {
                if (item.id === devic.id) {
                    itemID = true
                    PM = false
                } else {
                    itemID = false
                }
                return so
            })
        }
    
        if (itemID === false) {
            if (PM === true) {
                device.addBasket(devic)
                setAddGood(true)
                modalPanel(devic)
                PM = true 
            } else {
                setAddGood(false)
                modalPanel()
            }

        } else {
            setAddGood(false)
            modalPanel()
        }
        so = [1]
        
    }

// Оповещение о добавление продукта

    const modalPanel = () => {
        setTimeout(() => {
            setSmShow(true)
        }, 200);

        setTimeout(() => {
            setSmShow(false)
        }, 2000);
    }

    return (
        <div className={style.container}>
            <div className={style.block}>
            <DeviceModals
                smShow={smShow}
                setSmShow={setSmShow}
                addGood={addGood}
                device={device}
            />
                {device.devices.map(device =>
                <>
                    <DeviceItem 
                        key={device.id} 
                        device={device} 
                        addFavorites={addFavorites}
                        removeLocalStorage={removeLocalStorage}
                        smShow={smShow}
                        setSmShow={setSmShow}
                        addGood={addGood}
                        addBasket={addBasket}
                    />
                </>
                )}
            </div>
        </div>
    )
})

export default DeviceList