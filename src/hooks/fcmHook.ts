import {initializeApp} from "firebase/app";
import {deleteToken, getMessaging, getToken, onMessage} from "firebase/messaging";
import {
    manageNotificationGroup
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

    const onGetToken = () => {
        const message = getMessaging();
        onMessage(message, (payload)=> {
            const notification = new Notification(payload.notification?.title!, { body : payload.notification?.body});
        });
        getToken(message, { vapidKey: 'BA2rpGOuAMUraL15Zjml-4pkQYD8z6l0jY96jtKF4E9ebC_kjqrPOXSRh7MXhmS_U8UoV1AeQEjUHxBBR50FJxM' }).then(async (currentToken) => {
            if (currentToken) {
                try {
                    const response = await manageNotificationGroup(currentToken);
                }
                catch (e) {

                }
            } else {

            }
        }).catch((err) => {

        });
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
