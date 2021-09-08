import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/reply`;

type TReply = "FEED" | "POST" | "FEED_REPLY" | "POST_REPLY"

export interface IReplyRegister {
    postId : number | null
    feedId : number | null
    referenceId : number | null
    referencedUser : string | null
    payload : string
    userId : string
}

export interface IReplyDto {
    id : number
    postId : number | null
    feedId : number | null
    referenceId : number | null
    referencedUser : string | null
    payload : string
    userId : string
    createTime : string
    modifiedTime : string
}

export const registerReply = async (type : TReply,
                                    id : number | null,
                                    payload : string,
                                    userId : string,
                                    refId : number | null = null,
                                    refUserId : string | null = null) => {
    const data : IReplyRegister = {
        postId : null,
        feedId : null,
        referenceId : null,
        referencedUser : null,
        payload : payload,
        userId : userId,
    }
    if (type === "FEED") data.feedId = id;
    else if (type === "POST") data.postId = id;
    else if (type === "FEED_REPLY") {
        data.feedId = id;
        data.referenceId = refId;
        data.referencedUser = refUserId;
    }
    else if (type === "POST_REPLY") {
        data.postId = id;
        data.referenceId = refId;
        data.referencedUser = refUserId;
    }

    const response = await axios.post(API_URL,data);
    return response.data;
}

/**
 * 해당 피드에 댓글의 수를 반환해주는 API
 * @param feedId
 */
export const getFeedReplyCount = async (feedId : number) => {
    const response = await axios.get(`${API_URL}/total/feed/${feedId}`);
    return response.data;
}

/**
 * 해당 피드의 댓글들을 반환해주는 API
 * @param feedId
 */
export const getFeedReply = async (feedId : number, page : number = 0, size : number = 3) => {
    const response = await axios.get(`${API_URL}/feed/${feedId}?page=${page}&size=${size}`);
    return response.data;
}

/**
 * 해당 Ref ID 를 참조하는 답글들을 요청하는 API
 * @param refId
 */
export const getReply = async (refId : number) => {
    const response = await axios.get(`${API_URL}/ref/${refId}`);
    return response.data;
}

/**
 *
 * @param replyId
 */
export const getTotalReply = async (replyId : number) => {
    const response = await axios.get(`${API_URL}/total/reply/${replyId}`);
    return response.data;
}
