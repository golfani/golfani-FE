import axios from "axios";
import {getCookie} from "src/utils/cookieUtil";
import {securityAxios} from "src/security/axios";
import {TTarget} from "src/domain/Common";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/likes`;
const userId = getCookie('userId');

export interface ILikesDto {
    postId? : number
    feedId? : number
    replyId? : number
    userId : string
    likes? : boolean
    type : TTarget
}

/**
 * 좋아요 등록,취소 요청하는 API 입니다.
 * @param type
 * @param id
 */
export const registerLikes = async (type : TTarget, id : number) => {
    const data : ILikesDto = {
        userId : userId,
        type : type
    }
    if (type === "FEED") data.feedId = id;
    else if (type === "POST") data.postId = id;
    else if (type === "REPLY") data.replyId = id;

    const response = await securityAxios.post(API_URL,data);
    return response;
}

/**
 * 해당 피드에 대한 좋아요 수를 반환해주는 API
 * @param feedId
 */
export const getFeedLikes = async (feedId : number) => {
    const response = await axios.get(`${API_URL}/total/feed/${feedId}`);
    return response.data;
}

/**
 * 해당 피드에 유저가 좋아요를 눌렀는지 확인하는 API
 * @param feedId
 */
export const getUserIsFeedLikes = async (feedId : number) => {
    const response = await axios.get(`${API_URL}/feed/${feedId}/${userId}`);
    return response.data;
}

/**
 * 해당 댓글에 대한 좋아요 수를 반환해주는 API
 * @param replyId
 */
export const getReplyLikes = async (replyId : number) => {
    const response = await axios.get(`${API_URL}/total/reply/${replyId}`);
    return response.data;
}

/**
 * 해당 댓글에 유저가 좋아요를 눌렀는지 확인하는 API
 * @param replyId
 */
export const getUserIsReplyLikes = async (replyId : number) => {
    const response = await axios.get(`${API_URL}/reply/${replyId}/${userId}`);
    return response.data;
}
