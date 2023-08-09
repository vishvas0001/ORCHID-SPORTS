import { Link } from "react-router-dom"
import Footer from "../../../layouts/Footer"
import Header from "../../../layouts/Header"
import apiServices from "../../../Services/apiServices"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { ClipLoader } from "react-spinners"
import 'react-toastify/dist/ReactToastify.css';


export default function Contact(){
    const [loading,setLoading]=useState(false)
    const override={
        "position":'absolute',
        "display":"block",
        "top":"64%",
        "zIndex":"1",
    }
    const [name,setName]=useState()
    const [email,setEmail]=useState()
    const [description,setDescription]=useState()
    
    const handleForm=(e)=>{
        e.preventDefault()
        setLoading(true)
        let data={
            name:name,
            email:email,
            description:description,
        }
        apiServices.addcontact(data).then((data)=>{
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
        <div >
            <div className="d-flex justify-content-center">
            </div>
            <div className="d-flex justify-content-center">
                <ClipLoader loading={loading} cssOverride={override} size={120}/>
            </div>
            <section className="breadcrumb-section set-bg set-bg-brd" >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-text">
                                <h2>Contact</h2>
                                <div className="breadcrumb-option">
                                    <Link to="/"><i className="fa fa-home"></i> Home</Link>
                                    <span>Contact</span>
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
                                <div className="col-md-3">
                                    <label>Name</label>
                                </div>
                                <div className="col-md-9">
                                    <input className="form-control" type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
                                </div>
                            </div>
                            
                            <div className="row my-3">
                                <div className="col-md-3">
                                    <label>Email</label>
                                </div>
                                <div className="col-md-9">
                                    <input className="form-control" type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                                </div>
                            </div>
                            
                            <div className="row my-3">
                                <div className="col-md-3">
                                    <label>Customer Enquiry</label>
                                </div>
                                <div className="col-md-9">
                                    <textarea className="form-control" rows="8" type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}} />
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
        <Footer/>
        <ToastContainer/>
        </>
    )
}