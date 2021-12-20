import axios from "axios";
import {IBusinessData} from "src/domain/Shop";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/shop`;
const apiKey = 'tc9tKrg5UQ2xH5m82l8ZzTeyQhvG9MzqcYgVW3Cs20uhHYlaENRuFs5qJkp79hTNKnuQvjF8A31E73rBIw2Tow==';

export interface IShopDto {
    id : number
    userId : string
    shopName : string
    isApproved : boolean
    telephone : string
    location : string
    regionId : number
    description : string
    latitude : number
    longitude : number
}

export const validateRegistrationNumber = async (data : IBusinessData) => {
    const response = await axios.post(`https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=${apiKey}`,data,{
        headers : {
            Authorization : apiKey
        }
    });
    return response.data;
}
