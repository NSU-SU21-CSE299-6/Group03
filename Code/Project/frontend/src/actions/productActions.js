import axios from 'axios';

import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS 
   } from '../constants/productConstants'

export const getProducts = (currentPage = 1) => async (dispatch) => {
    try{

         dispatch({ type: ALL_PRODUCTS_REQUEST })

         let x = currentPage;
         let str = '/api/v1/products?page=' + x;

         const { data } = await axios.get(str)

         dispatch({
             type: ALL_PRODUCTS_SUCCESS,
             payload: data
         })

    } catch(error){
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
         } )
    }

   }

export const getProductDetails = (id) => async (dispatch) => {
    try{

         dispatch({ type: PRODUCT_DETAILS_REQUEST })

         let y = id;
         let str2 = '/api/v1/product/' + y;

         const { data } = await axios.get(str2)

         dispatch({
             type: PRODUCT_DETAILS_SUCCESS,
             payload: data.product
         })

    } catch(error){
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
         } )
    }

   }

   //Clear errors

   export const clearErrors = () => async (dispatch) => {
       dispatch({
           type: CLEAR_ERRORS
           
       })
   }