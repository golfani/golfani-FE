import {securityAxios} from "src/security/axios";
import {EBoardType, TSelectMenu} from "src/domain/board";
import axios from "axios";

export interface IBoardData {
    id: number,
    userId: string,
    boardId: number,
    title: string,
    content: string,
    boardType: EBoardType,
    createdTime: string,
    modifiedTime: string,
    viewCount: number,
    likesCount: number,
    reportCount: number,
    needReport: boolean,
    isDeleted: boolean,
    SearchType: string,
    replyCount: number,
    urlList: string[],
    hasImage: boolean,
    isHot: boolean,
    pinned: boolean
}

// API
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/board`;

export const registerBoard = async (boardDto: Partial<IBoardData>, imgList: File[]) => {
    const formData = new FormData();
    Array.from(imgList).forEach((imgItem) => formData.append("uploadFiles", imgItem));
    formData.append("boardDto", JSON.stringify(boardDto));

    const response = await securityAxios.post(`${API_URL}`, formData);
    return response;
}

export const getBoard = async (boardType: EBoardType = EBoardType.FREE, page: number = 0, size: number = 10) => {
    const response = await axios.get(`${API_URL}/list?boardType=${boardType}&page=${page}&size=${size}`);
    return response.data;
}

export const getBoardView = async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`, {withCredentials: true});
    return response.data;
}

export const putBoard = async (boardDto: IBoardData) => {
    const response = await securityAxios.put(`${API_URL}`, boardDto);
    return response;
}

export const deleteBoard = async (boardId: number) => {
    const response = await securityAxios.delete(`${API_URL}/${boardId}`);
    return response;
}

export const searchBoard = async (searchType: TSelectMenu, payload: string, boardType: EBoardType, page: number = 0) => {
    const response = await axios.get(`${API_URL}/search?type=${searchType}&payload=${payload}&boardType=${boardType}&page=${page}`);
    return response.data;
}

export const onClickBoard = async (postId: string) => {
    const response = await axios.get(`${API_URL}/onClick/${postId}`, {withCredentials: true});
    return response;
}

/**
 * 해당 유저가 작성한 게시글 리스트 조회 API
 * @param userId
 */
export const getAllUserPost = async (userId: string) => {
    const response = await axios.get(`${API_URL}/all/${userId}`);
    return response.data;
}

/**
 * 인기게시글 카테고리 게시글 리스트 조회 API
 * @param page
 * @param size
 */
export const getHotPost = async (page: number = 0, size: number = 10) => {
    const response = await axios.get(`${API_URL}/hot`);
    return response.data;
}

/**
 * 현재 게시글 기준으로 이전글, 다음글 요청하는 API
 * @param type
 * @param postId
 * @param boardType
 */
export const getNextOrPrevPost = async (type: string, postId: number, boardType: string) => {
    const response = await axios.get(`${API_URL}/move?type=${type}&postId=${postId}&boardType=${boardType}`);
    return response.data;
}

/**
 * 한개의 게시글 가져오는 API
 * @param postId
 */
export const getPostOne = async (postId: number) => {
    const response = await axios.get(`${API_URL}/${postId}`);
    return response.data;
}

/**
 * 상단고정된 게시글을 가져오는 API
 * @param boardType
 */
export const getPinnedPost = async (boardType: EBoardType) => {
    const response = await axios.get(`${API_URL}/pinned?boardType=${boardType}`);
    return response.data;
}
