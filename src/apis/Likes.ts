import axios from "axios";
import {use} from "ast-types";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/likes`;

type TLikes = "FEED" | "POST" | "REPLY";

export interface ILikesDto {
    postId : number | null
    feedId : number | null
    replyId : number | null
    userId : string
    likes : boolean | null
}

/**
 * 좋아요 등록,취소 요청하는 API 입니다.
 * @param type
 * @param id
 * @param userId
 */
export const registerLikes = async (type : TLikes, id : number, userId : string) => {
    const data : ILikesDto = {
        postId : null,
        feedId : null,
        replyId : null,
        userId : userId,
        likes : null,
    }
    if (type === "FEED") data.feedId = id;
    else if (type === "POST") data.postId = id;
    else if (type === "REPLY") data.replyId = id;

    console.log(data);
    const response = await axios.post(API_URL,data);
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
 * @param memberId
 * @param feedId
 */
export const getUserIsFeedLikes = async (userId : string, feedId : number) => {
    const response = await axios.get(`${API_URL}/feed/${feedId}/${userId}`);
    return response.data;
}
