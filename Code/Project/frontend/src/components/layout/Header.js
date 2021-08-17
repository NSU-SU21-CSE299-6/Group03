import React, {Fragment} from 'react'
import { Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import Search from './Search'

import '../../App.css'
const Header = () => {

    const { cartItems } = useSelector(state => state.cart)

    return (
        <Fragment>
        <nav className="navbar row">
            <div className="col-12 col-md-3">
                <div className="navbar-brand">
                  
                    <p id="logo_name">  <img id="logo" src="images/logo1.png"/>Kaktarua</p>
                </div>
            </div>
            
            <div className="col-12 col-md-6 mt-2 mt-md-0">
                <Route render={({history}) => <Search history={history}/> }/>
            </div>
            <div className="col-12 col-md-3 mt-4 mt-md-0 text-left">
                
            <Link to="/cart" style={{ textDecoration: 'none' }} >
                        <span id="cart" className="ml-3">Cart</span>
                        <span className="ml-1" id="cart_count">{cartItems.length}</span>
            </Link>

            <button className="btn text-white" id="login_btn">Login</button>
            </div>
        </nav>
    </Fragment>    
    )
}

export default Header
