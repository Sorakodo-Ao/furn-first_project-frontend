//引入axios
import axios from "axios";
//创建request对象用来发送请求
const request = axios.create({
    timeout: 500
})

//request拦截器处理
request.interceptors.request.use(
    config =>{
        config.headers['Content-Type'] = 'application/json;charset=utf-8';
        return config;
    },error => {
        return Promise.reject(error);
    }
)

request.interceptors.response.use(
    response => {
        let res = response.data;
        //返回的是否是文件类型
        if(response.config.responseType === 'blob'){
            return res;
        }
        //是否是String对象
        if(typeof res === 'string'){
            res = res ? JSON.parse(res): res;
        }
        return res;
    },error => {
        console.log(error);
        return Promise.reject(error);
    }

)

export default request;