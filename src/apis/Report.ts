import {TTarget} from "../domain/Common";
import {TRef} from "../components/modals/DetailMenuModal";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/report`;

export type TReportType = 'REPORT_AD' | 'REPORT_ABUSE' | 'REPORT_PORN' | 'REPORT_REPEAT';

interface IReportDto {
    id : number | null
    reportType : TReportType
    description : string
    postId : number | null
    feedId : number | null
    replyId : number | null
    userId : string
    targetType : TTarget | null
}

/**
 * 신고 접수하는 API
 * @param target
 * @param targetId
 * @param userId
 * @param description
 * @param reportType
 */
export const registerReport = async (target : TRef,
                                     targetId : number,
                                     userId : string,
                                     description : string,
                                     reportType : TReportType) => {
    const reportDto : IReportDto = {
        id : null,
        reportType : reportType,
        description : description,
        userId : userId,
        postId : null,
        feedId : null,
        replyId : null,
        targetType : null
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

    const response = await axios.post(API_URL,reportDto);
    return response;
}
