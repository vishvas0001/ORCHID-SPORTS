import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import apiServices from "../../../Services/apiServices";

export default function ViewOrder(){
    const [loading,setLoading]=useState(true)
    const override={
        "position":'absolute',
        "display":"block",
        "top":"64%",
        "zIndex":"1",
    }
    const user_type=sessionStorage.getItem('user_type')
    const [orders,setOrders]=useState()
    useEffect(()=>{
        apiServices.getAllOrders().then((data)=>{
            setOrders(data.data.data)
            // setTimeout(()=>{
            //     setLoading(false)
            // },1000)
           setLoading(false)
        }).catch((error)=>{
            console.log(error)
            toast.error("Something went wrong!!")
             setTimeout(()=>{
                setLoading(false)
            },1000)
        })
    },[loading])
    const cancelOrder=(id)=>{
        let data={
            orderStatus:5,
            _id:id
        }
        setLoading(true)
        apiServices.updateOrder(data).then((data)=>{
            if(data.data.success){
                toast.success(data.data.message)
                setLoading(false)
            }else{
                toast.error(data.data.message)
                setLoading(false)
            }
        }).catch((error)=>{
            console.log(error)
            toast.error("Something went wrong!!")
            setTimeout(()=>{
                setLoading(false)
            },1000)
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
            <div className="container my-5 table-responsive">
                <table className="table table-bordered ">
                    <tr>
                        <th>Sr.No</th>
                        <th>Order Id</th>
                        <th>Product</th>
                        <th>Total Amount</th>
                        <th>User Details</th>
                        <th>Address</th>
                        <th>Shipment Url</th>
                        <th>Tracking Id</th>
                        <th>Order Status</th>
                        <th>Actions</th>
                        {/* <th>Delete</th> */}
                    </tr>
                    {orders?.map((element,index)=>(
                        <tr key={index+1}>
                            <td>{index+1}</td>
                            <td>{element?.orderId}</td>
                            <td>{element?.productId.name}</td>
                            <td>{element?.productId.price}</td>
                            <td>{element?.userId?.name},<br/> {element?.userId?.email}</td>
                            <td>{element?.address}</td>
                            {element?.shipmentUrl?
                            <td>{element?.shipmentUrl}</td>:
                            <td>---</td>
                            }
                            {element?.trackingId?
                            <td>{element?.trackingId}</td>:
                            <td>---</td>
                            }
                            <td>{element?.orderStatus==1?"Placed":element?.orderStatus==2?"Confirmed":element?.orderStatus==3?"Shipped":element?.orderStatus==4?"Delivered":"Cancelled"}</td>
                            <td>
                                {user_type==1 && element?.orderStatus!=5?
                                <Link to={`/admin/update_order/${element._id}`}>
                                    <button className="btn btn-info">Edit</button>
                                </Link>:
                                element?.orderStatus!=5 && element?.orderStatus!=3 && element?.orderStatus!=4?
                                    <button className="btn btn-danger" onClick={()=>{
                                        cancelOrder(element?._id)
                                    }}>Cancel</button>
                                :"---"
                                }
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
        </>
    )
}