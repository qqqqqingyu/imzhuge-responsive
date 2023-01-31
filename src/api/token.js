/**
 * @description 获取csrftoken接口
 * @author GongDiXin
 * @since 2022.09.10
 * **/
import axios from "axios";
import config from '@/config'

export function getCSRFToken() {
    let csrftoken = '';
    // 判断cookie中是否有csrftoken 有的话更新storage
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
                    localStorage.setItem('csrftokenCache', csrftoken);
                    return;
                }
            }
        }
    }
    csrftoken = localStorage.getItem('csrftokenCache');
    if (csrftoken === null || csrftoken === undefined || csrftoken === '') {
        axios.get(config.serverUrl + "/get_csrf_token")
            .then(res => {
                if (res.data.code !== undefined && res.data.code === "200") {
                    localStorage.setItem('csrftokenCache', res.data.token);
                } else {
                    console.log("获取csrftoken失败")
                }
            }).catch(() => {
            console.log("获取csrftoken异常")
        });
    }
}