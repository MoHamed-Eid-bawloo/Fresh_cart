
import axios from "axios";

export async function getSpecificProduct(id){
    try {
        let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        return response;
    } catch (error) {
        return error;
    }
}

