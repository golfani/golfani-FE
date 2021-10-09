import style from './chatRoomList.module.css';
import ChatRoomItem from "./ChatRoomItem";

export interface IChatRoomItem {
    id : number
    userId : string
}

const chatRoomItems : IChatRoomItem[] = [
    {
        id : 1,
        userId : 'gudwh14'
    },
    {
        id : 2,
        userId : 'gudwh14'
    },
    {
        id : 3,
        userId : 'gudwh14'
    },
]

const ChatRoomList = () : JSX.Element => {
    return (
        <div className={style.container}>
            <span className={style.chatRoom_title_txt}>채팅목록</span>
            <div className={style.chatItem_box}>
                {chatRoomItems.map((chatRoomItem)=>(
                        <ChatRoomItem key={chatRoomItem.id} chatRoomItem={chatRoomItem}/>
                    )
                )}
            </div>
        </div>
    );
};

export default ChatRoomList;
