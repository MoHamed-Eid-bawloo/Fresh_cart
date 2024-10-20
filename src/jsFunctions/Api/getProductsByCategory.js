import axios from "axios";

export async function getProductsByCategory(catId){
    try {
        let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${catId}`);
        return response;
    } catch (error) {
        return error;
    }
}