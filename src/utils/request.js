import axios from 'axios'
import { isMobileTerminal } from './flexible'
// 创建axios实例
const request = axios.create({
    withCredentials: true,
    timeout: 15000
})

// post请求默认请求头
request.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// request拦截器
request.interceptors.request.use(config => {
    // 如果后期需要添加token 可在此处统一添加请求头
    /*if (store.getters.token) {
        config.headers['Authorization'] = getToken()
    }*/
    // add csrftoken to header
    let csrftoken = '';
    let cookies = document.cookie
    if (cookies !== undefined && cookies !== '') {
        let cookieArray = cookies.split(";");
        for (let i = 0; i < cookieArray.length; i++) {
            let keyValue = cookieArray[i];
            let keyValueArr = keyValue.split("=");
            if (keyValueArr.length > 1) {
                let key = keyValueArr[0].replace(" ", "");
                if ("csrftoken" === key) {
                    csrftoken = keyValueArr[1];
                    break;
                }
            }
        }
    }
    // 如果cookie中没有 去storage获取csrftoken
    if (csrftoken === null || csrftoken === undefined || csrftoken === '') {
        csrftoken = localStorage.getItem('csrftokenCache');
    }
    if (csrftoken !== null && csrftoken !== undefined && csrftoken !== '') {
        config.headers['X-CSRFToken'] = csrftoken;
    }
    // 判断是yd还是pc
    // 添加cda请求标识头
    if (isMobileTerminal.value){
        config.headers['X-CDA-LOGIN-SIGN'] = 'phone';
    }
    else{
        config.headers['X-CDA-LOGIN-SIGN'] = 'pc';
    }
    return config
}, error => {
    console.log('err: ' + error)
    return Promise.reject(error)
})

// response拦截器
request.interceptors.response.use(
    response => {
        // code为非200时抛错
        const res = response.data
        let sign = response.headers['x-cda-redirect-login-sign'];
        if (sign !== undefined && sign === 'CDA') {
            let loginRedirectUrl = response.data.content;
            window.open(loginRedirectUrl, "_self" )
        } else {
            console.log(res.code+' : '+res.msg)
            if (res.code !== '200' && res.code != 20000) {
                // 后期可优化为响应一个MessageBox
                this.$message({
                    type: 'warning',
                    message: res.msg
                });
                console.log('res.code不为200或20000')
                // window.alert(res.msg)
                return Promise.reject('error')
            } else {
                return response.data
            }
        }
    },
    error => {
        console.log('err: ' + error)
        return Promise.reject(error)
    }
)

export default request;