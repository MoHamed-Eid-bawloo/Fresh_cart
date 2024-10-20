import axios from "axios";

export function updateCartItem({id, count}){
  

    let token = localStorage.getItem('user1');

    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {count}, {
        headers : {
            token
        }
    })
}