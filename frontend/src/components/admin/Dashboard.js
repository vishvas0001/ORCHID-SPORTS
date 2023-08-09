import { ClipLoader } from "react-spinners"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import apiServices from "../../Services/apiServices";
import { toast } from "react-toastify";
export default function Dashboard(){
    const [loading,setLoading]=useState(true)
    const override={
        "position":'absolute',
        "display":"block",
        "top":"64%",
        "zIndex":"1",
    }
    const [products,setProducts]=useState()
    const [orders,setOrders]=useState()
    const [customers,setCustomers]=useState()
    useEffect(()=>{
        apiServices.getDashboard().then((data)=>{
            setLoading(false)
            setProducts(data.data.totalProducts)
            setOrders(data.data.totalOrders)
            setCustomers(data.data.totalCustomers)
            // console.log(data)
        }).catch((error)=>{
            console.log(error)
            toast.error("Something went Wrong!!")
            setTimeout(()=>{
                setLoading(false)
            },2000)
        })
    },[])
    return(
        <>
        <div className={loading?"disabled-screen":""}>
            <div className="d-flex justify-content-center">
                <ClipLoader loading={loading} cssOverride={override} size={120}/>
            </div>
            <section className="breadcrumb-section set-bg set-bg-brd" >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-text">
                                <h2>Dashboard</h2>
                                <div className="breadcrumb-option">
                                    <Link to="/"><i className="fa fa-home"></i> Admin</Link>
                                    <span>Dashboard</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container-fluid my-5 ">
                <div className="row text-center">
                    <div className="col-md-5 my-3 offset-md-1 ">
                        <div className="card text-center">
                            <h1 className="card-title">Total Products</h1>
                            <div className="card-body text-center">
                                <h1>{products}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 my-3">
                        <div className="card">
                            <h1 className="card-title">Total Orders</h1>
                            <div className="card-body text-center">
                                <h1>{orders}</h1>
                            </div>
                        </div>
                        
                    </div>
                    <div className="col-md-5 offset-md-3 my-5">
                        <div className="card">
                            <h1 className="card-title">Total Customers</h1>
                            <div className="card-body text-center">
                                <h1>{customers}</h1>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}