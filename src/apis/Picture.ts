import axios from "axios";

export const PICTURE_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/picture`;

export interface IPictureDto {
    id : number
    postId : number | null
    feedId : number | null
    brandId : number | null
    golfclubId : number | null
    inventoryId : number | null
    path : string
    filename : string
}

/**
 * 해당 피드가 가지고있는 이미지들을 반환해주는 API
 * @param feedId
 */
export const getFeedPicture = async (feedId : number) => {
    const response = await axios.get(`${PICTURE_API_URL}/feed/${feedId}`);
    return response.data;
}

/**
 * 파일경로와 피일이름으로 해당 이미지 파일 URL 가져오기
 * @param path
 * @param fileName
 */
export const getPictureFile =  (path : string, fileName : string) => {
    return `${PICTURE_API_URL}/file?fileName=${fileName}&filePath=${path}`;
}
