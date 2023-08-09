import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import apiServices from "../../../Services/apiServices"
import { ClipLoader } from "react-spinners"
export default function UpdateProduct(){
    const navigate=useNavigate()
    const [loading,setLoading]=useState(true)
    const override={
        "position":'absolute',
        "display":"block",
        "top":"64%",
        "zIndex":"1",
    }
    const [subcategory,setSubCategory]=useState()
    const [image, setImage]=useState()
    const [category,setCategory]=useState()
    const[cat_id, setCatId]=useState()
    const[subcat_id, setSubCatId]=useState()
    const [price,setPrice]=useState()
    const [product,setProduct]=useState()
    const params=useParams()
    const product_id=params.id
    useEffect(()=>{
        let data={
            _id:product_id
        }
        apiServices.getSingleProduct(data).then((p_data)=>{
            setLoading(false)
            setProduct(p_data.data.data.name)
            setCatId(p_data.data.data.categoryId._id)
            setSubCatId(p_data.data.data.subcategoryId._id)
            setPrice(p_data.data.data.price)
            setImage(p_data.data.data.image)
        }).catch((error)=>{
            console.log(error)
            setTimeout(()=>{
                setLoading(false)
            })
        })
        apiServices.getAllCategory().then((data)=>{
            setCategory(data.data.data)
        }).catch((error)=>{
            console.log(error)
            toast.error("Error while loading category")
        })
        apiServices.getAllSubCategory().then((data)=>{
            setSubCategory(data.data.data)
        }).catch((error)=>{
            console.log(error)
            toast.error("Error while loading sub-category")
        })
    },[])
    const handleCategory=(e)=>{
        setCatId(e.target.value)
        // console.log(e.target.value)
    }
    const handleSubCategory=(e)=>{
        setSubCatId(e.target.value)
        // console.log(e.target.value)
    }
    const handleImage=(e)=>{
        setImage(e.target.files[0])
    }
    const handleForm=(e)=>{
        e.preventDefault()
        setLoading(true)
        let data=new FormData()
        data.append("name", product)
        data.append("product_image", image)
        data.append("categoryId", cat_id)
        data.append("subcategoryId",subcat_id)
        data.append("price",price)
        data.append("_id",product_id)
        // console.log(cat_id)
        apiServices.updateProduct(data).then((data)=>{
            setLoading(FontFaceSetLoadEvent)
            if(data.data.success){
                toast.success(data.data.message)
                setTimeout(()=>{
                    navigate("/admin/manage_product")
                },2000)
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
            <div className="container-fluid my-5">
                <div className="row">
                <div className="col-md-8 offset-md-2 border border-3 border-danger py-5 rounded">
                        <form onSubmit={handleForm}>
                        <div className="row my-3">
                                <div className="col-md-2">
                                    <label>Product Name</label>
                                </div>
                                <div className="col-md-10">
                                    <input type="text" className="form-control" value={product} onChange={(e)=>{setProduct(e.target.value)}}/>
                                </div>
                            </div>
                            <div className='row my-3'>
                                <div className="col-md-2">
                                    <label>Category</label>
                                </div>
                                <div className="col-md-10">
                                    <select required className="form-control" onChange={handleCategory}>
                                        <option  disabled value="">Choose Category</option>
                                        {
                                            category?.map((element,index)=>(
                                                <option key={index+1} value={element?._id} selected={element?._id==cat_id}>{element?.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col-md-2">
                                    <label>Sub-Category Name</label>
                                </div>
                                <div className="col-md-10">
                                    <select required className="form-control" onChange={handleSubCategory}>
                                        <option  disabled value="">Choose Sub-Category</option>
                                        {
                                            subcategory?.map((element,index)=>(
                                                <option key={index+1} value={element?._id} selected={element?._id==subcat_id}>{element?.name}</option>
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
                            <div className='row my-3'>
                                <div className="col-md-2">
                                    <label>Price</label>
                                </div>
                                <div className="col-md-10">
                                    <input className="form-control" type="number" value={price} onChange={(e)=>{setPrice(e.target.value)}} />
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