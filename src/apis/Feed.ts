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
    userId : string
    isReplyActive : boolean
    isLikesActive : boolean
    tag : string
    createdTime : string
    modifiedTime : string
    likesCount : number
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
export const getFeed = async (page : number = 0, size : number = 10) => {
    const response = await axios.get(`${API_URL}?page=${page}&size=${size}`)
    return response.data;
}

/**
 * 피드 삭제 요청하는 API
 * @param feedId
 */
export const deleteFeed = async (feedId : number) => {
    const response = await axios.delete(`${API_URL}/${feedId}`);
    return response.data;
}

/**
 * 핫 피드 리스트 요청하는 API
 * @param page
 * @param size
 */
export const getHotFeed = async (page : number = 0, size : number = 6) => {
    const response = await axios.get(`${API_URL}/hot?page=${page}&size=${size}`);
    return response.data;
}

export const getTagSearchFeed = async (page : number = 0, size : number = 6, search : string) => {
    const response = await axios.get(`${API_URL}/tag?tag=${search}`);
    return response.data;
}
