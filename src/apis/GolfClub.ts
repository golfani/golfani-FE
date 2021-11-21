import {securityAxios} from "../security/axios";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/golfclub`;

export type TGolfClub = 'PUTTER' | 'DRIVER' | 'WOOD' | 'IRON' | 'WEDGE' | 'UTIL';

export interface IGolfClubDto {
    id : number
    brandId : number
    name : string
    description : string
    cost : number
    score : number
    gender : string
    year : number
    face : number
    shaft : number
    sound : number
    shooting : number
    isDeleted : boolean
    clubType : TGolfClub
    urlList : string[]
}

/**
 * 골프 클럽 등록하기 API
 * @param golfClubDto
 * @param imgFiles
 */
export const registerGolfClub = async (golfClubDto : Partial<IGolfClubDto>, imgFiles : File[]) => {
    const formData = new FormData();
    formData.append('golfclubDto',JSON.stringify(golfClubDto));
    imgFiles.map((imgFile) => {
        formData.append('uploadFiles',imgFile);
    });

    const response = await securityAxios.post(API_URL,formData);
    return response.data;
}

/**
 * 골프클럽 아이템 정보 가져오기 API
 * @param id
 */
export const getGolfClub = async (id : number) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
}

/**
 * 해당 brandId 에 해당하는 골프클럽 리스트 불러오기 API
 * @param brandId
 * @param page
 * @param size
 */
export const getAllGolfClub = async (brandId : number, page : number = 0, size : number = 10) => {
    const response = await axios.get(`${API_URL}/all?brandId=${brandId}&page=${page}&size=${size}`);
    return response.data;
}

/**
 * 해당 brandId,golf type 에 해당하는 골프클럽 리스트 불러오기 API
 * @param brandId
 * @param type
 * @param page
 * @param size
 */
export const getGolfClubByType = async (brandId : number, type : TGolfClub, page : number = 0, size : number = 10) => {
    const response = await axios.get(`${API_URL}/list?brandId=${brandId}&type=${type}&page=${page}&size=${size}`);
    return response.data;
}
