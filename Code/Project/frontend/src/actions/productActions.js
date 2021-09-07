import axios from 'axios';

import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    CLEAR_ERRORS 
   } from '../constants/productConstants'

export const getProducts = (keyword = '', currentPage = 1, price, category, rating = 0) => async (dispatch) => {
    try{

         dispatch({ type: ALL_PRODUCTS_REQUEST })
         let x = currentPage;
         let z = keyword;
         let m = price[1];
         let n = price[0];
         let c = category;
         let r = rating;
         

         let link = '/api/v1/products?keyword=' + z + '&page=' + x + '&price[lte]=' + m + '&price[gte]=' + n + '&ratings[gte]=' + r;

         if(category){
            link = '/api/v1/products?keyword=' + z + '&page=' + x + '&price[lte]=' + m + '&price[gte]=' + n + '&category=' + c + '&ratings[gte]=' + r;
         }
  
         const { data } = await axios.get(link)

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

   export const newReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_REVIEW_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/review`, reviewData, config)

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

   //Clear errors

   export const clearErrors = () => async (dispatch) => {
       dispatch({
           type: CLEAR_ERRORS
           
       })
   }

   