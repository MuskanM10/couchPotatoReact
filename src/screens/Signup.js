import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import Navbar from '../components/Navbar';

export default function Signup(){
    const [credentials,setcredentials]=useState({
            name:"",
            email:"",
            password:"",
            geolocation:""
        });

    const handleSubmit=async(e)=>{
        
        e.preventDefault();
        const response=await fetch("https://foodapp-backend-c2j2.onrender.com/api/createuser",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.geolocation})
        })
        const json=await response.json()
        console.log(json);

        if(!json.success){
            alert("Enter Valid credentials")
        }
    }

    const onChange=(event)=>{
        setcredentials({...credentials, [event.target.name]:event.target.value})
    }

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className='container'>
            <form className='w-50 m-auto mt-5 border rounded' onSubmit={handleSubmit}>
                <div className="m-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name='name' value={credentials.name}  onChange={onChange} />
                </div>
                <div className="m-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="m-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
                </div>
                <div className="m-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" name='geolocation' value={credentials.geolocation} onChange={onChange} />
                </div>
                <div className='text-center'>
                    <button type="submit" className="text-center m-3 btn " style={{backgroundColor:"#cb202d", color:"white"}}>Submit</button>
                </div>
                <div className="text-center mb-2"> Already have an account?
                <Link to="/login" className='m-3 ' style={{color:"#cb202d"}}>Login </Link>
                </div>
            </form>
            </div>
        </div>
    )
}