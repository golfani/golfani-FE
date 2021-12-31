/**
 * 단순 오늘 날짜와 차이를 계산 해주는 유틸
 * @param date
 */
export const dateDiff = (date : string | Date) : string => {
    const now = new Date();
    const target = new Date(date);

    let diff = "";

    if(now.getFullYear() !== target.getFullYear()) {
        diff = `${target.getFullYear()}년 ${target.getMonth()}월 ${target.getDate()}일`;
    }
    else if(now.getMonth() !== target.getMonth()) {
        diff = `${target.getMonth()+1}월 ${target.getDate()}일`;
    }
    else if(now.getDate() !== target.getDate()) {
        diff = now.getDate() - target.getDate() >= 7
            ? `${target.getMonth()+1}월 ${target.getDate()}일`
            : `${now.getDate() - target.getDate()}일 전`;
    }
    else if(now.getHours() !== target.getHours()) {
        diff = `${now.getHours()-target.getHours()}시간 전`;
    }
    else if(now.getMinutes() !== target.getMinutes()) {
        diff = `${now.getMinutes()-target.getMinutes()}분 전`;
    }
    else {
        diff = "방금 전";
    }

    return diff;
}

/**
 * leftPad 함수 유틸
 * @param value
 */
const leftPad = (value : number) => {
    if(value >= 10) {
        return value;
    }
    return `0${value}`;
}

/**
 * 정해진 형식으로 format 해주는 유틸
 * @param target
 */
export const toStringByFormatting = (target : Date | string) => {
    const source = new Date(target);
    const year = source.getFullYear();
    const month = leftPad(source.getMonth() + 1);
    const day = leftPad(source.getDate());
    const hour = source.getHours();
    const minute = source.getMinutes();

    return [year,month,day,hour,minute].join('.');
}

/**
 * 채팅 서비스에서 사용되는 date 반환 유틸
 * @param source
 */
export const calcChatDate = (source : Date) => {
    const formatDate = toStringByFormatting(source);
    const date = formatDate.split('.');

    let hour = Number(date[3]);
    const minute = leftPad(Number(date[4]));

    if(hour >= 12) {
        if(hour > 12) return `오후 ${hour-12}:${minute}`;
        return `오후 ${hour}:${minute}`;
    }
    else if(hour < 12) {
        if(hour === 0) return `오전 ${12}:${minute}`;
        return `오전 ${hour}:${minute}`;
    }
}

export const isTodayAlarm = (source : string | Date) => {
    const nowDate = new Date();
    const sourceDate = new Date(source);
    if(nowDate.getFullYear() === sourceDate.getFullYear() &&
        nowDate.getMonth() === sourceDate.getMonth() &&
        nowDate.getDate() === sourceDate.getDate()) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * 채팅 날짜 구분 해주는 유틸
 * @param prevDate
 * @param curDate
 */
export const diffDayChat = (prevDate : Date, curDate : Date) => {
    const prev = new Date(prevDate);
    const cur = new Date(curDate);
    if(prev.getFullYear() !== cur.getFullYear() || prev.getMonth() !== cur.getMonth() || prev.getDate() !== cur.getDate()) {
        const year = cur.getFullYear() + '년';
        const month = leftPad(cur.getMonth()+1) + '월';
        const day = cur.getDate() + '일';

        return [year,month,day].join(' ');
    }
    return false;
}

/**
 * 커뮤니티 서비스에서 사용하는 date 반환 유틸
 * @param source
 */
export const calcPostReplyDate = (source : string) => {
    const nowDate = new Date();
    const sourceDate = new Date(source);

    let date = '';
    if(nowDate.getFullYear() !== sourceDate.getFullYear())
        date = date + sourceDate.getFullYear() + '/';
    date += sourceDate.getMonth()+1 + '/' + sourceDate.getDate() + " " + leftPad(sourceDate.getHours()) + ":" + leftPad(sourceDate.getMinutes());
    return date;
}
