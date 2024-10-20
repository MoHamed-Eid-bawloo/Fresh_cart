import axios from "axios";

export default function addToWishlist(productId){

    const token = localStorage.getItem('user1');

    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {productId}, {
        headers :{
            token
        }
    })
}