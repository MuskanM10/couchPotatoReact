import React  from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


export default function Cart(){
    let data=useCart();
    console.log(data);
    
    let dispatch=useDispatchCart();
    if(data==null){
        return (
            <div>
                <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>                
            </div>
        )
    }
    
    const handleCheckOut=async()=>{
      let userEmail=localStorage.getItem("userEmail");
      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const time=""+hours+":"+""+minutes
      console.log(time);
      const currDate=new Date().toDateString()+"  "+time;

      // console.log("EMAILEMAIL",localStorage.getItem("userEmail"));
      let response= await fetch("https://foodapp-backend-c2j2.onrender.com/api/orderData",{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        email:userEmail,
        order_data:data,
        order_date:currDate})
        
      })
      console.log("Order response:",response);
      if(response.status===200){
        dispatch({type:"DROP"})
      }
    }

    let totalPrice=data.reduce((total,food)=>total+food.price,0)
    return(
        <div>
            <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0"><FontAwesomeIcon icon={faTrash}
                 onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td>
                </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>
        </div>
    )
}