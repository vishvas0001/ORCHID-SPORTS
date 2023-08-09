import { useEffect, useState } from "react"
import { json, Link, useNavigate, useParams } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiServices, { BASE_URL_Image } from "../../../Services/apiServices"
import { ClipLoader } from "react-spinners"
import Header from "../../../layouts/Header"
import Footer from "../../../layouts/Footer"
export default function ViewSingleProduct(){
    const [loading,setLoading]=useState(true)
    const override={
        "position":'absolute',
        "display":"block",
        "top":"64%",
        "zIndex":"1",
    }
    const param=useParams()
    const id=param.id
    const [product,setProduct]=useState()
    const [image,setImage]=useState()
    const [price,setPrice]=useState()
    const [pid,setId]=useState()
    const [address,setAddress]=useState()
    const [category,setCategory]=useState()
    const [subcat,setSubCategory]=useState()
    const authenticate=sessionStorage.getItem("authenticate")
    const navigate=useNavigate()
    const [isAdded,setAdded]=useState(false)
    const [quantity,setQuantity]=useState(1)
    const [productId,setProductId]=useState()
    useEffect(()=>{
        let data={
            _id:id
        }
        apiServices.getSingleProduct(data).then((data)=>{
            setLoading(false)
            if(data.data.success){
                // console.log(data)
                setProduct(data.data.data.name)
                setImage(data.data.data.image)
                setId(data.data.data._id)
                setPrice(data.data.data.price)
                setCategory(data.data.data.categoryId?.name)
                setSubCategory(data.data.data.subcategoryId?.name)
                setProductId(data.data.data._id)
            }
            else{
                toast.error(data.data.message)
            }
        }).catch((error)=>{
            console.log(error)
            toast.error("Something went wrong!!Try Again Later")
            setTimeout(()=>{
                setLoading(false)
            })
        })
    },[id])
    useEffect(()=>{
        let cart=JSON.parse(sessionStorage.getItem('cart'))
        if(cart!=null){
            var y=cart.filter((e)=>{
                if(e?.productId==pid){
                    setAdded(true)
                    // console.log('id found', pid,e.productId)
                    return e
                }
        })
        if(y==[]||y==null){
            setAdded(false)
            console.log(y)
        }
        }
    })
    const orderNow=()=>{
        if(!authenticate){
            navigate("/login")
            sessionStorage.setItem('message','Please Login to order!!')
        }
        else{
            const user_id=sessionStorage.getItem('user_id')
            let data={
                productId:pid,
                userId:user_id,
                address:address
            }
            apiServices.addOrder(data).then((data)=>{
                if(data.data.success){
                    toast.success(data.data.message)
                }
                else{
                    toast.error(data.data.message)
                }
            }).catch((error)=>{
                // console.log(error)
                toast.error("Something went Wrong!! Please try Later")
            })
        }
    }
    const addToCart=()=>{
        let cart=[]
        let data={
            productId:pid,
            quantity:1,
            productName:product,
            image:image,
            price:price
        }
        cart.push(data)
        // console.log('first added to cart ',cart)
        sessionStorage.setItem("cart", JSON.stringify(cart))
        sessionStorage.setItem("isEmpty",false)
        setAdded(true)
    }
    const addMore=()=>{
        let cart=JSON.parse(sessionStorage.getItem("cart"))
        sessionStorage.clear()
        // setAdded(false)
        if(cart!=null){
            var x=cart.filter((e)=>{
                if(e?.productId==pid){
                    e.quantity+=1;
                    console.log(e.quantity)
                    console.log('after updating ',cart)
                    sessionStorage.setItem("cart", JSON.stringify(cart))
                    sessionStorage.setItem("isEmpty",false)
                    setAdded(true)
                    return e
                }
                sessionStorage.setItem("cart", JSON.stringify(cart))
                sessionStorage.setItem("isEmpty",false)
                setAdded(true)
            })
            // console.log('x is ', x)
            if(x==[]|| x==""||x==null){
                // console.log('inside new item')
                let data={
                   productId:pid,
                   quantity:1,
                   productName:product,
                   image:image,
                   price:price
               }
               sessionStorage.clear()
               cart.push(data)
               console.log('cart after new item ', cart)
               sessionStorage.setItem("cart",JSON.stringify(cart))
               sessionStorage.setItem("isEmpty",false)
               setAdded(true)
            }
        }
        else{
            addToCart()
        }
        
    }
    const addToCart1=(id)=>{
        setLoading(true)
        let data={
            quantity:quantity,
            productId:productId,
            userId:sessionStorage.getItem("user_id")
        }
        apiServices.addCart(data).then((data)=>{
            setLoading(false)
            if(data.data.success){
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
    }
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
            <div className="container my-5">
                <div className="row">
                    <div className="col-md-8 offset-md-2 my-3">
                        <div className="card" >
                            <div className="row">
                                <div className="col-md-6">
                                    <img src={BASE_URL_Image+image} className="card-img h-100"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="card-body">
                                        <h2 className="card-heading">{product}</h2>
                                        <ul className="p-4 myfont">
                                            <li>Category {category}</li>
                                            <li>Sub-Category {subcat}</li>
                                            <li>Price Rs. {price}</li>
                                        </ul>
                                        <input className="form-control mb-4" placeholder="Enter your Address" value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
                                        <button className="btn btn-secondary w-75 btn-lg " onClick={orderNow}>Order Now</button>
                                        {/* {!isAdded? */}
                                        {/* <input type="number" min="1" value={quantity} onChange={(e)=>{setQuantity(e.target.value)}} className="form-control"/>
                                        <button onClick={addToCart1} className="btn btn-secondary w-75 btn-lg ">Add to Cart1</button> */}
                                        {/* :
                                        <button onClick={addMore} className="btn btn-secondary w-75 btn-lg ">Add More</button>
                                        } */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
        </>
    )
}
