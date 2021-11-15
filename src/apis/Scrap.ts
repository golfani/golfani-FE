import {getCookie} from "src/utils/cookieUtil";
import {securityAxios} from "src/security/axios";
import {TTarget} from "src/domain/Common";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/scrap`;
const userId = getCookie('userId');

export interface IScrapDto {
    id? : number
    userId : string
    refId : number
    targetType : TTarget
    isDeleted? : boolean
}

/**
 * 스크랩 등록하는 API
 * @param scrapDto
 */
export const registerScrap = async (scrapDto : IScrapDto) => {
    const response = await securityAxios.post(API_URL,scrapDto);
    return response.data;
}

/**
 * 스크랩한 피드 리스트 받아오는 API
 * @param page
 * @param size
 */
export const getFeedScrap = async (page : number = 0, size : number = 15) => {
    const response = await securityAxios.get(`${API_URL}/feed/${userId}?page=${page}&size=${size}`);
    return response.data;
}

/**
 * 스크랩한 게시글 리스트 받아오는 API
 * @param page
 * @param size
 */
export const getPostScrap = async (page : number = 0, size : number = 15) => {
    const response = await securityAxios.get(`${API_URL}/post/${userId}?page=${page}&size=${size}`);
    return response.data;
}

/**
 * 스크랩 취소하기 API
 * @param id
 */
export const deleteScrap = async (id : number) => {
    const response = await securityAxios.delete(`${API_URL}/${id}`);
    return response.data;
}
