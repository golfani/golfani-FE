import axios from "axios";
import {IBusinessData} from "src/domain/Shop";
import {securityAxios} from "src/security/axios";
import {IShopRegisterImg} from "../store/modules/shopRegister/shopRegister";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/shop`;
const apiKey = process.env.NEXT_PUBLIC_OPEN_API_KEY;

export interface IShopDto {
    id: number
    userId: string
    shopName: string
    isApproved: boolean
    telephone: string
    location: string
    subLocation: string
    regionId: number
    description: string
    latitude: number
    longitude: number
    registrationNumber: string
}

export const validateRegistrationNumber = async (data: IBusinessData) => {
    const response = await axios.post(`https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=${apiKey}`, data, {
        headers: {
            Authorization: apiKey
        }
    });
    return response.data;
}

export const registerShop = async (shopDto: Partial<IShopDto>, shopImg: IShopRegisterImg, regImg: IShopRegisterImg) => {
    const formData = new FormData();
    formData.append('uploadFiles', shopImg.imgFiles);
    formData.append('uploadFiles', regImg.imgFiles);
    formData.append('shopDto', JSON.stringify(shopDto));

    const response = await securityAxios.post(API_URL, formData);
    return response.data;
}
