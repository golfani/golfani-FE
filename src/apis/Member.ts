import axios from "axios";
import {IUser} from "src/store/modules/login/login";
import {getCookie} from "src/utils/cookieUtil";

export interface IMember {
    id : number
    locationId : number | null
    password : string | null
    role : string | null
    userId : string
    gender : string
    naver : string | null
    kakao : string | null
    score : number | null
    year : number
    month : number
    day : number
    pictureId : string | null
    introduction : string | null
    email : string
    username : string
    nickname : string | null
    boardCount : number | null
    feedCount : number | null
    replyCount : number | null
}

export interface ISignUpMember {
    userId : string
    password : string | null
    username : string
    gender : string
    year : number
    month : number
    day : number
    email : string
}

export type LoginMember = {
    userId: string,
    password: string
}

interface IEmailDto {
    userEmail : string
}

// API 주소입니다
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/member`;

/**
 * 회원가입 ID 중복검사 API 요청입니다.
 * @param userId
 */
export const validateById = async (userId : string) => {
    const response = await axios.get<boolean>(`${API_URL}/duplicate/${userId}`)
    return response;
}

/**
 * 이메일 본인인증 API 요청입니다.
 * @param email
 */
export const authEmail = async (email : string) => {
    const data = {
        userEmail : email
    }
    const response = await axios.post(`${API_URL}/email`,data);
    return response;
}

/**
 * 인증코드를 확인하는 API 요청입니다.
 * @param email
 * @param code
 */
export const fetchAuthCode = async (email : string, code : string) => {
    const data = {
        email : email,
        code : code
    }
    const response = await axios.post(`${API_URL}/authcode`,data);
    return response.data;
}

/**
 * 회원가입 API 요청입니다.
 * @param member
 */
export const signUp = async (member : ISignUpMember) => {
    const response = await axios.post<number>(API_URL,member);
    return response;
}

/**
 * 로그인 API 요청입니다.
 * @param member
 */
export const login = async (member : LoginMember) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`,member,{
        withCredentials : true
    })
    const user : IUser = {
        userId : member.userId,
        accessToken : response.headers['access-token'],
        refreshToken : response.headers['refresh-token'],
    }
    return user;
}

/**
 * 아이디 , 비밀번호 찾기를 위한 이메일 인증 요청 API
 * @param userEmail
 */
export const authMailForFindUser = async (userEmail : string) => {
    const emailDto : IEmailDto = {
        userEmail : userEmail
    }
    const response = await axios.post(`${API_URL}/find/email`,emailDto);
    return response;
}

/**
 * 유저 ID 찾기 요청 하는 API
 * @param email
 */
export const findUserIdByEmail = async (email : string) => {
    const response = await axios.get(`${API_URL}/find/id?email=${email}`);
    return response;
}

/**
 * 유저 비밀번호 찾기 Certify 요청 하는 API
 * @param userId
 * @param email
 */
export const findUserPw = async (userId : string, email : string) => {
    const response = await axios.get(`${API_URL}/find/password?email=${email}&user_id=${userId}`);
    return response;
}

/**
 * userId 에 해당하는 유저 정보 가져오는 API
 * @param userId
 */
export const getMember = async (userId : string) => {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response;
}

/**
 * 유저 비밀번호 변경 API
 * @param userId
 * @param password
 */
export const modifyMemberPassword = async (userId : string, password : string) => {
    try {
        const memberResponse = await getMember(userId);
        if(memberResponse.status === 200) {
            const member : IMember = memberResponse.data;
            member.password = password;
            const modifyResponse = await axios.put(API_URL,member);
            return modifyResponse;
        }
    }
    catch (e) {
        console.log(e);
    }
}

/**
 * accessToken 재발급 요청 API
 * @param userId
 */
export const regenerateAccessToken = async (userId : string) => {
    const response = await axios.get(`${API_URL}/refresh?user_id=${userId}`,{
        headers : {
            Authorization : `Bearer ${getCookie('refreshToken')}`,
        }
    })
    return response;
}
