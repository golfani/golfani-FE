import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../index";
import {setChatRoom,init} from './chatRoom';
import {IChatRoomDto} from "src/apis/Chat";

const useChatRoom = () => {
    const activeChatRoom = useSelector((state : RootState) => state.chatRoom.chatRoom);

    const dispatch = useDispatch();

    const onSetChatRoomId = (chatRoom : IChatRoomDto) => {
        dispatch(setChatRoom(chatRoom));
    }

    const onInitChatRoom = () => {
        dispatch(init());
    }

    return {activeChatRoom, onSetChatRoomId,onInitChatRoom}
}

export default useChatRoom;
