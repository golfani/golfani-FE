import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {wrapper} from "src/store/modules";
import {QueryClient, QueryClientProvider} from "react-query";
import {Hydrate} from "react-query/hydration";
import {useEffect, useState} from "react";
import {getCookie} from "src/utils/cookieUtil";
import {onSilentRefresh} from "src/utils/securityUtil";
import {IMessage} from "@stomp/stompjs";
import {socket, socketConnect, socketDisconnect, subChatChannel} from "src/socket/socket";
import SocketLoading from "src/components/common/SocketLoading";
import Head from "next/head";
import useFCM from "src/hooks/fcmHook";
import NotificationPermissionModal from "src/components/modals/NotificationPermissionModal";
import {isMobile} from "src/utils/detectDevice";

const queryClient = new QueryClient();

const alarmCallback = async (data: IMessage) => {
    const message = JSON.parse(data.body);
    if (message.type === 'CHAT') {
        await queryClient.invalidateQueries('chatRoom');
        await queryClient.invalidateQueries('unReadMessage');
    } else {
        await queryClient.invalidateQueries('alarm');
        await queryClient.invalidateQueries('unReadAlarm');
    }
}

function MyApp({Component, pageProps}: AppProps) {
    const userId = getCookie('userId');
    const [isSocketConnected, setIsSocketConnected] = useState(false);
    const [openPermissionModal, setOpenPermissionModal] = useState(false);
    const fcm = useFCM();

    const onSetSocketConnect = (state: boolean) => {
        setIsSocketConnected(state);
    }

    const chatCallback = async () => {
        await queryClient.invalidateQueries(['chatMessage', socket.chatRoomId]);
    }

    const subForActivatedChat = () => {
        socket.chatRoomId && subChatChannel(socket.chatRoomId, chatCallback);
    }

    const checkPermission = () => {
        if (Notification.permission === 'denied' || Notification.permission === 'default') {
            setOpenPermissionModal(true);
        }
    }

    useEffect(() => {
        if (userId) {
            // 로그인 상태일시 silentRefresh 진행
            onSilentRefresh(userId);
            // 로그인 상태일시 소켓연결 실행
            socketConnect(alarmCallback, onSetSocketConnect, subForActivatedChat);
            if (!isMobile()) {
                checkPermission();
                // 로그인 상태일시 FCM
                fcm.onGetToken();
            }
        }

        return () => socketDisconnect();
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydrateState}>
                <Head>
                    <title>GOLFANI</title>
                    <meta name={'viewport'}
                          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
                    <meta name="description" content="골프에 관심 있으신가요? 골아니에서 골프 정보를 찾아보세요~"/>
                    <meta property="og:image" key="ogimage" content="https://golfani.com/og_img.jpeg"/>
                    <meta property="og:title" key="ogtitle" content="골아니"/>
                    <meta property="og:description" key="ogdesc" content="골프에 관심 있으신가요? 골아니에서 골프 정보를 찾아보세요~"/>
                    <meta property="og:url" key="ogurl" content="https://golfani.com"/>
                </Head>
                {userId ? isSocketConnected ? <Component {...pageProps} /> : <SocketLoading/> :
                    <Component {...pageProps}/>}
                {openPermissionModal && <NotificationPermissionModal setOpenModal={setOpenPermissionModal}/>}
            </Hydrate>
        </QueryClientProvider>
    )
}

export default wrapper.withRedux(MyApp);
