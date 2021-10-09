import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../index";
import {setChatRoom} from './chatRoom';

const useChatRoom = () => {
    const activeId = useSelector((state : RootState) => state.chatRoom.activeId);

    const dispatch = useDispatch();
    const onSetChatRoomId = (id : number) => {
        dispatch(setChatRoom(id));
    }

    return {activeId, onSetChatRoomId}
}

export default useChatRoom;
