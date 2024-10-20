import axios from "axios";

export default function addNewPassword(values){
    return axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values);
}