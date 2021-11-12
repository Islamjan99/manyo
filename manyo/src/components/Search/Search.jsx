import axios from 'axios'
import React, { useEffect, useState } from 'react'
import style from './Search.module.css'
import Image from "react-bootstrap/Image";
import star from '../../assets/star.png'
import {useHistory} from "react-router-dom"
import { DEVICE_ROUTE } from '../../Utils/Consts'
import { Container } from 'react-bootstrap';

export default function Search() {
    const [ product, setProduct] = useState([])
    const [ inp, setInp ] = useState('')

    function getProduct() {
        axios.get(`http://localhost:5000/api/device`)
            .then((response) => {
                setProduct(response.data.rows);
            });
    }

    useEffect(() => {
        getProduct()
    }, [])

    const filterProduct = product.filter(prod => {
    return prod.name.toLowerCase().includes(inp.toLocaleLowerCase())
    })

    const history = useHistory()
    return (
        <Container>
            <div className={style.search__block} >
                <input 
                    className={style.inp__search} 
                    type="search" placeholder="Поиск товаров" 
                    onChange={(e) => setInp(e.target.value)}
                />
            </div>
            <div className={style.block}>
                {
                    filterProduct.map((produ, index) => {
                        return (
                            <div className={style.item}>
                                <div  className="d-flex flex-wrap" style={{width: 150}} border={"light"}  onClick={() => history.push(DEVICE_ROUTE + '/' + produ.id + '/' )}>
                                    <Image className={style.item_img} style={{cursor: "pointer"}} width={150} height={150} src={process.env.REACT_APP_API_URL + produ.img}/>
                                    <div className="text-black-50 mt-1 d-flex align-items-center">
                                        <div style={{cursor: "pointer"}}></div>
                                    </div>
                                </div>
                                    <div className={style.block__name}>
                                        <div>
                                            {produ.name}
                                        </div>
                                        <div className={style.block__rating}>
                                            <div className={style.rating}>{produ.rating}</div>
                                            <Image className="d-flex flex-wrap" width={18} height={18} src={star}/>
                                        </div>
                                    </div>
                                <div className={style.item_price}>
                                        {produ.price}
                                    <button className={style.item_btn}>В корзину</button>
                                </div>
                            </div>
                        )                                                                                                                                                                
                    }
                    ) 
                }                                                                                                                                                                        
            </div>
        </Container>
    )
}
