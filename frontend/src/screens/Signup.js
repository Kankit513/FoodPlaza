import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


export default function Signup() {

    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.geolocation}));
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/creatuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.geolocation})
        });
        const json = await response.json()
        console.log(json);
        if(!json.success){
            alert('Enter Valid Credentials')
        }
        if(json.success){
            navigate("/");
        }
    }
    const onChange = (event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }

    // return (
    //     <>
    //         <div className='container'>
    //             <form onSubmit={handleSubmit}>
    //                 <div className="mb-3">
    //                     <label htmlFor="name" className="form-label">Name</label>
    //                     <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
    //                 </div>
    //                 <div className="mb-3">
    //                     <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    //                     <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
    //                     <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    //                 </div>
    //                 <div className="mb-3">
    //                     <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    //                     <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
    //                 </div>
    //                 <div className="mb-3">
    //                     <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
    //                     <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} id="exampleInputPassword1" />
    //                 </div>
    //                 <button type="submit" className="m-3 btn btn-success">Submit</button>
    //                 <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
    //             </form>
    //         </div>
    //     </>
    // )


    return (
        <>
            <div><Navbar /></div>
            <div className="container justify-content-center align-items-center mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                        <div className="card shadow mb-4">
                            <img src="https://images.unsplash.com/photo-1521249635712-69ca33adf729?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="" class="card-img-top" />
                            <div className="card-body bg-dark text-white">
                                <h5 class="card-title">Register</h5>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label mt-2">Name</label>
                                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} autofocus />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                                        <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} id="exampleInputPassword1" />
                                    </div>
                                    <button type="submit" className="mt-2 me-3 btn btn-success">Submit</button>
                                    <Link to="/login" className='mt-2 btn btn-primary'>Already a User</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div><Footer /></div>
        </>
    )
}
