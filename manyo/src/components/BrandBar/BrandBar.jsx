import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import style from './BrandBar.module.css'
import { Link } from 'react-router-dom'
import { CATALOG_ROUTE } from '../../Utils/Consts';
import { fetchBrands, fetchDevices } from '../../Http/DeviceAPI';

const BrandBar = observer(() => {
    const { device } = useContext(Context)

    useEffect(() => {
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 3).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device, device.page, device.selectedType, device.selectedBrand])

    return (
        <div className={style.block}>
            {device.brands.map(brand =>
                <div
                    style={{cursor:'pointer'}}
                    onClick={() => device.setSelectedBrand(brand)}
                    key={brand.id}
                    className={style.kat}
                >
                   <Link to={CATALOG_ROUTE}>{brand.name}</Link>
                </div>
            )}
        </div>
    );
});

export default BrandBar;