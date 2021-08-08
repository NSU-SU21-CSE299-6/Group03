import React, {Fragment} from 'react'
import { Route } from 'react-router-dom'
import Search from './Search'

import '../../App.css'
const header = () => {
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
                
            <span id="cart" className="ml=5 ">Cart&nbsp;</span>
            <span className="ml-1" id="cart_count">(0)</span>

            <button className="btn text-white" id="login_btn">Login</button>
            </div>
        </nav>
    </Fragment>    
    )
}

export default header
