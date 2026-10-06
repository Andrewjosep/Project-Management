import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "https://project-management-server-7r26.onrender.com",
    timeout: 5000
})

axiosInstance.interceptors.response.use(
    (response)=>{
        console.log("API Response recieved !!!");
        return response
    },

    (error)=>{
        const status = error.response.status;
        if(status === 401){
            console.log("Unauthorised Acecess");
        }else if(status === 404){
            console.log("API Not Found !!");
        }else if(status === 500){
            console.log("Something Went Wrong ... Try again Later !!");
        }else if(error.request){
            console.log("No Response from server");
        }else{
            console.log("Error"+ error.message);
        }
        return Promise.reject(error)
    }
)

export default axiosInstance;