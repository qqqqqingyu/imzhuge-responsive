import {getCSRFToken} from '@/api/token'

const CSRFToken = {
    mounted() {
        // 在每个组件的 mounted 钩子中执行
        getCSRFToken();
    },
};

export default CSRFToken;