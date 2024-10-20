import axios from "axios";

export default function getBrands(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands');
}