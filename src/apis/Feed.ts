import {IFeedAddState} from "src/store/modules/feedAdd/feedAdd";
import axios from "axios";
import {tagListToString} from "src/utils/tagUtil";
import {securityAxios} from "src/security/axios";
import {getCookie} from "src/utils/cookieUtil";

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
    urlList : string[]
}

// API 주소입니다.
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/feed`;
const userId = getCookie('userId');

/**
 * NEED AUTH
 * 피드 작성 API 요청입니다.
 * @param feedAddState
 */
export const registerFeed = async (feedAddState : IFeedAddState) => {
    const feedDTO : IFeedRegister = {
        userId : userId,
        content : feedAddState.content,
        tag : tagListToString(feedAddState.tagList),
        isReplyActive : feedAddState.isReplyActive,
        isLikesActive : feedAddState.isLikesActive
    }

    const formData = new FormData();
    feedAddState.imgList.forEach((imgItem)=> formData.append("uploadFiles",imgItem.imgFile))
    formData.append("feedDto", JSON.stringify(feedDTO));

    const response = await securityAxios.post(`${API_URL}/`,formData);
    return response;
}

/**
 * Pageable 된 피드리스트를 요청하는 API
 * @param page
 */
export const getFeed = async (last_id : number = Number.MAX_SAFE_INTEGER, page : number = 0, size : number = 5) => {
    if(!last_id) {
        last_id = Number.MAX_SAFE_INTEGER;
    }
    const response = await axios.get(`${API_URL}?last_id=${last_id}&page=${page}&size=${size}`)
    return response.data;
}

/**
 * NEED AUTH
 * 피드 삭제 요청하는 API
 * @param feedId
 */
export const deleteFeed = async (feedId : number) => {
    const response = await securityAxios.delete(`${API_URL}/${feedId}`);
    return response.data;
}

/**
 * 핫 피드 리스트 요청하는 API
 * @param list
 * @param page
 * @param size
 */
export const getHotFeed = async () => {
    const response = await axios.get(`${API_URL}/hot`);
    return response.data;
}

/**
 * 해당 태그가 포함된 피드 리스트 요청하는 API
 * @param page
 * @param size
 * @param search
 */
export const getTagSearchFeed = async (page : number = 0, size : number = 6, search : string) => {
    const response = await axios.get(`${API_URL}/tag?tag=${search}`);
    return response.data;
}

/**
 * 해당 유저의 피드 리스트를 요청하는 API (페이지)
 * @param page
 * @param size
 * @param userId
 */
export const getUserFeed = async (page : number = 0, size : number = 6, userId : string) => {
    const response = await axios.get(`${API_URL}/recent/${userId}?page=${page}&size=${size}`);
    return response.data;
}

/**
 * 해당 유저의 모든피드를 요청하는 API
 * @param userId
 */
export const getAllUserFeed = async (userId : string) => {
    const response = await axios.get(`${API_URL}/all/${userId}`);
    return response.data;
}

/**
 * 피드Id에 해당하는 피드 한개 요청하는 API
 * @param feedId
 */
export const getFeedOne = async (feedId : number) => {
    const response = await axios.get(`${API_URL}/${feedId}`);
    return response.data;
}

/**
 * 피드 수정 API
 * @param feed
 */
export const modifyFeed = async (feed : IFeedContent) => {
    const response = await securityAxios.put(API_URL,feed);
    return response.data;
}
