import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../index";
import {addNotice, INotice, readCommonNotice} from './notice';

const useNotice = () => {
    const notice = useSelector((state : RootState) => state.notice);

    const dispatch = useDispatch();

    const onAddNotice = (notice : INotice) => {
        dispatch(addNotice(notice));
    }

    const onReadCommonNotice = () => {
        dispatch(readCommonNotice());
    }

    const countNewNotice = () => {
        return notice.filter((item)=> (
          item.isRead === false && item.type !== 'MESSAGE'
        )).length
    }

    const countNewMessage = () => {
        return notice.filter((item)=> (
            item.isRead === false && item.type === 'MESSAGE'
        )).length
    }

    return {notice,onAddNotice,countNewNotice,countNewMessage,onReadCommonNotice};
}

export default useNotice;