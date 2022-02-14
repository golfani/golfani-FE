import style from './chat.module.css';
import ChatInput from "./ChatInput";
import {useEffect, useRef, useState} from "react";
import useChatRoom from "src/store/modules/chat/chatRoomHook";
import {useInfiniteQuery, useQueryClient} from "react-query";
import {getChatMessageByRoomId, IChatMessageDto} from "src/apis/Chat";
import {IPages} from "src/domain/Page";
import ChatItem from "./ChatItem";
import ArrowBackIosNewIcon from '@material-ui/icons/ArrowBackIosNew';
import UserProfileImage from "src/components/common/UserProfileImage";
import UserName from "src/components/common/UserName";
import Head from "next/head";

interface IChatProps {
    closeModal? : () => void;
}

const Chat = ({closeModal} : IChatProps) : JSX.Element => {
    const chatScrollRef = useRef<HTMLDivElement>(null);
    const chatRoom = useChatRoom();
    const chatMessageQuery = useInfiniteQuery<IPages<IChatMessageDto>>(['chatMessage', chatRoom.activeChatRoom?.id],
        ({pageParam = 0}, roomId = chatRoom.activeChatRoom?.id!) => getChatMessageByRoomId(roomId, pageParam, 20), {
            getNextPageParam: (lastPage) => {
                const currentPage = lastPage.pageable.pageNumber;
                if(currentPage + 1 >= lastPage.totalPages) {
                    return undefined;
                }
                return currentPage + 1;
            },
            enabled: chatRoom.activeChatRoom?.id !== undefined,
            staleTime: 6000 * 10
        })
    const queryClient = useQueryClient();
    const [isSendBySelf, setIsSendBySelf] = useState(false);
    const chatTopScrollRef = useRef<HTMLDivElement>(null);
    const observer = useRef<IntersectionObserver>();

    const chatScrollDown = () => {
        chatScrollRef.current?.scrollIntoView({ block: 'end', inline: 'nearest'});
    }

    const intersectionObserver = (entries : IntersectionObserverEntry[], io : IntersectionObserver) => {
        entries.forEach(async (entry) => {
            if(entry.isIntersecting) {
                await chatMessageQuery.fetchNextPage();
            }
        })
    }

    const handleClickBackIcon = () => {
        closeModal && closeModal();
    }

    useEffect(()=> {
        observer.current = new IntersectionObserver(intersectionObserver);
        chatTopScrollRef.current && observer.current?.observe(chatTopScrollRef.current);
    },[chatRoom.activeChatRoom])

    useEffect(()=> {
        isSendBySelf && chatScrollDown();
        setIsSendBySelf(false);
        const chatRoomInvalidate = async () => {
            await queryClient.invalidateQueries('chatRoom');
        }
        chatRoomInvalidate();
    },[chatMessageQuery.data]);

    return (
        <div className={style.container}>
            {chatRoom.activeChatRoom ?
                <div className={style.flex_box}>
                    <Head>
                        <title>{chatRoom.activeChatRoom.receiver}</title>
                    </Head>
                    <div className={style.chat_title_box}>
                        <div className={style.back_icon} onClick={handleClickBackIcon}>
                            <ArrowBackIosNewIcon/>
                        </div>
                        {chatRoom.activeChatRoom &&
                        <UserProfileImage
                            userId={chatRoom.activeChatRoom?.receiver!}
                            width={30}
                            height={30}
                            mr={15}
                        />
                        }
                        <UserName userName={chatRoom.activeChatRoom?.receiver!}/>
                    </div>
                    <div className={style.chat_box}>
                        <div ref={chatScrollRef}> </div>
                        {
                            chatMessageQuery.data?.pages.map((page, index) => {
                                return (
                                    <div key={index}>
                                        {page.content.map((chat, index) => (
                                            <ChatItem key={chat.id} chat={chat} chatData={page.content} index={index}/>
                                        ))}
                                    </div>
                                )
                            })
                        }
                        <div ref={chatTopScrollRef}> </div>
                    </div>
                    <ChatInput setIsSendBySelf={setIsSendBySelf}/>
                </div>
                : <p className={style.show_txt}>사용자들과 채팅을 나눠보세요!</p>}
        </div>
    );
};

export default Chat;
