/**
 * 태그 관련 유틸함수
 */

export const tagListToString = (tagList : string[]) : string => {
    return '#'+tagList.join('#')
}
