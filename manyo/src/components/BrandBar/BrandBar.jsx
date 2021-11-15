import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import style from './BrandBar.module.css'
import { Link } from 'react-router-dom'
import { CATALOG_ROUTE } from '../../Utils/Consts';
import { fetchBrands } from '../../Http/DeviceAPI';

const BrandBar = observer(() => {
    const { device } = useContext(Context)

    useEffect(() => {
        fetchBrands().then(data => device.setBrands(data))
    }, [device])

    return (
        <div className={style.block}>
            {device.brands.map(brand =>
                <Link to={CATALOG_ROUTE}>
                    <div
                        onClick={() => device.setSelectedBrand(brand)}
                        key={brand.id}
                        className={style.kat}
                    >
                        {brand.name}
                    </div>
                </Link>
            )}
        </div>
    );
});

export default BrandBar;