import {regenerateAccessToken} from "../apis/Member";
import {securityAxios} from "../security/axios";
import {removeCookie} from "./cookieUtil";
import {socket} from "../socket/socket";

const onRegenerateAccessToken = async (userId : string) => {
    try {
        const response = await regenerateAccessToken(userId);
        securityAxios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
        socket.socketClient.connectHeaders['Authorization'] = response.data;
    }
    catch (e) {
        removeCookie('userId');
        window.location.href = 'login';
        alert('로그인 세션 만료, 다시 로그인 해주세요');
    }
}

export const onSilentRefresh = async (userId : string) => {
    const ACCESS_TOKEN_EXPIRE = 1000 * 60 * 15; // ms
    await onRegenerateAccessToken(userId);
    setTimeout(async ()=> {
        await onSilentRefresh(userId);
    },ACCESS_TOKEN_EXPIRE - 6000 * 5); // ms
}
