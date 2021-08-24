import React, {Fragment} from 'react'
import { Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from '../../actions/userActions'

import Search from './Search'

import '../../App.css'
const Header = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth)

    const { cartItems } = useSelector(state => state.cart)

    const logoutHandler = () => {
        dispatch(logout());
        alert.success('Logged Out Successfully');
    }



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

                <div className="ml-4 d-inline">

                            <div className="btn mr-4" type="button">

                                <figure className="avatar avatar-nav">
                                    <img
                                        src={user.avatar && user.avatar.url}
                                        alt={user && user.name}
                                        className="rounded-circle"
                                    />
                                </figure>
                                <span id="header_name">{user && user.name}</span>
                                <span className="text-danger p-2" to="/" onClick={logoutHandler}>
                                    Logout
                                </span>
                            </div>

                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">


                                

                            </div>


                        </div>

            ) : !loading && <Link to="/login" className="btn text-white ml-4" id="login_btn">Login</Link>}
            
            </div>
        </nav>
    </Fragment>    
    )
}

export default Header
