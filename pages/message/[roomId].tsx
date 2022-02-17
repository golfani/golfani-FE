import style from "styles/message.module.css";
import Head from "next/head";
import Navbar from "src/components/common/navbar/Navbar";
import {useRouter} from "next/router";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getChatRoom, IChatRoomDto, setChatMessageRead} from "src/apis/Chat";
import ChatRoomList from "src/components/message/ChatRoomList";
import Chat from "src/components/message/Chat";
import {subChatChannel, unSubChatChannel} from "src/socket/socket";
import {useEffect, useState} from "react";

const Message = (): JSX.Element => {
    // 현재 roomId
    const router = useRouter();
    const roomId = Number(router.query.roomId);
    // 현재 room 정보
    const chatRoom = useQuery<IChatRoomDto>(['chatRoom', roomId], () => getChatRoom(roomId), {
        enabled: roomId !== undefined,
    });

    const queryClient = useQueryClient();
    const chatMessageMutate = useMutation(() => setChatMessageRead(roomId));
    const [isSmallDevice, setSmallDevice] = useState(false);

    const callback = async () => {
        await queryClient.invalidateQueries(['chatMessage', roomId]);
    }

    const onReadChatMessage = async () => {
        try {
            const response = await chatMessageMutate.mutateAsync();
        } catch (e) {
            console.log(e);
        } finally {
            await queryClient.invalidateQueries('chatRoom');
        }
    }

    const onMount = async () => {
        await onReadChatMessage();
        await queryClient.invalidateQueries('unReadMessage');
        // if(chatRoomItem.id !== chatRoom.activeChatRoom?.id) {
        //     chatRoom.activeChatRoom && unSubChatChannel(chatRoom.activeChatRoom.id!);
        // }
        await subChatChannel(roomId, callback);
    }

    const unMount = () => {
        unSubChatChannel(roomId);
    }

    useEffect(() => {
        if (window.innerWidth <= 768) {
            setSmallDevice(true);
        }
        onMount();
        return () => unMount();
    }, []);

    return (
        <div className={style.container}>
            <Head>
                <title>골아니 메세지</title>
            </Head>
            {isSmallDevice || <Navbar/>}
            <div className={style.chat_box}>
                {isSmallDevice || <ChatRoomList/>}
                {chatRoom.data && <Chat chatRoom={chatRoom.data}/>}
            </div>
        </div>
    );
};

export default Message;
