import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Home from './components/Home';
import Login from './authentication/Login';
import Register from './authentication/Register';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AddCategory from './components/admin/categories/AddCategory';
import ManageCategory from './components/admin/categories/ManageCategory';
import AddSubCategory from './components/admin/sub_categories/AddSubcategory';
import ManageSubCategory from './components/admin/sub_categories/ManageSubcategory';
import AddProduct from './components/admin/products/AddProduct';
import ManageProduct from './components/admin/products/ManageProduct';
import UpdateCategory from './components/admin/categories/UpdateCategory';
import UpdateSubCategory from './components/admin/sub_categories/UpdateSubCategory';
import UpdateProduct from './components/admin/products/UpdateProduct';
import ViewOrder from './components/admin/orders/ViewOrder';
import UpdateOrder from './components/admin/orders/UpdateOrder';
import Dashboard from './components/admin/Dashboard';
import AdminLayout from './components/admin/AdminLayout';
import ViewProductList from './components/users/products/ViewProductList';
import ViewSubCatList from './components/users/subcategories/ViewSubCatList';
import ViewSingleProduct from './components/users/products/ViewSingleProduct';
import ViewCart from './components/users/cart/ViewCart';
import Contact from './components/users/contact/Contact';
import Enquiry from './components/admin/enquiry/Enquiry';

function App() {
  return (
   <>
   <Router>
    <Routes>
      <Route path="/" element={<Home/>}>
        <Route path="/" element={<Main/>}/>
        {/* <Route path="/add_category" element={<AddCategory/>}/>
        <Route path="/manage_category" element={<ManageCategory/>}/>
        <Route path="update_category/:id" element={<UpdateCategory/>}/>
        <Route path="/add_subcategory" element={<AddSubCategory/>}/>
        <Route path="/manage_subcategory" element={<ManageSubCategory/>}/>
        <Route path="/update_subcat/:id" element={<UpdateSubCategory/>}/>
        <Route path="/add_product" element={<AddProduct/>}/>
        <Route path="/manage_product" element={<ManageProduct/>}/>
        <Route path="/update_product/:id" element={<UpdateProduct/>}/> */}
        <Route path="/all_orders" element={<ViewOrder/>}/>
        <Route path="/update_order/:id" element={<UpdateOrder/>}/>
      </Route>
      <Route path="/admin" element={<AdminLayout/>}>
        <Route path="/admin" element={<Dashboard/>}/>
        <Route path="/admin/add_category" element={<AddCategory/>}/>
        <Route path="/admin/manage_category" element={<ManageCategory/>}/>
        <Route path="/admin/update_category/:id" element={<UpdateCategory/>}/>
        <Route path="/admin/add_subcategory" element={<AddSubCategory/>}/>
        <Route path="/admin/manage_subcategory" element={<ManageSubCategory/>}/>
        <Route path="/admin/update_subcat/:id" element={<UpdateSubCategory/>}/>
        <Route path="/admin/add_product" element={<AddProduct/>}/>
        <Route path="/admin/manage_product" element={<ManageProduct/>}/>
        <Route path="/admin/update_product/:id" element={<UpdateProduct/>}/>
        <Route path="/admin/all_orders" element={<ViewOrder/>}/>
        <Route path="/admin/update_order/:id" element={<UpdateOrder/>}/>
        <Route path="/admin/enquiry" element={<Enquiry/>}/>
      </Route>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/view_product_list" element={<ViewProductList/>}/>
      <Route path="/view_products/:id" element={<ViewProductList/>}/>
      <Route path="/view_single_product/:id" element={<ViewSingleProduct/>}/>
      <Route path="/view_subcat/:id" element={<ViewSubCatList/>}/>
      <Route path="/view_cart" element={<ViewCart/>}/>
      <Route path="/contact" element={<Contact/>}/>
    </Routes>
   </Router>

   </>
  );
}
export default App;
