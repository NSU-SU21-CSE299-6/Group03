import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { productsReducer, newProductReducer, productDetailsReducer, newReviewReducer } from './reducers/productReducers'

import { authReducer, userReducer, forgotPasswordReducer } from './reducers/userReducers'

import { cartReducer } from './reducers/cartReducers';

import { newOrderReducer, myOrdersReducer,orderDetailsReducer, allOrdersReducer } from './reducers/orderReducers'

const reducer = combineReducers({
   products: productsReducer,
   productDetails: productDetailsReducer,
   newProduct: newProductReducer,
   auth: authReducer,
   cart: cartReducer,
   user: userReducer,
   forgotPassword: forgotPasswordReducer,
   newOrder: newOrderReducer,
   myOrders: myOrdersReducer,
   newReview: newReviewReducer,
   orderDetails: orderDetailsReducer,
   allOrders: allOrdersReducer
})

let initialState = {
     cart: {
        cartItems: localStorage.getItem('cartItems') 
        ? JSON.parse(localStorage.getItem('cartItems')) : [],
      shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo')) : {} 

     }
}

const middlware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))

export default store;

