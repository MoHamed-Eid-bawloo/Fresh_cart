import axios from "axios";

export default function verifyCode(code){
    return axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', code);
}