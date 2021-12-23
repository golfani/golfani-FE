import {securityAxios} from "src/security/axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/fcm`;

export const manageNotificationGroup = async (token : string) => {
    const data = {
        token : token
    }
    const response = await securityAxios.post(`${API_URL}/token`,data);
    return response.data;
}
