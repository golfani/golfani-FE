import {securityAxios} from "src/security/axios";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/fcm`;
const FCM_API_URL = 'https://fcm.googleapis.com/fcm/notification';

export interface INotificationGroup {
    operation : string
    notification_key_name : string
    notification_key : string
    registration_ids : string[]
}

export interface IFcmDto {
    id : number
    notiKeyName : string
    notiKey : string
    regiIds : string
}

export const manageNotificationGroup = async (notificationGroup : Partial<INotificationGroup>) => {
    const response = await axios.post(FCM_API_URL,notificationGroup,{
        headers : {
            'Authorization' : 'AIzaSyCslF4Q0fxcHKw0Gibc5v0fP4qb9zrs5BQ',
            'project_id' : '754644573375',
        },
    });
    return response.data;
}

export const registerFCM = async (fcmDto : Partial<IFcmDto>) => {
    const response = await securityAxios.post(API_URL, fcmDto);
    return response.data;
}

export const getFCM = async (notiKeyName : string) => {
    const response = await securityAxios.get(`${API_URL}/${notiKeyName}`);
    return response.data;
}

export const modifyFCM = async (fcmDto : IFcmDto) => {
    const response = await securityAxios.put(API_URL);
    return response.data;
}

export const deleteFCM = async (id : number) => {
    const response = await securityAxios.delete(`${API_URL}/${id}`);
    return response.data;
}
