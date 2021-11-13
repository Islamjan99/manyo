import React, { useEffect } from 'react'
import Product from '../components/Product.js';
import LoadingBox from '../components/LoadingBox.js';
import MessageBox from '../components/MessageBox.js';
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../Actions/ProductActions'


export default function HomeScreen() {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, products} = productDetails;

    useEffect(() =>{
      dispatch(listProducts());
    }, [dispatch])
    return (
        <div>
          {loading? (
          <LoadingBox></LoadingBox>
           ) : error ? (
           <MessageBox variant="dabger">{error}</MessageBox>
           ) : (
            <div classname="row center">
              {
              products.map((product) =>(
                <Product key={product.id} product={product}></Product>
              ))}
            </div>
           )}
        </div>
    )
}