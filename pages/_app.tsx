import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {store, wrapper} from "src/store/modules";
import {QueryClient, QueryClientProvider} from "react-query";
import {Hydrate} from "react-query/hydration";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from "redux-persist";
import {useEffect, useState} from "react";
import {getCookie} from "src/utils/cookieUtil";
import {onSilentRefresh} from "src/utils/securityUtil";
import {IMessage} from "@stomp/stompjs";
import {socket, socketConnect, socketDisconnect, subChatChannel} from "src/socket/socket";
import SocketLoading from "src/components/common/SocketLoading";
import Head from "next/head";
import {getMessaging, getToken, isSupported} from "firebase/messaging";
import {FirebaseApp, initializeApp} from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCslF4Q0fxcHKw0Gibc5v0fP4qb9zrs5BQ",
    authDomain: "golfani.firebaseapp.com",
    projectId: "golfani",
    storageBucket: "golfani.appspot.com",
    messagingSenderId: "754644573375",
    appId: "1:754644573375:web:92b8afc4bd06032777ba0a",
    measurementId: "G-SXKEJV1VYX"
};

const queryClient = new QueryClient();
const reduxStore = store();
const persistor = persistStore(reduxStore);

const alarmCallback = async (data : IMessage) => {
    const message = JSON.parse(data.body);
    if(message.type === 'CHAT') {
        await queryClient.invalidateQueries('chatRoom');
        await queryClient.invalidateQueries('unReadMessage');
    }
    else {
        await queryClient.invalidateQueries('alarm');
        await queryClient.invalidateQueries('unReadAlarm');
    }
}

function MyApp({Component, pageProps}: AppProps) {
    const userId = getCookie('userId');
    const [isSocketConnected, setIsSocketConnected] = useState(false);
    const app = initializeApp(firebaseConfig);

    const onSetSocketConnect = (state : boolean) => {
        setIsSocketConnected(state);
    }

    const chatCallback = async () => {
        await queryClient.invalidateQueries(['chatMessage',socket.chatRoomId]);
    }

    const subForActivatedChat = () => {
        socket.chatRoomId && subChatChannel(socket.chatRoomId,chatCallback);
    }

    const onGetToken = async () => {
        const message = await getMessaging();
        await getToken(message, { vapidKey: 'BA2rpGOuAMUraL15Zjml-4pkQYD8z6l0jY96jtKF4E9ebC_kjqrPOXSRh7MXhmS_U8UoV1AeQEjUHxBBR50FJxM' }).then((currentToken) => {
            if (currentToken) {
                // Send the token to your server and update the UI if necessary
                console.log(currentToken);
                // ...
            } else {
                // Show permission request UI
                console.log('No registration token available. Request permission to generate one.');
                // ...
            }
        }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            // ...
        });
    }

    // 로그인 상태일시 silentRefresh 진행
    useEffect(() => {
        userId && onSilentRefresh(userId);
        userId && socketConnect(alarmCallback,onSetSocketConnect,subForActivatedChat);

        return () => socketDisconnect();
    }, []);

    useEffect(()=> {
        onGetToken();
    },[])
    return (
        <QueryClientProvider client={queryClient}>
            <PersistGate persistor={persistor} loading={null}>
                <Hydrate state={pageProps.dehydrateState}>
                    <Head>
                        <meta name={'viewport'} content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
                    </Head>
                    {userId ? isSocketConnected ? <Component {...pageProps} /> : <SocketLoading/> : <Component {...pageProps}/>}
                </Hydrate>
            </PersistGate>
        </QueryClientProvider>
    )
}

export default wrapper.withRedux(MyApp);
