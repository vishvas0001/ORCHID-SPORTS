import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiServices from "../Services/apiServices";
export default function Header(){
    const [category,setCategory]=useState()
    const user_type=sessionStorage.getItem('user_type')
    const authenticate=sessionStorage.getItem('authenticate')
    const navigate=useNavigate()
    useEffect(()=>{
        apiServices.getAllCategory().then((data)=>{
            if(data.data.success){
                setCategory(data.data.data)
            }
            else{
                toast.error(data.data.message)
            }
        }).catch((error)=>{
            console.log(error)
            toast.error("Something went wrong!!Try Again Later")
        })
    },[])
    const logout=()=>{
        sessionStorage.clear()
        setTimeout(()=>{
            sessionStorage.setItem("message","Logout Successfully")
            navigate("/login")
        },500)
    }
    // const [cart_item,setCartItem]=useState(0)
    // useEffect(()=>{
        
    // },[cart_item])
    return(
        <>
        {/* <!-- Header Section Begin --> */}
            <header className="header-section">
                <div className="container">
                    <div className="logo">
                        <a href="./index.html">
                            {/* <img src="assets/img/logo.png" alt=""/> */}
                            <h4 className="c1"><span className="c2">ORCHID-</span><span className="c3">SPORTS</span></h4>
                        </a>
                    </div>
                    <div className="nav-menu pt-4">
                        <nav className="mainmenu mobile-menu">
                            <ul>
                             
                                {/* <li><a href="./about-us.html">About</a></li> */}
                                {/* 
                                    <li><a href="./classes.html">Classes</a></li>
                                    <li><a href="./blog.html">Blog</a></li>
                                    <li><a href="./gallery.html">Gallery</a></li> 
                                */}
                                {/* <li><a href="./contact.html">Contacts</a></li> */}
                                {authenticate && user_type==1  ?
                                <>
                                 <Link to="/admin">
                                   <li className="active">
                                       <a>Home</a>
                                   </li>
                               </Link>
                                 <li>
                                    <span className="dropdown">
                                        <a data-bs-toggle="dropdown" aria-expanded="true">Category</a>
                                        <ul className="dropdown-menu">
                                            <Link to="/admin/add_category" >
                                                <li className="dropdown-item">
                                                    Add
                                                </li>
                                            </Link>
                                            <Link to="/admin/manage_category" >
                                                <li className="dropdown-item">
                                                    Manage
                                                </li>
                                            </Link>
                                        </ul>
                                    </span>
                                </li>
                                <li>
                                    <span className="dropdown">
                                        <a data-bs-toggle="dropdown" aria-expanded="true">Sub-Category</a>
                                        <ul className="dropdown-menu">
                                            <Link to="/admin/add_subcategory" >
                                                <li className="dropdown-item">
                                                    Add
                                                </li>
                                            </Link>
                                            <Link to="/admin/manage_subcategory" >
                                                <li className="dropdown-item">
                                                    Manage
                                                </li>
                                            </Link>
                                        </ul>
                                    </span>
                                </li>
                                <li>
                                    <span className="dropdown">
                                        <a data-bs-toggle="dropdown" aria-expanded="true">Product</a>
                                        <ul className="dropdown-menu">
                                            <Link to="/admin/add_product" >
                                                <li className="dropdown-item">
                                                    Add
                                                </li>
                                            </Link>
                                            <Link to="/admin/manage_product" >
                                                <li className="dropdown-item">
                                                    Manage
                                                </li>
                                            </Link>
                                        </ul>
                                    </span>
                                </li>
                                <Link to="/admin/enquiry">
                                    <li>
                                        <a>Enquiry</a>
                                    </li>
                                </Link>
                                </>:""}
                                {authenticate?
                                <>
                                 
                                <Link to="/all_orders">
                                <li>
                                    <a>Orders</a>
                                </li>
                                </Link>
                               
                                </>
                                :""}
                                
                                {!authenticate || user_type==2?
                                
                                <>
                                 <Link to="/">
                                   <li className="active">
                                       <a>Home</a>
                                   </li>
                               </Link>
                                <li>
                                    <span className="dropdown">
                                        <a data-bs-toggle="dropdown" aria-expanded="true">Category</a>
                                        <ul className="dropdown-menu">
                                           {category?.map((element,index)=>(
                                            <Link to={`/view_subcat/${element?._id}`}>
                                                <li className="dropdown-item" key={index+1}>
                                                    {element?.name}
                                                </li>
                                             </Link>
                                           ))}
                                        </ul>
                                    </span>
                                </li>
                                <Link to="/view_product_list">
                                    <li>
                                        <a>Product</a>
                                    </li>
                                </Link>
                                <Link to="/contact">
                                    <li>
                                        <a>Contact</a>
                                    </li>
                                </Link>
                                </>:""}
                                {!authenticate?
                                <Link to="/login">
                                <li>
                                    <a>Login</a>
                                </li>
                                </Link>:
                                <li onClick={logout}>
                                    <a>Logout</a>
                                </li>
                                }
                            </ul>
                        </nav>
                        {!authenticate?<Link to="/register"><a className="primary-btn signup-btn">Sign Up Today</a></Link>:""}
                        
                        {/* <button className="btn btn-outline-light btn-lg  position-relative">
                            <i className="bi bi-cart text-light fw-bold"></i>
                            &nbsp;
                            <span className="badge bg-danger rounded-pill">{cart_item}</span>
                        </button> */}
                    </div>
                    <div id="mobile-menu-wrap"></div>
                </div>
            </header>
        {/* <!-- Header End --> */}
        </>
    )
}