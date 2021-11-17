import {TTarget} from "../domain/Common";
import {TRef} from "../components/modals/DetailMenuModal";
import {getCookie} from "src/utils/cookieUtil";
import {securityAxios} from "../security/axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/report`;
const userId = getCookie('userId');

export type TReportType = 'REPORT_AD' | 'REPORT_ABUSE' | 'REPORT_PORN' | 'REPORT_REPEAT';
export type TReport = 'feed' | 'post' | 'reply';

export interface IReportDto {
    id? : number
    reportType : TReportType
    description : string
    postId? : number
    feedId? : number
    replyId? : number
    userId : string
    targetType? : TTarget
}

/**
 * NEED AUTH
 * 신고 접수하는 API
 * @param target
 * @param targetId
 * @param description
 * @param reportType
 */
export const registerReport = async (target : TRef,
                                     targetId : number,
                                     description : string,
                                     reportType : TReportType) => {
    const reportDto : IReportDto = {
        reportType : reportType,
        description : description,
        userId : userId,
    };

    if(target === 'FEED') {
        reportDto.feedId = targetId;
        reportDto.targetType = 'FEED';
    }
    else if(target === 'POST') {
        reportDto.postId = targetId;
        reportDto.targetType = 'POST';
    }
    else {
        reportDto.replyId = targetId;
        reportDto.targetType = 'REPLY';
    }

    const response = await securityAxios.post(API_URL,reportDto);
    return response;
}

/**
 * type 에 맞는 리포트 목록 불러오는 API
 * @param type
 */
export const getReportList = async (type : TReport) => {
    const response = await securityAxios.get(`${API_URL}/${type}/list`);
    return response.data;
}

/**
 * 해당 id 신고내역들을 불러오는 API
 * @param id
 * @param type
 */
export const getReportDetails = async (id : number, type : string) => {
    const response = await securityAxios.get(`${API_URL}/${type}/${id}`);
    return response.data;
}

/**
 * 해당 컨텐츠의 삭제요청 API
 * @param type
 * @param id
 * @param doDelete
 */
export const cancelReport = async (type : TReport, id : number, doDelete : boolean) => {
    const response = await securityAxios.get(`${API_URL}/cancel?type=${type.toUpperCase()}&id=${id}&doDelete=${doDelete}`);
    return response.data;
}
