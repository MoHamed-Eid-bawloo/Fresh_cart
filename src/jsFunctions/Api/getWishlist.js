import axios from "axios";

export default function getWishlist(){
    const token = localStorage.getItem('user1');

    return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers : {
            token
        }
    });
}