import React,{useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'

export default function Login(){

    const [credentials,setcredentials]=useState({
        name:"",
        email:"",
        password:"",
        geolocation:""
    });

    let navigate=useNavigate() 
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch("https://foodapp-backend-c2j2.onrender.com/api/loginuser",{
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
        if(json.success){
            localStorage.setItem("userEmail",credentials.email)
            localStorage.setItem("authToken",json.authToken)
            console.log(localStorage.getItem("authToken"))
            navigate("/")
        }

    }

const onChange=(event)=>{
    setcredentials({...credentials, [event.target.name]:event.target.value})
}

    return (
        <>
            <div className='container'>
            <form className='w-50 m-auto mt-5 border rounded' onSubmit={handleSubmit}>
                
                <div className="m-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="m-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
                </div>
                <div className='text-center'>
                    <button type="submit" className="m-3 btn " style={{backgroundColor:"#cb202d", color:"white"}}>Submit</button>
                </div>
                <div className="text-center mb-2" > New user?
                <Link to="/createuser" className='m-3 ' style={{color:"#cb202d"}}>Create Account</Link>
                <br/>
                </div>
            </form>
            </div>
        </>
    )
}