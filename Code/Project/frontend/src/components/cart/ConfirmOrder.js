import React, {Fragment} from 'react'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const ConfirmOrder = ({ history }) => {

    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)
    
    // Calculate Order Prices
    const itemPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shippingPrice = itemPrice > 200 ? 0 : 25
    const taxPrice = Number((0.05 * itemPrice))
    const totalPrice = (itemPrice + shippingPrice + taxPrice)

    const proceedToPayment = () => {
        const data = {
            itemPrice: itemPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }
       sessionStorage.setItem('orderInfo', JSON.stringify(data))
       history.push('/payment')
    }

    let x = shippingInfo.address;
    let y = shippingInfo.city;
    let z = shippingInfo.postalCode;
    let k = shippingInfo.country;

    return (
        <Fragment>
            
            <MetaData title={'Confirm Order'} />
            
            <CheckoutSteps shipping confirmOrder/>

            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">

                    <h4 className="mb-3">Shipping Info</h4>
                    <p><b>Name:</b>{' '} {user && user.name}</p>
                    <p><b>Phone:</b>{' '+ shippingInfo.phoneNo}</p>
                    <p className="mb-4"><b>Address:</b>{' ' + x + ', ' + y + ', ' + z + ', ' + k }</p>
                    <hr />
                    <h4 className="mt-4">Your Cart Items:</h4>

                    {cartItems.map(item => (
                        <Fragment>

<hr />
                    <div className="cart-item my-1" key={item.product}>
                        <div className="row">
                         <div className="col-4 col-lg-2">
                             <img src={item.image} height="45" width="65" />
                         </div>
                         <div className="col-5 col-lg-6">
                             <Link to={'/product/${item.product}'}>{item.name}</Link>
                         </div>

                         <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                             <p>{item.quantity} x TK{item.price} = <b>TK{item.quantity * item.price}</b></p>
                         </div>
                        </div>

                    </div>
                    <hr />
                        </Fragment>
                    ))}
                      
                </div>
                   <div className="col-12 col-lg-3 my-4">
                       <div id="order_summary">
                           <h4>Order Summary</h4>
                           <hr />
                           <p>Subtotal: <span className="order-summary-values">{itemPrice}TK</span></p>
                           <p>Shipping: <span className="order-summary-values">{shippingPrice}TK</span></p>
                           <p>Tax: <span className="order-summary-values"></span>{taxPrice}TK</p>
                           
                           <hr/>

                           <p>Total: <span className="order-summary-values"></span>{totalPrice}TK</p>

                           <hr />
                           <button id="checkout_btn" className="btn btn-primary btn-block" onClick={proceedToPayment}>Proceed To Payment</button>
                   </div>
            </div>
        </div>
        
        </Fragment>
    )
}

export default ConfirmOrder