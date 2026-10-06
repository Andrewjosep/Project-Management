import axiosInstance from "./axiosinstance"

const apiService = async(httpMethods,url,reqBody)=>{
    const reqconfig = {
        method: httpMethods,
        url,
        data: reqBody
    }
    
    try{
        const response = await axiosInstance(reqconfig)
        return response
    }catch(err){
        throw err;
    }
}

export default apiService

