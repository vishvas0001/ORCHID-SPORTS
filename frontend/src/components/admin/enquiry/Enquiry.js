import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners"
import apiServices from "../../../Services/apiServices";

export default function Enquiry(){
    const [loading,setLoading]=useState(true)
    const override={
        "position":'absolute',
        "display":"block",
        "top":"64%",
        "zIndex":"1",
    }
    const [subcategory,setSubCategory]=useState()
    useEffect(()=>{
        apiServices.getcontact({}).then((data)=>{
            setLoading(false)
            if(data.data.success){
                setSubCategory(data.data.data)
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
    },[])
    return(
        <>
            <div>
            <div className="d-flex justify-content-center">
            </div>
            <section className="breadcrumb-section set-bg set-bg-brd" >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-text">
                                <h2>Enquiry</h2>
                                <div className="breadcrumb-option">
                                    <Link to="/"><i className="fa fa-home"></i> Home</Link>
                                    <span>Enquiry</span>
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
                        <th>Customer</th>
                        <th>Email</th>
                        <th>Description</th>
                    </tr>
                    {subcategory?.map((element,index)=>(
                        <tr key={index+1}>
                            <td>{index+1}</td>
                            
                            <td>{element?.name}</td>
                            <td>{element?.email}</td>
                            <td>{element?.description}</td>
                           
                        </tr>
                    ))}
                </table>
            </div>
        </div>
        </>
    )
}