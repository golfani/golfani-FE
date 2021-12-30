import {EBoardType} from "src/domain/board";

/**
 * 게시판 카테고리 타입을 단순 스트링으로 변환
 * @param type
 */
export const boardTypeToString = (type : EBoardType) => {
    switch (type) {
        case EBoardType.ANONYMOUS:
            return '익명';
        case EBoardType.FREE:
            return '자유'
        case EBoardType.TIP:
            return '정보'
        case EBoardType.TRADE:
            return '거래'
        case EBoardType.REVIEW:
            return '후기'
        case EBoardType.ASK:
            return '문의'
    }
}

/**
 * 게시판 카테고리 타입을 게시판 스트링으로 변환
 * @param type
 */
export const boardTypeToPostString = (type : EBoardType) : string => {
    switch (type) {
        case EBoardType.TRADE:
            return '거래게시판';
        case EBoardType.FREE:
            return '자유게시판';
        case EBoardType.REVIEW:
            return '후기게시판';
        case EBoardType.TIP:
            return '정보게시판';
        case EBoardType.ASK:
            return '문의게시판'
        case EBoardType.ANONYMOUS:
            return '익명게시판';
        case EBoardType.HOT:
            return '인기게시판'
        default :
            return '';
    }
}
