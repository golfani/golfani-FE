import axios from "axios";
import {regenerateAccessToken} from "src/apis/Member";
import {getCookie, removeCookie} from "src/utils/cookieUtil";

export const securityAxios = axios.create();

securityAxios.interceptors.response.use((config) => {
    return config;
}, async function (error) {
    const originalRequest = error.config;
    const userId = getCookie('userId');
    if (userId) {
        try {
            const response = await regenerateAccessToken(userId);
            securityAxios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
            return securityAxios(originalRequest);
        } catch (e) {
            if (error.response.body === '재발급 실패') {
                removeCookie('userId');
                removeCookie('refreshToken');
                window.location.href = "http://localhost:3000/login";
                alert('로그인 세션 만료, 다시 로그인 해주세요');
            }
        }
    } else {
        window.location.href = "http://localhost:3000/login";
    }
    return Promise.reject(error);
});
