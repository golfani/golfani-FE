import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/map`;

export interface IMapDto {
    regCode: number,
    latitude: number,
    longitude: number
}

/**
 * regCode 로 중심좌표 검색하는 API
 * @param regCode
 */
export const getMap = async (regCode: number) => {
    const response = await axios.get(`${API_URL}/${regCode}`);
    return response.data;
}
