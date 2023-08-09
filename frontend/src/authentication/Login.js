import Header from '../layouts/Header'
import Footer from '../layouts/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import apiServices from '../Services/apiServices'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners'
export default function Login(){
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)
    const[message,setMessage]=useState()
    const override={
        "position":'absolute',
        "display":"block",
        "top":"64%",
        "zIndex":"1",
    }
    useEffect(()=>{
        setMessage(sessionStorage.getItem("message"))
        if(message){
            toast.error(message)
            setTimeout(()=>{
                sessionStorage.removeItem("message")
            },2000)
        }
    },[message])
    const [email, setEmail]=useState()
    const [password, setPassword]=useState()
    const handleForm=(e)=>{
        e.preventDefault();
        setLoading(true)
        let data={
            email:email,
            password:password
        }
        apiServices.login(data).then((data)=>{
            setLoading(false)
            if(data.data.success){
                toast.success(data.data.message)
                // console.warn(data.data.token)
                sessionStorage.setItem("user_id", data.data.data._id)
                sessionStorage.setItem("user_name", data.data.data.name)
                sessionStorage.setItem("user_email", data.data.data.email)
                sessionStorage.setItem("token", data.data.token)
                sessionStorage.setItem("user_type", data.data.data.userType)
                sessionStorage.setItem("authenticate",true)
                if(data.data.data.userType==1|| data.data.data.userType=="1"){
                    navigate("/admin")
                }
                else{
                    navigate("/")
                }
            }
            else{
                toast.error(data.data.message)
            }
        }).catch((error)=>{
            console.log(error)
            toast.error("Something went Wrong")
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
                                <h2>Login</h2>
                                <div className="breadcrumb-option">
                                    <Link to="/"><i className="fa fa-home"></i> Home</Link>
                                    <span>Login</span>
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
                                    <label>Email</label>
                                </div>
                                <div className="col-md-10">
                                    <input className="form-control" type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-md-2">
                                    <label>Password</label>
                                </div>
                                <div className="col-md-10">
                                    <input className="form-control" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className='col-md-5 offset-md-4'>
                                    <button className='form-control btn btn-danger'>Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        <ToastContainer
            position="top-right"
            autoClose={3000}
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