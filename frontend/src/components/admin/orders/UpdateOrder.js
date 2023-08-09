import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { toast } from "react-toastify"
import apiServices from "../../../Services/apiServices"

export default function UpdateOrder(){
    const navigate=useNavigate()
    const [loading,setLoading]=useState(true)
    const override={
        "position":'absolute',
        "display":"block",
        "top":"64%",
        "zIndex":"1",
    }
    const [orderStatus,setOrderStatus]=useState()
    const [shipurl, setShip]=useState()
    const [tracking_id,setTrackingId]=useState()
    const param=useParams()
    const oid=param.id
    useEffect(()=>{
        let data={
            _id:oid
        }
        apiServices.getSingleOrder(data).then((data)=>{
            setLoading(false)
            setShip(data.data.data.shipmentUrl)
            setTrackingId(data.data.data.trackingId)
            setOrderStatus(data.data.data.orderStatus)
        }).catch((error)=>{
            console.log(error)
            toast.error("Something went Wrong!!")
            setLoading(false)
        })
    },[])
    const handleForm=(e)=>{
        e.preventDefault()
        setLoading(true)
        let data={
            orderStatus:orderStatus,
            shipmentUrl:shipurl,
            trackingId:tracking_id,
            _id:oid
        }
        apiServices.updateOrder(data).then((data)=>{
            setLoading(false)
            if(data.data.success){
                toast.success(data.data.message)
                setTimeout(()=>{
                    navigate("/all_orders")
                },2000)
            }
            else{
                toast.error(data.data.message)
            }
        }).catch((error)=>{
            setLoading(false)
            console.log(error)
            toast.error("Something went wrong!!")
        })
    }
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
                                <h2>Orders</h2>
                                <div className="breadcrumb-option">
                                    <Link to="/"><i className="fa fa-home"></i> Home</Link>
                                    <span>Orders</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container-fluid my-5">
                <div className="row">
                <div className="col-md-8 offset-md-2 border border-3 border-danger py-5 rounded">
                        <form onSubmit={handleForm}>
                            <div className="row my-3">
                                <div className="col-md-2">
                                    <label>Order Status</label>
                                </div>
                                <div className="col-md-10">
                                   <select className="form-control" onChange={(e)=>{setOrderStatus(e.target.value)}}>
                                        <option value="" disabled>Choose one</option>
                                        <option value="1" selected={orderStatus==1}>Placed</option>
                                        <option value="2" selected={orderStatus==2}>Confirmed</option>
                                        <option value="3" selected={orderStatus==3}>Shipped</option>
                                        <option value="4" selected={orderStatus==4}>Delivered</option>
                                        <option value="5" selected={orderStatus==5}>Cancelled</option>
                                   </select>
                                </div>
                            </div>
                            <div className='row my-3'>
                                <div className="col-md-2">
                                    <label>Shipment Url</label>
                                </div>
                                <div className="col-md-10">
                                    <input className="form-control" type="text" value={shipurl} onChange={(e)=>{setShip(e.target.value)}} />
                                </div>
                            </div>
                            <div className='row my-3'>
                                <div className="col-md-2">
                                    <label>Tracking Id</label>
                                </div>
                                <div className="col-md-10">
                                    <input className="form-control" type="text" value={tracking_id} onChange={(e)=>{setTrackingId(e.target.value)}} />
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className='col-md-5 offset-md-4'>
                                    <button className='form-control btn btn-danger'>Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}