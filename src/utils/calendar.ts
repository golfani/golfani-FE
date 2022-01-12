/**
 * 해당 년도가 윤년인지 판단해주는 유틸
 * @param year
 */
function isLeapYear(year: number) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

/**
 * 해당 년,월에 해당하는 시작 요일과, 총 날짜를 계산해주는 유틸
 * @param year
 * @param month
 */
export const getCalendar = (year: number, month: number) => {
    const date = new Date(year, month - 1);
    const startDay = date.getDay();
    let totalOfDay;
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            totalOfDay = 31;
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            totalOfDay = 30;
            break;
        case 2:
            isLeapYear(year) ? totalOfDay = 29 : totalOfDay = 28;
            break;
    }
    return {startDay, totalOfDay}
}