import axios from "axios";

const api = axios.create({
    baseURL: "http://172.20.248.93:3666"
})

export default api;