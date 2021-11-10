import {boardDTO} from "../components/board/main/BoardWrite";
import {securityAxios} from "../security/axios";
import {EType} from "../domain/board";

export interface IBoardData{
    id:number,
    userId: string,
    boardId : number,
    title : string,
    content : string,
    boardType: EType,
    createdTime : string,
    modifiedTime : string,
    viewCount : number,
    likesCount : number,
    reportCount : number,
    needReport : boolean,
    isDeleted : boolean,
    SearchType : string,
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

export const getBoard = async (boardType : EType, page : number = 0, size : number = 10) => {
    const response = await securityAxios.get(`${API_URL}/list?boardType=${boardType}&page=${page}&size=${size}`);
    return response.data;
}

export const getBoard2 = async (boardType : EType, page : number = 0, size : number = 10) => {
    const response = await securityAxios.get(`${API_URL}/list?boardType=${boardType}&page=${page}&size=${size}`);
    return response.data;
}

export const getBoardView = async (id : string) => {
    const response = await securityAxios.get(`${API_URL}/${id}`, {withCredentials : true});
    return response.data;
}

export const putBoard = async (boardDto : IBoardData) => {
    console.log(boardDto);
    const response = await securityAxios.put(`${API_URL}`, boardDto);
    return response;
}

export const deleteBoard = async (boardId : number) => {
    const response = await securityAxios.delete(`${API_URL}/${boardId}`)
    return response;
}
