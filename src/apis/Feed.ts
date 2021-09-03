import {IFeedAddState} from "src/store/modules/feedAdd/feedAdd";
import axios from "axios";
import {tagListToString} from "src/utils/tagUtil";

interface IFeedRegister {
    userId : string
    content : string
    tag : string
    isReplyActive : boolean
    isLikesActive : boolean
}

export interface IFeedContent {
    id : number
    content : string
    memberId : number
    isReplyActive : boolean
    isLikesActive : boolean
    tag : string
}

// API 주소입니다.
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/feed`;

/**
 * 피드 작성 API 요청입니다.
 * @param feedAddState
 */
export const registerFeed = async (feedAddState : IFeedAddState) => {
    const feedDTO : IFeedRegister = {
        userId : "gudwh14",
        content : feedAddState.content,
        tag : tagListToString(feedAddState.tagList),
        isReplyActive : feedAddState.isReplyActive,
        isLikesActive : feedAddState.isLikesActive
    }

    const formData = new FormData();
    feedAddState.imgList.forEach((imgItem)=> formData.append("uploadFiles",imgItem.imgFile))
    formData.append("feedDto", JSON.stringify(feedDTO));

    const response = await axios.post(`${API_URL}/`,formData);
    return response;
}

/**
 * Pageable 된 피드리스트를 요청하는 API
 * @param page
 */
export const getFeed = async (page : number = 0) => {
    const response = await axios.get(`${API_URL}?page=${page}&size=1`)
    return response.data;
}
