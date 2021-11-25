import {EType} from "src/domain/board";

export const boardTypeToString = (type : EType) => {
    switch (type) {
        case EType.ANONYMOUS:
            return '익명';
        case EType.FREE:
            return '자유'
        case EType.TIP:
            return '팁'
        case EType.TRADE:
            return '거래'
    }
}
