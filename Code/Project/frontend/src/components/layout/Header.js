import React, {Fragment} from 'react'
import { Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import Search from './Search'

import '../../App.css'
const Header = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth)

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

            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                
            <Link to="/cart" style={{ textDecoration: 'none' }} >
                        <span id="cart" className="ml-3">Cart</span>
                        <span className="ml-1" id="cart_count">{cartItems.length}</span>
            </Link>


            {user ? (

                <div className="ml-4 dropdown d-inline">

                            <div><Link to="#!" className="btn dropdown-toggle mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                <figure className="avatar avatar-nav">
                                    <img
                                        src={user.avatar && user.avatar.url}
                                        alt={user && user.name}
                                        className="rounded-circle"
                                    />
                                </figure>
                                <span>{user && user.name}</span>
                            </Link></div>

                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                                {user && user.role === 'admin' && (
                                    <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                )}
                                <Link className="dropdown-item" to="/orders/me">Orders</Link>
                                
                                

                            </div>


                        </div>

            ) : !loading && <Link to="/login" className="btn text-white ml-4" id="login_btn">Login</Link>}
            
            </div>
        </nav>
    </Fragment>    
    )
}

export default Header
