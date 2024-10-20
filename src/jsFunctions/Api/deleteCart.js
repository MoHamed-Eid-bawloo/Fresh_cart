import axios from "axios";

export default function deleteCart(){

    const token = localStorage.getItem('user1');

    return axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
        headers :{
            token
        }
    })
}