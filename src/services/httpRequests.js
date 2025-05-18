import axios from 'axios'

const BASE_URL = 'http://fullstackweb.ir/api/v2/'

export const httpRequest = axios.create({
    baseURL:BASE_URL
})

export const httpInterceptedServices = axios.create({
    baseURL:BASE_URL
})
const isOnline = ()=>{
    return navigator.onLine
}
httpInterceptedServices.interceptors.request.use(

    async (config)=>{
        const token = localStorage.getItem('token');
        
        if(token){
            // @ts-ignore
            config.headers = {Authorization:'Bearer ' + token }
        }
        return config
    }
    , error => Promise.reject(error)
)

httpInterceptedServices.interceptors.response.use(

   response=>response,
   async error => { 
   if( error.response?.status === 500 || error.response?.status === 401 || !isOnline() || error.code === 'ERR_NETWORK'  ){
    if( !isOnline() || error.code === 'ERR_NETWORK'){
        alert('unstable network')
    }
    if(error.response?.status === 401 ){

        // window.location.href = '/login'


    }
   }
   return Promise.reject(error)
   }
)