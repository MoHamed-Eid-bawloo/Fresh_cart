import axios from "axios";

export function removeProductCart(id){

    let token = localStorage.getItem('user1');

    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers : {
            token
        }
    })
}