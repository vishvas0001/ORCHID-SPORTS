import { useEffect, useState } from "react";
import { useCart } from "react-use-cart"
import Footer from "../../../layouts/Footer";
import Header from "../../../layouts/Header";
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import apiServices, { BASE_URL_Image } from "../../../Services/apiServices"
import { ClipLoader } from "react-spinners"
export default function ViewCart(){
    const [loading,setLoading]=useState(true)
    const [items,setItem]=useState()
    const override={
        "position":'absolute',
        "display":"block",
        "top":"64%",
        "zIndex":"1",
    }
    // const i=JSON.parse(sessionStorage.getItem('cart'))
    // useEffect(()=>{
    //     setItem(JSON.parse(sessionStorage.getItem('cart')))
    //     setLoading(false)
    // },[i])
    // const inc=(pid)=>{
    //     let cart=JSON.parse(sessionStorage.getItem("cart"))
    //     // console.log("cart is ", cart)
    //     sessionStorage.clear()
    //     // setAdded(false)
    //     if(cart!=null){
    //         var x=cart.filter((e)=>{
    //             if(e?.productId==pid){
    //                 e.quantity+=1;
    //                 console.log(e.quantity)
    //                 console.log('after updating ',cart)
    //                 sessionStorage.setItem("cart", JSON.stringify(cart))
    //                 sessionStorage.setItem("isEmpty",false)
    //                 return e
    //             }
    //             sessionStorage.setItem("cart", JSON.stringify(cart))
    //             sessionStorage.setItem("isEmpty",false)
    //         })
    //         }}
    // const dec=(pid)=>{
    //     let cart=JSON.parse(sessionStorage.getItem("cart"))
    //     // console.log("cart is ", cart)
    //     sessionStorage.clear()
    //     // setAdded(false)
    //     if(cart!=null){
    //         var x=cart.filter((e)=>{
    //             if(e?.productId==pid){
    //                 e.quantity-=1;
    //                 // if(e.quantity<1){
    //                 //     console.log(e.productId)
    //                 //     return 
    //                 // }
    //                 console.log(e.quantity)
    //                 console.log('after updating ',cart)
    //                 sessionStorage.setItem("cart", JSON.stringify(cart))
    //                 sessionStorage.setItem("isEmpty",false)
    //             }
    //             sessionStorage.setItem("cart", JSON.stringify(cart))
    //             sessionStorage.setItem("isEmpty",false)
    //             // if(x!=null || x!=""){
    //             //     // delete cart[x];
    //             //     console.log("delete", cart[x]);
                   
    //             // }
    //             // else{
    //             //     sessionStorage.setItem("cart", JSON.stringify(cart))
    //             //     sessionStorage.setItem("isEmpty",false)
    //             // }
    //         })
    //         }
    // }
    useEffect(()=>{
        let data={
            userId:sessionStorage.getItem("user_id")
        }
        apiServices.getCart(data).then((data)=>{
            setLoading(false)
            if(data.data.success){
                setItem(data.data.data)
                toast.success(data.data.message)
            }
            else{
                toast.error(data.data.message)
            }
        }).catch((error)=>{
            console.log(error)
            toast.error("Something went wrong")
            setTimeout(()=>{
                setLoading(false)
            },1000)
        })
    },[])
    return(
        <>
        <Header/>
        <div className={loading?"disabled-screen":""}>
            <div className="d-flex justify-content-center">
                <ClipLoader loading={loading} cssOverride={override} size={120}/>
            </div>
            <section className="breadcrumb-section set-bg set-bg-brd" >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-text">
                                <h2>Product</h2>
                                <div className="breadcrumb-option">
                                    <Link to="/"><i className="fa fa-home"></i> Home</Link>
                                    <span>Product</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container my-5 table-responsive">
                <table className="table table-bordered ">
                    <tr>
                        <th>Sr.No</th>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total Amount</th>
                        {/* <th>Update</th> */}
                        <th>Delete</th>
                    </tr>
                    {items?.map((element,index)=>(
                        <tr key={index+1}>
                            <td>{index+1}</td>
                            <td><img src={BASE_URL_Image+element?.image}/></td>
                            <td>{element?.productName}</td>
                            <td>{element?.quantity}</td>
                            <td>{element?.price}</td>
                            <td>{element?.price* element?.quantity}</td>
                            {/* <td>
                                <div className="d-flex justify-content-center">
                                    <button className="btn form-control  w-25 btn-outline-danger" onClick={()=>{dec(element?.productId)}}>-</button>
                                    <input className="border border-danger form-control w-25" value={element?.quantity} readOnly/>
                                    <button className="btn btn-outline-danger form-control  w-25" onClick={()=>{inc(element?.productId)}}>+</button>
                                </div>
                               
                            </td> */}
                            <td>
                                <button className="btn btn-danger" >Delete</button>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
                <Footer/>
        </>
    )
}