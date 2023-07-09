import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
// style={{color:"#cb202d"}}
// bg-body-tertiary
export default function Navbar(){
    let data=useCart()
    const [cartView,setCartView]=useState(false)
    // const navigate=useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem("authToken");
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg" style={{backgroundColor:"#dd5353"}}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" style={{color:"white", fontWeight:"bold",fontStyle:"italic"}}>CouchPotato</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                            <Link className="nav-link active " style={{color:"#fff"}} aria-current="page" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem("authToken")) ? 
                                <li className="nav-item">
                                <Link className="nav-link active " style={{color:"#fff"}} aria-current="page" to="/myOrder">My Orders</Link>
                                </li>
                            :""}
                        </ul>
                        {(!localStorage.getItem("authToken")) ? 
                        <div className='d-flex'>
                            <Link className="btn bg-white mx-1" style={{color:"#cb202d"}} to="/login">Login</Link>
                            <Link className="btn bg-white mx-1" style={{color:"#cb202d"}} to="/createuser">Sign Up</Link>                            
                        </div>
                        :<div>
                            <Link className="btn bg-white mx-1" style={{color:"#cb202d"}} onClick={()=>{setCartView(true)}}>
                                My Cart{" "}
                                <Badge pill bg="danger">{data==null ? "": data.length}</Badge>
                            </Link>
                            {cartView? <Modal onClose={()=>{setCartView(false)}}><Cart /></Modal>:null}
                            <Link className="btn bg-white mx-1" style={{color:"#cb202d"}} to="/login" onClick={handleLogout}>Logout</Link>
                        </div>
                        }
                    </div>
                </div>
</nav>
        </div>
    )
}