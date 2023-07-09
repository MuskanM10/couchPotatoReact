import React, { useState , useRef, useEffect} from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props){

    let dispatch=useDispatchCart();
    let data=useCart()
    const priceRef=useRef()
    let options=props.options;
    let priceOptions=Object.keys(options || {})
    const [qty, setQty]= useState(1)
    const [size,setSize]=useState("")
    const handleAddToCart=async()=>{
        let food=[]
        if(data!=null){
        for (const item of data){
            if(item.id===props.idd){
                food=item;
                break;
            }
        }}
        console.log("FOOD",food);
        if(food!==[]){
            if(food.size===size){
                await dispatch({type:"UPDATE", id:props.idd, price: finalPrice, qty:qty})
                return
            }
            else if(food.size!==size){
                await dispatch({type:"ADD", id:props.idd, name:props.foodName, price: finalPrice, qty:qty, size:size})
                return
            }
            return
        }
        await dispatch({type:"ADD", id:props.idd, name:props.foodName, price: finalPrice, qty:qty, size:size})
        console.log(data);
    }
    let finalPrice=qty*parseInt(options?.[size] || 0)
    useEffect(()=>{
        setSize(priceRef.current?.value || '')
    },[])
    return(
            <div>
                <div className="card mt-3" style={{"width": "14.8rem","maxHeight":"360px"}}>
                    <img src={props.imgSrc} className="card-img-top" alt="..." style={{height:"200px", objectFit:"fill"}}/>
                    <div className="card-body"> 
                        <h5 className="card-title">{props.foodName}</h5>
                        <div className='container w-100'>
                            <select className='m-2 h-100 rounded' style={{backgroundColor:"#fd8a8a"}} onChange={(e)=> setQty(e.target.value)}>
                                {Array.from(Array(6),(e,i)=>{
                                    return (
                                        <option key={i+1} value={i+1}>{i+1}</option>
                                    )
                                })}
                            </select>
                            <select className='m-2 h-100 rounded' ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
                                {priceOptions.map((data)=>{
                                    return <option key={data} value={data}>{data}</option>
                                })}
                            </select>
                            <div className='d-inline h-100 fs-5 fw-bold'> 
                                ₹{finalPrice}/-
                            </div>
                            <hr/>
                            <button className='btn justiy-center ms-2' style={{backgroundColor:"#fd8a8a"}} onClick={handleAddToCart}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}