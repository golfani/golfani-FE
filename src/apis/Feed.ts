import {IFeedAddState} from "src/store/modules/feedAdd/feedAdd";
import axios from "axios";

interface IFeedRegister {
    memberId : number
    content : string
    tag : string
    isReplyActive : boolean
    isLikesActive : boolean
}

const tagToString = (tagList : string[]) : string => {
    return '#'+tagList.join('#')
}

// API 주소입니다.
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/feed`;

/**
 * 피드 작성 API 요청입니다.
 * @param feedAddState
 */
export const registerFeed = async (feedAddState : IFeedAddState) => {
    const feedDTO : IFeedRegister = {
        memberId : 1, // for Test
        content : feedAddState.content,
        tag : tagToString(feedAddState.tagList),
        isReplyActive : feedAddState.isReplyActive,
        isLikesActive : feedAddState.isLikesActive
    }

    const formData = new FormData();
    feedAddState.imgList.forEach((imgItem)=> formData.append("uploadFiles",imgItem.imgFile))
    formData.append("feedDto", JSON.stringify(feedDTO));

    const response = await axios.post(`${API_URL}/`,formData);
    return response;
}
