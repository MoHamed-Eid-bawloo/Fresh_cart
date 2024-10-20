import axios from "axios";

export function getProductCart() {
    let token = localStorage.getItem('user1');
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers : {
            token
        }
    });
}