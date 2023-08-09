import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import apiServices from "../../../Services/apiServices"
import { ClipLoader } from "react-spinners"
export default function AddSubCategory(){
    const [loading,setLoading]=useState(false)
    const override={
        "position":'absolute',
        "display":"block",
        "top":"64%",
        "zIndex":"1",
    }
    const [subcategory,setSubCategory]=useState()
    const [subimage, setSubImage]=useState()
    const [category,setCategory]=useState()
    const[cat_id, setCatId]=useState()
    useEffect(()=>{
        apiServices.getAllCategory().then((data)=>{
            setCategory(data.data.data)
        }).catch((error)=>{
            console.log(error)
        })
    },[])
    const handleCategory=(e)=>{
        setCatId(e.target.value)
        // console.log(e.target.value)
    }
    const handleImage=(e)=>{
        setSubImage(e.target.files[0])
    }
    const handleForm=(e)=>{
        e.preventDefault()
        setLoading(true)
        let data=new FormData()
        data.append("name", subcategory)
        data.append("subcategory_image", subimage)
        data.append("categoryId", cat_id)
        // console.log(cat_id)
        apiServices.addSubCategory(data).then((data)=>{
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
            })
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
            <div className="container-fluid my-5">
                <div className="row">
                <div className="col-md-8 offset-md-2 border border-3 border-danger py-5 rounded">
                        <form onSubmit={handleForm}>
                            <div className="row my-3">
                                <div className="col-md-2">
                                    <label>Sub-Category Name</label>
                                </div>
                                <div className="col-md-10">
                                    <input className="form-control" type="text" value={subcategory} onChange={(e)=>{setSubCategory(e.target.value)}}/>
                                </div>
                            </div>
                            <div className='row my-3'>
                                <div className="col-md-2">
                                    <label>Category</label>
                                </div>
                                <div className="col-md-10">
                                    <select required className="form-control" onChange={handleCategory}>
                                        <option selected disabled value="">Choose Category</option>
                                        {
                                            category?.map((element,index)=>(
                                                <option key={index+1} value={element?._id}>{element?.name}</option>
                                            ))
                                        }
                                    </select>
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