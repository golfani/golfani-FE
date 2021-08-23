import {IFeedAddState, IImg} from "./feedAdd";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../index";
import {addImg,deleteImg,addTag,deleteTag,setContent,toggleLikesActive,toggleReplyActive} from "./feedAdd";

const useFeedAdd = () => {
    const feedAddState : IFeedAddState = useSelector((state : RootState) => state.feedAdd);

    const dispatch = useDispatch();

    const onAddImg = (img : IImg) => {
        dispatch(addImg(img));
    }

    const onDeleteImg = (id : number) => {
        dispatch(deleteImg(id));
    }

    const onAddTag = (tag : string) => {
        dispatch(addTag(tag));
    }

    const onDeleteTag = (id : number) => {
        dispatch(deleteTag(id));
    }

    const onSetContent = (content : string) => {
        dispatch(setContent(content));
    }

    const onToggleLikesActive = () => {
        dispatch(toggleLikesActive());
    }

    const onToggleReplyActive = () => {
        dispatch(toggleReplyActive());
    }

    return {feedAddState,onAddImg,onDeleteImg,onAddTag,onDeleteTag,onSetContent,onToggleLikesActive,onToggleReplyActive}
}

export default useFeedAdd;
