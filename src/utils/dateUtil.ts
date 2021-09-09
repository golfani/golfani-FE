
export const dateDiff = (date : string) : string => {
    const now = new Date();
    const target = new Date(date);

    let diff = "";

    if(now.getFullYear() !== target.getFullYear()) {
        diff = `${target.getFullYear()}년 ${target.getMonth()}월 ${target.getDay()}일`;
    }
    else if(now.getMonth() !== target.getMonth()) {
        diff = `${target.getMonth()}월 ${target.getDay()}일`;
    }
    else if(now.getDay() !== target.getDay()) {
        diff = now.getDay() - target.getDay() >= 7
            ? `${target.getMonth()}월 ${target.getDay()}일`
            : `${now.getDay() - target.getDay()}일 전`;
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