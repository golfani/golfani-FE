
export const dateDiff = (date : string | Date) : string => {
    const now = new Date();
    const target = new Date(date);

    let diff = "";

    if(now.getFullYear() !== target.getFullYear()) {
        diff = `${target.getFullYear()}년 ${target.getMonth()}월 ${target.getDate()}일`;
    }
    else if(now.getMonth() !== target.getMonth()) {
        diff = `${target.getMonth()}월 ${target.getDate()}일`;
    }
    else if(now.getDate() !== target.getDate()) {
        diff = now.getDate() - target.getDate() >= 7
            ? `${target.getMonth()}월 ${target.getDate()}일`
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

const leftPad = (value : number) => {
    if(value >= 10) {
        return value;
    }
    return `0${value}`;
}

export const toStringByFormatting = (target : Date | string) => {
    const source = new Date(target);
    const year = source.getFullYear();
    const month = leftPad(source.getMonth() + 1);
    const day = leftPad(source.getDate());
    const hour = source.getHours();
    const minute = source.getMinutes();

    return [year,month,day,hour,minute].join('.');
}

export const calcChatDate = (source : Date) => {
    const formatDate = toStringByFormatting(source);
    const date = formatDate.split('.');

    let hour = Number(date[3]);
    const minute = leftPad(Number(date[4]));

    if(hour >= 12) {
        return `오후 ${hour}:${minute}`;
    }
    else if(hour < 12) {
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
