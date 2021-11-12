import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'
import DeviceList from '../DeviceList/DeviceList'
import { fetchDevicees } from '../../Http/DeviceAPI'
import Pagin from '../Pagin'


const DeviceAll = observer(() => {
    const { device } = useContext(Context)

    useEffect(() => {
        fetchDevicees().then(data => {
            device.setDevicees(data.rows)
        })
    }, [ device ])

    useEffect(() => {
        fetchDevicees(device.selectedType.id, device.selectedBrand.id, device.page, 3).then(data => {
            device.setDevicees(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device, device.page, device.selectedType, device.selectedBrand,])



    return (
        <div >
            <DeviceList/>
            <Pagin />
        </div>

    )
})

export default DeviceAll;
