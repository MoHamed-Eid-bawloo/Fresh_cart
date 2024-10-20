import axios from "axios";

export function getCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
}