import React, {Fragment, useEffect} from 'react'

import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, clearErrors } from '../../actions/orderActions'

import axios from 'axios'

const Payment = ({history}) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth)
    const { cartItems, shippingInfo } = useSelector(state => state.cart);
    const { error } = useSelector(state => state.newOrder)

  
    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error])

    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const submitHandler = async (e) => {
        e.preventDefault();

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            dispatch(createOrder(order))

            history.push('/success') 
            

    }

    return ( 
        <Fragment>
            <MetaData title={'Payment'}/>
            <CheckoutSteps shipping confirmOrder payment/>

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Payment Method</h1>
                        <div className="form-group">
                            <label htmlFor="cashOnDelivery">Cash On Delivery</label>
                        </div>
                        <button 
                        id="Confirm_Payment_Method_btn"
                        type="submit"
                        className="btn btn-block py-3"
                        >Confirm Payment Method</button>
                    </form>
                </div>

            </div>
        </Fragment>
    )
}

export default Payment
