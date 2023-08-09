import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiServices, { BASE_URL_Image } from "../../../Services/apiServices";
import { ClipLoader } from "react-spinners"
import Header from "../../../layouts/Header";
import Footer from "../../../layouts/Footer";
export default function ViewSubCatList(){
    const [loading,setLoading]=useState(true)
    const [subcategory,setSubCategory]=useState()
    const override={
        "position":'absolute',
        "display":"block",
        "top":"64%",
        "zIndex":"3",
    }
    const param=useParams()
    const c_id=param.id
    useEffect(()=>{
        let data={
            categoryId:c_id
        }
        apiServices.getAllSubCategory(data).then((data)=>{
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
    },[c_id])
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
                                <h2>Sub-Category</h2>
                                <div className="breadcrumb-option">
                                    <Link to="/"><i className="fa fa-home"></i> Home</Link>
                                    <span>Sub-Category</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container my-5">
                <div className="row">
                    {subcategory?.map((element,index)=>(
                        <div className="col-md-4 my-3" key={index+1}>
                            <div className="card" style={{maxHeight:"400px"}}>
                                <img src={BASE_URL_Image+element?.image} className="card-img-top" style={{height:"250px"}}/>
                                <div className="card-body">
                                    <h4 className="card-heading">{element?.name}</h4>
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    <Link to={`/view_products/${element?._id}`}>
                                        <button className="btn btn-secondary">Explore More</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
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