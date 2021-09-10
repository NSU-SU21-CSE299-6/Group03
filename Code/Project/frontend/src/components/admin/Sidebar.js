import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import { DropdownButton, Dropdown } from 'react-bootstrap'

const Sidebar = () => {
    return (
        <div className="sidebar-wrapper">
            <nav id='sidebar'>
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/dashboard"><i className="fa fa-tachometer"> Dashboard</i></Link>
                    </li>
                    
                    <Dropdown>
                        <Dropdown.Toggle variant="success"  className="fa fa-product-hunt" style={{backgroundColor: "#1c8d1c", outline: "none"}}>
                            &nbsp;Products
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="/admin/products">
                                All
                            </Dropdown.Item>
                            <Dropdown.Item to="/admin/products">Create</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    
                    <li>
                        <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i>Orders</Link>
                    </li>
                    <li>
                        <Link to="/admin/users"><i className="fa fa-users"></i>Users</Link>
                    </li>
                    <li>
                        <Link to="/admin/reviews"><i className="fa fa-star"></i>users</Link>
                    </li>

                </ul>
            </nav>
            
        </div>
    )
}

export default Sidebar
