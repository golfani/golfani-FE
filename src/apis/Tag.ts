import axios from "axios";
import {tagListToString} from "src/utils/tagUtil";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/tag`;

export interface ITagDto {
    id : number
    tagName : string
}

/**
 * 태그를 등록하는 API
 * @param tagList
 */
export const registerTag = async (tagList : string[]) => {
    const data = {
        tagName : tagListToString(tagList)
    }

    const response = await axios.post(API_URL,data);
    return response;
}

/**
 * 해당 글자가 포함된 태그리스트들을 요청하는 API
 * @param payload
 */
export const getTagList = async (payload : string) => {
    const response = await axios.get(`${API_URL}/list?tag=${payload}`);
    return response.data;
}
