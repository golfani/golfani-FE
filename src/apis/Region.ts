import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/region`;

export interface IRegionDto {
    regCode: number
    region1: string
    region2: string
    region3: string
}

/**
 * Region 정보 읽어오는 API
 * @param regionDto
 * if region1 is falsy, return 최상위 주소
 * if region2 is falsy, return 중위 주소
 */
export const getRegionList = async (regionDto: Partial<IRegionDto>) => {
    const response = await axios.get(`${API_URL}?regCode=${regionDto.regCode}&region1=${regionDto.region1}&region2=${regionDto.region2}&region3=${regionDto.region3}`);
    return response.data;
}
