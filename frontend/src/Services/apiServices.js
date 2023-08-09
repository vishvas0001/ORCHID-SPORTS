import axios from "axios"

const BASE_URL="http://localhost:3011/api/"
export const BASE_URL_Image="http://localhost:3011/"
const token=sessionStorage.getItem("token")
let header={
    "Accept":"*/*",
    "Authorization":token
}
class apiServices{
    login(data) {
        return axios.post(BASE_URL+"user/login",data)
    }
    register(data){
        return axios.post(BASE_URL+"user/add", data)
    }
    addCategory(data){
        const token=sessionStorage.getItem("token")
        let header={
            "Accept":"*/*",
            "Authorization":token
        }
        return axios.post(BASE_URL+"category/add",data,{headers:header})
    }
    getAllCategory(){
        const token=sessionStorage.getItem("token")
        let header={
            "Accept":"*/*",
            "Authorization":token
        }
        return axios.post(BASE_URL+"category/all",{headers:header})
    }
    getSingleCategory(data){
        const token=sessionStorage.getItem("token")
        let header={
            "Accept":"*/*",
            "Authorization":token
        }
        return axios.post(BASE_URL+"category/single",data,{headers:header})
    }
    updateCategory(data){
        const token=sessionStorage.getItem("token")
        let header={
            "Accept":"*/*",
            "Authorization":token
        }
        return axios.post(BASE_URL+"category/update",data,{headers:header})
    }
    addSubCategory(data){
        const token=sessionStorage.getItem("token")
        let header={
            "Accept":"*/*",
            "Authorization":token
        }
        return axios.post(BASE_URL+"subcategory/add",data,{headers:header})
    }
    getAllSubCategory(data){
        const token=sessionStorage.getItem("token")
        let header={
            "Accept":"*/*",
            "Authorization":token
        }
        return axios.post(BASE_URL+"subcategory/all",data,{headers:header})
    }
    getSingleSubCategory(data){
        const token=sessionStorage.getItem("token")
        let header={
            "Accept":"*/*",
            "Authorization":token
        }
        return axios.post(BASE_URL+"subcategory/single",data,{headers:header})
    }
    updateSubCategory(data){
        const token=sessionStorage.getItem("token")
        let header={
            "Accept":"*/*",
            "Authorization":token
        }
        return axios.post(BASE_URL+"subcategory/update",data,{headers:header})
    }
    addProduct(data){
        const token=sessionStorage.getItem("token")
        let header={
            "Accept":"*/*",
            "Authorization":token
        }
        return axios.post(BASE_URL+"product/add",data,{headers:header})
    }
    getAllProduct(data){
        const token=sessionStorage.getItem("token")
        let header={
            "Accept":"*/*",
            "Authorization":token
        }
        return axios.post(BASE_URL+"product/all",data,{headers:header})
    }
    getSingleProduct(data){
        const token=sessionStorage.getItem("token")
        let header={
            "Accept":"*/*",
            "Authorization":token
        }
        return axios.post(BASE_URL+"product/single",data,{headers:header})
    }
    updateProduct(data){
        const token=sessionStorage.getItem("token")
        let header={
            "Accept":"*/*",
            "Authorization":token
        }
        return axios.post(BASE_URL+"product/update",data,{headers:header})
    }
    deleteProduct(data){
        const token=sessionStorage.getItem("token")
        let header={
            "Accept":"*/*",
            "Authorization":token
        }
        return axios.post(BASE_URL+"deleteproduct",data,{headers:header})
    }
    getAllOrders(data){
        const token=sessionStorage.getItem("token")
        let header={
            "Accept":"*/*",
            "Authorization":token
        }
        // console.log(token)
        return axios.post(BASE_URL+"order/all",data,{headers:header})
    }
    getSingleOrder(data){
        const token=sessionStorage.getItem("token")
        let header={
            "Accept":"*/*",
            "Authorization":token
        }
        return axios.post(BASE_URL+"order/single",data,{headers:header})
    }
    updateOrder(data){
        const token=sessionStorage.getItem("token")
        let header={
            "Accept":"*/*",
            "Authorization":token
        }
        return axios.post(BASE_URL+"order/update", data, {headers:header})
    }
    getDashboard(data){
        const token=sessionStorage.getItem("token")
        let header={
            "Accept":"*/*",
            "Authorization":token
        }
        console.log(token)
        return axios.get(BASE_URL+"dashboard",{headers:header})
    }
    addOrder(data){
        const token=sessionStorage.getItem("token")
        let header={
            "Accept":"*/*",
            "Authorization":token
        }
        return axios.post(BASE_URL+"order/add",data,{headers:header})
    }
    addCart(data){
        const token=sessionStorage.getItem("token")
        let header={
            "Accept":"*/*",
            "Authorization":token
        }
        return axios.post(BASE_URL+"cart/add",data,{headers:header})
    }
      getCart(data){
        const token=sessionStorage.getItem("token")
        let header={
            "Accept":"*/*",
            "Authorization":token
        }
        return axios.post(BASE_URL+"cart/all",data,{headers:header})
    }
    removeCart(data){
        const token=sessionStorage.getItem("token")
        let header={
            "Accept":"*/*",
            "Authorization":token
        }
        return axios.post(BASE_URL+"cart/delete",data,{headers:header})
    }
    addcontact(data){
        return axios.post(BASE_URL+"contact/add",data)
    }
    getcontact(data){
        return axios.post(BASE_URL+"contact/getall",data)
    }
}
export default new apiServices