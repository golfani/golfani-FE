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

const queryClient = new QueryClient();
const reduxStore = store();
const persistor = persistStore(reduxStore);

const alarmCallback = async (data : IMessage) => {
    const message = JSON.parse(data.body);
    if(message.type === 'CHAT') {
        await queryClient.invalidateQueries('chatRoom');
    }
    else {
        await queryClient.invalidateQueries('alarm');
        await queryClient.invalidateQueries('unReadAlarm');
    }
}

function MyApp({Component, pageProps}: AppProps) {
    const userId = getCookie('userId');
    const [isSocketConnected, setIsSocketConnected] = useState(false);

    const onSetSocketConnect = (state : boolean) => {
        setIsSocketConnected(state);
    }

    const chatCallback = async () => {
        await queryClient.invalidateQueries(['chatMessage',socket.chatRoomId]);
    }

    const subForActivatedChat = () => {
        socket.chatRoomId && subChatChannel(socket.chatRoomId,chatCallback);
    }

    // 로그인 상태일시 silentRefresh 진행
    useEffect(() => {
        userId && onSilentRefresh(userId);
        userId && socketConnect(alarmCallback,onSetSocketConnect,subForActivatedChat);

        return () => socketDisconnect();
    }, []);

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
