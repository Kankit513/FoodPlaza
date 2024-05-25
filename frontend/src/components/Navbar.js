import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export default function Navbar() {

    const [cartView,setCartView] = useState(false);
    let data = useCart();

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    }
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand mb-1 fs-2 fst-italic" to="/">FoodPlaza</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link active fs-4" aria-current="page" to="/">Home</Link>
                            </li>
                            {
                                (localStorage.getItem("authToken")) ?
                                    <li className="nav-item">
                                        <Link className="nav-link active fs-4" aria-current="page" to="/myOrder">My Orders</Link>
                                    </li> : ""
                            }
                        </ul>
                        {
                            (!localStorage.getItem("authToken")) ?
                                <div className='d-flex' >
                                    <Link className="btn bg-white text-black mx-2" to="/login">Login</Link>
                                    <Link className="btn bg-white text-black mx-2" to="/creatuser">Register</Link>
                                </div>
                                :
                                <div>
                                    <div className='btn bg-white text-black mx-2' onClick={()=>{setCartView(true)}} >
                                        My Cart {""}
                                        {<Badge pill bg='danger'> {data.length} </Badge>}
                                    </div>
                                    {
                                        cartView ? <Modal onClose={()=>setCartView(false)}> <Cart/> </Modal> : null
                                    }
                                    <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                                        Log Out
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}


{/* <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">FilmFiesta</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link" href="/">Home</a>
        <a class="nav-link" href="/movies">Movies</a>
        <a class="nav-link" href="/movies/new">New Movie</a>
      </div>
      <div class="navbar-nav ms-auto">
        <% if(!currentUser) { %>
          <a class="nav-link" href="/login">Login</a>
          <a class="nav-link" href="/register">Register</a>
          <% } else { %>
            <a class="nav-link" href="/logout">Logout</a>
            <% } %>
      </div>
    </div>
  </div>
</nav> */}