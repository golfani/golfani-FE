import {EBoardType} from "src/domain/board";

export const boardTypeToString = (type : EBoardType) => {
    switch (type) {
        case EBoardType.ANONYMOUS:
            return '익명';
        case EBoardType.FREE:
            return '자유'
        case EBoardType.TIP:
            return '팁'
        case EBoardType.TRADE:
            return '거래'
    }
}
