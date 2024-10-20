import axios from "axios";

export default function addProductToCart(productId) {

    let token = localStorage.getItem('user1');


    return axios.post('https://ecommerce.routemisr.com/api/v1/cart', {productId}, {
        headers : {
            token
        }
    })
}
