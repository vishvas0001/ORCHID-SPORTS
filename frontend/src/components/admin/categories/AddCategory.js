import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import apiServices from "../../../Services/apiServices"
import { ClipLoader } from "react-spinners"
export default function AddCategory(){
    const [loading,setLoading]=useState(false)
    const override={
        "position":'absolute',
        "display":"block",
        "top":"64%",
        "zIndex":"1",
    }
    const [category,setCategory]=useState()
    const [image, setImage]=useState()
    const handleImage=(e)=>{
        setImage(e.target.files[0])
    }
    const handleForm=(e)=>{
        e.preventDefault()
        setLoading(true)
        let data=new FormData()
        data.append("name", category)
        data.append("category_image", image)
        // console.log(data)
        apiServices.addCategory(data).then((data)=>{
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
        <div className={loading?"disabled-screen":""}>
            <div className="d-flex justify-content-center">
                <ClipLoader loading={loading} cssOverride={override} size={120}/>
            </div>
            <section className="breadcrumb-section set-bg set-bg-brd" >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-text">
                                <h2>Category</h2>
                                <div className="breadcrumb-option">
                                    <Link to="/"><i className="fa fa-home"></i> Home</Link>
                                    <span>Category</span>
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
                                    <label>Category Name</label>
                                </div>
                                <div className="col-md-10">
                                    <input className="form-control" type="text" value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-md-2">
                                    <label>Image</label>
                                </div>
                                <div className="col-md-10">
                                    <input className="form-control" type="file" onChange={handleImage} />
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