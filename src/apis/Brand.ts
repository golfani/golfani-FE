import {securityAxios} from "src/security/axios";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/brand`;

export interface IBrandDto {
    id : number
    brandScore : number
    brandName : string
    brandDescription : string
    reviewCount : number
    initialSound : string
    imageUrl : string
}

/**
 * 브랜드 등록 API
 * @param brandDto
 * @param imgFile
 */
export const registerBrand = async (brandDto : Partial<IBrandDto>, imgFile : File) => {
    const formData = new FormData();
    formData.append('brandDto',JSON.stringify(brandDto));
    formData.append('profile',imgFile);

    const response = await securityAxios.post(API_URL,formData);
    return response.data;
}

/**
 * 브랜드 LIST 요청 API
 * @param page
 * @param size
 * @param sort
 */
export const getBrandList = async (page : number = 0, size : number = 10, sort : string = 'id,desc') => {
    const response = await axios.get(`${API_URL}/list?page=${page}&size=${size}&sort=${sort}`);
    return response.data;
}

/**
 * 검색어 일치 브랜드 LIST 요청 API
 * @param startName
 * @param page
 * @param size
 * @param sort
 */
export const getBrandListWithStartName = async (startName : string, page : number = 0, size : number = 10, sort : string = 'id,desc') => {
    const response = await axios.get(`${API_URL}/start?start_name=${startName}&page=${page}&size=${size}&sort=${sort}`);
    return response.data;
}

/**
 * 브랜드 수정 API
 * @param brandDto
 * @param imgFile
 */
export const modifyBrand = async (brandDto : Partial<IBrandDto>, imgFile : File) => {
    const formData = new FormData();
    formData.append('brandDto',JSON.stringify(brandDto));
    formData.append('profile',imgFile);

    const response = await securityAxios.put(API_URL,formData);
    return response.data;
}

/**
 * 브랜드 삭제 API
 * @param id
 */
export const deleteBrand = async (id : number) => {
    const response = await securityAxios.delete(`${API_URL}/${id}`);
    return response.data;
}
