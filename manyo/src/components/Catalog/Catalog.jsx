import React, { useContext, useEffect } from 'react'
import style from './Catalog.module.css'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'
import DeviceList from '../DeviceList/DeviceList'
import { fetchDevices, fetchTypes } from '../../Http/DeviceAPI'
import Pagin from '../Pagin'
const Catalog = observer(() => {
    const { device } = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 9).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device, device.page, device.selectedType, device.selectedBrand])

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 9).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device, device.page, device.selectedType, device.selectedBrand])

    return (
        <div className={style.container}>
            <div  className={style.typeBar}>
                {device.types.map(type =>
                    <div
                        defaultValue={type.id === device.selectedType.id}
                        onClick={() => device.setSelectedType(type)}
                        key={type.id}
                    >
                        <div className={style.col}>
                            {type.name}
                        </div>
                    </div>
                )}
                <DeviceList />
                <Pagin />
           
            </div>
        </div>

    )
})

export default Catalog;
