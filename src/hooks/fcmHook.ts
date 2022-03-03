import {initializeApp} from "firebase/app";
import {deleteToken, getMessaging, getToken, onMessage} from "firebase/messaging";
import {
    manageNotificationGroup
} from "src/apis/FirebaseCloudMessage";

const useFCM = () => {
    const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FCM_APP_KEY,
        authDomain: "golfani.firebaseapp.com",
        projectId: "golfani",
        storageBucket: "golfani.appspot.com",
        messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FCM_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
    };
    const app = initializeApp(firebaseConfig);

    const onGetToken = () => {
        const message = getMessaging();

        onMessage(message, (payload) => {
            const notification = new Notification(payload.notification?.title!, {body: payload.notification?.body});
        });

        getToken(message, {vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY}).then(async (currentToken) => {
            if (currentToken) {
                try {
                    await manageNotificationGroup(currentToken);
                } catch (e) {

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
        } catch (e) {
            console.log(e);
        }
    }

    return {onGetToken}
}

export default useFCM;
