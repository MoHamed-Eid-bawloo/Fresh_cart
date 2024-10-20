import axios from "axios";

export default function removeFromWishlist(id) {
    const token = localStorage.getItem('user1');
    
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers : {
            token
        }
    });
}
