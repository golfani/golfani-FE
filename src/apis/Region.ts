import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/region`;

export interface IRegionDto {
    regCode: number
    region1: string
    region2: string
    region3: string
    region4: string
    region5: string
    latitude: number
    longitude: number
}

/**
 * Region 정보 읽어오는 API
 * @param regionDto
 * if region1 is falsy, return 최상위 주소
 * if region2 is falsy, return 중위 주소
 */
export const getRegionList = async (regionDto: Partial<IRegionDto>) => {
    const response = await axios.get(`${API_URL}/list?regCode=${regionDto.regCode}&region1=${regionDto.region1}&region2=${regionDto.region2}&region3=${regionDto.region3}`);
    return response.data;
}

export const getRegionByRegCode = async (regCode: number) => {
    const response = await axios.get(`${API_URL}/${regCode}`);
    return response.data;
}

/**
 * 해당 법정동 코드에 대한 중심좌표 가져오는 API
 * @param regCode
 */
export const getPosition = async (regCode: number) => {
    const response = await axios.get(`${API_URL}/position?regCode=${regCode}`);
    return response.data
}
