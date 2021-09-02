import axios from "axios";
import {tagListToString} from "src/utils/tagUtil";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/tag`;

export const registerTag = async (tagList : string[]) => {
    const data = {
        tagName : tagListToString(tagList)
    }

    const response = await axios.post(API_URL,data);
    return response;
}
