import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination'
import MetaData from './layout/MetaData'
import { Link } from 'react-router-dom'
import Loader from './layout/Loader'

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import Product from  './product/Product'
import { useAlert } from 'react-alert';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)
const Home = ({ match }) => {
                     
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 1000])   
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, products, error, productsCount, resPerPage} = useSelector(state => state.products)
    const keyword = match.params.keyword

    useEffect(() => {
        if(error) {
           return  alert.error(error)
           }
       dispatch(getProducts(keyword, currentPage, price));

      

    }, [dispatch, alert, error, keyword, currentPage, price])


    function setCurrentPageNo(pageNumber){
        setCurrentPage(pageNumber)
    }

    
    
    return (
        <Fragment>
            {loading? <Loader/> : (
                <Fragment>
                     <MetaData title='Buy Plants Online'/>
            <h1 id="products_heading">Latest Products</h1>
        <section id="products" className="container mt-5">
         <div className="row">

            {keyword ? (
                <Fragment>
                <div className="col-6 col-md-3 mt-5 mb-5">
                  <div className="px-5">
                      <Range
                        marks={{
                            1 : '$1',
                            1000 : '$1000'
                        }}
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        tipFormatter={value => '$' + {value}}
                        tipProps={{
                            placement: "top",
                            visible: true
                        }}           
                        value={price}
                        onChange={price => setPrice(price)}  
                      />
                  </div>

                </div>
                </Fragment>
            ): (
               products && products.map(product => (
                    <Product key={product._id} product={product} />
      
                   ))
            )}

            
         </div>
        </section>

        <div className="d-flex justify-content-center mt-5"></div>
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resPerPage}
                    totalItemsCount = {productsCount}
                    onChange = {setCurrentPageNo}
                    nextPageText = {'Next'}
                    prevPageText = {'Prev'}
                    firstPageText = {'First'}
                    lastPageText = {'Last'}
                    itemClass = "page-item"
                    linkClass = "page-link"
                />

                </Fragment>
            )}
           
        
        </Fragment>
    )
}

export default Home
