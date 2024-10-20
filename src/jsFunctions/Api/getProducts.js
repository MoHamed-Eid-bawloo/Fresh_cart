import axios from "axios";

export  function getProducts(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
}

