import React, { useContext, useEffect, useState } from 'react';
import { Container } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchBrands, fetchDevices, fetchTypes } from "../Http/DeviceAPI";
const Shop = observer(() => {
    const {device} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, 1, 2).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    })

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 2).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device, device.page, device.selectedType, device.selectedBrand,])
    const [ name, setName ] = useState()
    const [ phone, setPhone ] = useState()

    const log = () => {
        console.log(name, phone);
    }

    return (
        <Container>
            <p>Имя</p>
            <input 
                type="text"
                onChange={e => 
                setName(e.target.value)}
                value={name}
                placeholder="Имя" 
            />

            <p>Телефон</p>
            <input 
                type="text" 
                onChange={e => 
                setPhone(e.target.value)}
                value={phone} 
                placeholder="Телефон" 
            />

            <div>
                <button className="mt-3" onClick={log}>Отправить </button>
            </div>
        </Container>
    );
});

export default Shop;