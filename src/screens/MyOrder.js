import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function MyOrder(){
    const [orderData, setorderData]=useState([]);

    const fetchMyOrder = async () => {
        // console.log(localStorage.getItem('userEmail'))
        const resp=await fetch("https://foodapp-backend-c2j2.onrender.com/api/myorderData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email:localStorage.getItem('userEmail')
            })
            
        })
            let response = await resp.json()
            await setorderData(response)
            // console.log(orderData);
        
    }

    useEffect(() => {
        fetchMyOrder()
    })

    return (
    <>
        <div>
            <Navbar/>
        </div>
        {/* console.log("Data Data2:", orderData.orderData.order_data.slice(0).reverse()); */}
        <div className="container">
            <div className="row">
                {orderData!==null ? Array(orderData).map(data => {  return (
                    data.orderData? 
                        data.orderData.order_data.slice(0).reverse().map((item)=>{
                            console.log()
                            return (
                                item.map((arrayData)=>{
                                    {/* console.log(arrayData) */}
                                    return (
                                        <div>
                                        {arrayData.order_date ? <div className='m-auto mt-5'>

                                            {data = arrayData.order_date}
                                            <hr />
                                            </div> 
                                            :
                                            <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                        }
                                        </div>
                                        )
                                }))
                        }) :""
                )}) : ""}
            </div>
        </div>
        <div className="container">
            <div className="row">
            {orderData.length ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div  >
                                                    {arrayData.Order_date ? <div className='m-auto mt-5'>

                                                        {data = arrayData.Order_date}
                                                        <hr />
                                                    </div> :

                                                        <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                        <span className='m-1'>{data}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>



                                                    }

                                                </div>
                                            )
                                        })

                                    )
                                }) : ""
                        )
                    }) : ""}
            </div>
        </div>

        <div>
            <Footer/>
        </div>
    </>
    )
}
