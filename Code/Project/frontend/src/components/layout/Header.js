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

                                <Link to="/me" className="avatar avatar-nav">
                                    <img
                                        src={user.avatar && user.avatar.url}
                                        alt={user && user.name}
                                        className="rounded-circle p-2"
                                    />
                                </Link>
                                <Link to="/me" id="header_name" style={{color: "white", backgroundColor: "#11ad11", 'borderRadius':'5px', textDecoration: 'none', padding: '0.25rem'}}>{user && user.name}</Link>
                                {user && user.role === 'admin' && (
                                    <Link className="p-2" to="/dashboard" id="header_name" style={{ textDecoration: 'none' }}>Dashboard</Link>
                                    
                                )}
                                <span className="text-danger p-2" to="/" onClick={logoutHandler}>
                                    Logout
                                </span>
                            </div>


                        </div>

            ) : !loading && <Link to="/login" className="btn text-white ml-4" id="login_btn">Login</Link>}
            
            </div>
        </nav>
    </Fragment>    
    )
}

export default Header
