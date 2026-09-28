import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://pet-adoption-server-one.vercel.app'
})

const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;