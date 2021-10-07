import axios, {AxiosRequestConfig} from "axios";
import {regenerateAccessToken} from "src/apis/Member";
import {getCookie, removeCookie} from "src/utils/cookieUtil";

interface AxiosCustomRequestConfig extends AxiosRequestConfig {
    retryCount : number
}

const MAX_RETRY_COUNT = 3;
export const securityAxios = axios.create();

securityAxios.interceptors.response.use((config) => {
    return config;
}, async function (error) {
    const originalRequest : AxiosCustomRequestConfig = error.config;
    originalRequest.retryCount = originalRequest.retryCount ?? 0;
    const userId = getCookie('userId');
    if (userId) {
        if(originalRequest.retryCount <= MAX_RETRY_COUNT) {
            try {
                originalRequest.retryCount += 1;
                const response = await regenerateAccessToken(userId);
                securityAxios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
                return securityAxios(originalRequest);
            } catch (e) {
                if (error.response.body === '재발급 실패') {
                    removeCookie('userId');
                    removeCookie('refreshToken');
                    window.location.href = 'login';
                    alert('로그인 세션 만료, 다시 로그인 해주세요');
                }
            }
        } else {
            alert('잠시 후 다시시도해 주세요.');
            return Promise.reject(error);
        }
    } else {
        window.location.href = 'login';
    }
    return Promise.reject(error);
});
