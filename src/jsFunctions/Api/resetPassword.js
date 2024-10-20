import axios from "axios";

export default function resetPassword(email){
    return axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', email);
}