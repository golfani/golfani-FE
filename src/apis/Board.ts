import {boardDTO} from "../components/board/BoardWrite";
import {securityAxios} from "../security/axios";
import {EBoardType} from "../domain/board";
import axios from "axios";
import {TSelectMenu} from "../components/board/page/BoardPage";

export interface IBoardData{
    id:number,
    userId: string,
    boardId : number,
    title : string,
    content : string,
    boardType: EBoardType,
    createdTime : string,
    modifiedTime : string,
    viewCount : number,
    likesCount : number,
    reportCount : number,
    needReport : boolean,
    isDeleted : boolean,
    SearchType : string,
    replyCount : number,
    urlList : []
}

// API
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/board`;

export const registerBoard = async (boardDto : boardDTO, imgList : File[] ) => {
    const formData = new FormData();
    Array.from(imgList).forEach((imgItem)=> formData.append("uploadFiles", imgItem));
    formData.append("boardDto", JSON.stringify(boardDto));

    const response = await securityAxios.post(`${API_URL}`,formData);
    return response;
}

export const getBoard = async (boardType : EBoardType = EBoardType.FREE, page : number = 0, size : number = 10) => {
    const response = await axios.get(`${API_URL}/list?boardType=${boardType}&page=${page}&size=${size}`);
    return response.data;
}

export const getBoardView = async (id : string) => {
    const response = await axios.get(`${API_URL}/${id}`,{withCredentials: true});
    return response.data;
}

export const putBoard = async (boardDto : IBoardData) => {
    console.log(boardDto);
    const response = await securityAxios.put(`${API_URL}`, boardDto);
    return response;
}

export const deleteBoard = async (boardId : number) => {
    const response = await securityAxios.delete(`${API_URL}/${boardId}`);
    return response;
}

export const searchBoard = async ( searchType : TSelectMenu, payload : string, page : number = 0) => {
    const response = await axios.get(`${API_URL}/search?type=${searchType}&payload=${payload}&page=${page}`);
    return response.data;
}

export const onClickBoard = async (postId : string) => {
    const response = await axios.get(`${API_URL}/onClick/${postId}`, {withCredentials: true});
    return response;
}

/**
 * 해당 유저가 작성한 게시글 리스트 조회 API
 * @param userId
 */
export const getAllUserPost = async (userId : string) => {
    const response = await axios.get(`${API_URL}/all/${userId}`);
    return response.data;
}
