import axios from 'axios'
import { isMobileTerminal } from './flexible'
import { ElMessageBox } from 'element-plus'
import '../assets/CSS/MessageBox.css'

// 创建axios实例
const request = axios.create({
    withCredentials: true,
    timeout: 30000
})

// post请求默认请求头
request.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// 添加baseURL
// request.defaults.baseURL = 'https://m.imzhuge.com';

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
            if (res.code !== '200' && res.code !== 20000) {
                console.log('res.code:'+res.code+',res.msg:'+res.msg)
                if(res.code == '500000'){ // 出现500000时要刷新
                    ElMessageBox.alert(res.msg, '交易失败', {
                        confirmButtonText: '确定',
                        customClass: 'AlertBox',
                        callback: action => {
                            if (action === 'confirm') {
                                // 在点击确认按钮后刷新页面
                                location.reload();
                                this.isDisabled = false;
                            }
                        }
                    })
                } else{
                    if(res.msg === undefined){
                        ElMessageBox.alert('res.code:'+res.code, "未知错误", {
                            confirmButtonText: '确定',
                            customClass: 'AlertBox',
                        });
                    } else{
                        ElMessageBox.alert(res.msg, "交易失败", {
                            confirmButtonText: '确定',
                            customClass: 'AlertBox',
                        });
                    }
                }
                // window.alert(res.msg)
                return Promise.reject('error')
            } else {
                return response.data
            }
        }
    },
    error => {
        if (error.response.status === 401) {
            window.location.href = error.response.headers.location
            return
        }
        // window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe8f44e9ecc5eb254&redirect_uri=http://m.imzhuge.com/wechat/weChatLogin?from_url=http://www.imzhuge.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
        return Promise.reject(error)
    }
)

export default request;