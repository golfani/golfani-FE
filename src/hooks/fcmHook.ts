import {initializeApp} from "firebase/app";
import {deleteToken, getMessaging, getToken, onMessage} from "firebase/messaging";
import {getCookie} from "src/utils/cookieUtil";
import {
    manageNotificationGroup,
    getFCM,
    IFcmDto,
    INotificationGroup,
    registerFCM,
    modifyFCM
} from "src/apis/FirebaseCloudMessage";

const useFCM = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyCslF4Q0fxcHKw0Gibc5v0fP4qb9zrs5BQ",
        authDomain: "golfani.firebaseapp.com",
        projectId: "golfani",
        storageBucket: "golfani.appspot.com",
        messagingSenderId: "754644573375",
        appId: "1:754644573375:web:92b8afc4bd06032777ba0a",
        measurementId: "G-SXKEJV1VYX"
    };
    const app = initializeApp(firebaseConfig);
    const userId = getCookie('userId');

    const onGetToken = () => {
        const message = getMessaging();
        onMessage(message, (payload)=> {
            console.log(payload);
            // const notification = new Notification(payload.notification?.title!, { body : payload.notification?.body});
        });
        getToken(message, { vapidKey: 'BA2rpGOuAMUraL15Zjml-4pkQYD8z6l0jY96jtKF4E9ebC_kjqrPOXSRh7MXhmS_U8UoV1AeQEjUHxBBR50FJxM' }).then(async (currentToken) => {
            if (currentToken) {
                console.log(currentToken);
                await onSetFCM(currentToken);
            } else {

            }
        }).catch((err) => {

        });
    }

    const onSetFCM = async (token : string) => {
        try {
            const fcmDto : IFcmDto = await isExistFCM();
            console.log(fcmDto);
            if(fcmDto) {
                console.log(checkNewFcmToken(fcmDto.regiIds,token));
                if(checkNewFcmToken(fcmDto.regiIds,token)) {
                    await addNotificationGroup(fcmDto.notiKey,token);
                    await addFCM(fcmDto,token);
                }
                else {

                }
            }
            else {
                const notification_key = await createNotificationGroup(token);
                console.log(notification_key);
                const response = await registerNewFCM(notification_key,token);
                console.log(response);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    const isExistFCM = async () => {
        try {
            return await getFCM(userId);
        }
        catch (e) {

        }
    }

    const createNotificationGroup = async (token : string) => {
        try {
            const newGroup : Partial<INotificationGroup> = {
                operation : 'create',
                notification_key_name : userId,
                registration_ids : [token]
            }
            return await manageNotificationGroup(newGroup);
        }
        catch (e) {

        }
    }

    const checkNewFcmToken = (tokenString : string, token : string) => {
        const tokenList = tokenString.split(',');
        return !(tokenList.includes(token));
    }

    const addNotificationGroup = async (notiKey : string, token : string) => {
        try {
            const addGroup : Partial<INotificationGroup> = {
                operation : 'add',
                notification_key : notiKey,
                registration_ids : [token]
            }
            return await manageNotificationGroup(addGroup);
        }
        catch (e) {

        }
    }

    const registerNewFCM = async (notiKey : string, token : string) => {
        try {
            const newFCM : Partial<IFcmDto> = {
                notiKeyName : userId,
                notiKey : notiKey,
                regiIds : token
            }
            const response = await registerFCM(newFCM);
        }
        catch (e) {

        }
    }

    const addFCM = async (fcmDto : IFcmDto, token : string) => {
        try {
            const newFcmDto : IFcmDto = {...fcmDto, regiIds : fcmDto.regiIds + ',' + token}
            const response = await modifyFCM(newFcmDto);
        }
        catch (e) {

        }
    }

    const onDeleteToken = async () => {
        const message = getMessaging();
        try {
            const deleteToken1 = await deleteToken(message);
            console.log(deleteToken1);
        }
        catch (e) {
            console.log(e);
        }
    }

    return {onGetToken}
}

export default useFCM;
