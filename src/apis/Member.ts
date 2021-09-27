import axios from "axios";
import {IUser} from "../store/modules/login/login";

export type Member = {
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

// API 주소입니다
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/member`;

/**
 * 회원가입 ID 중복검사 API 요청입니다.
 * @param member_id
 */
export const validateById = async (memberId : string) => {
    const response = await axios.get<boolean>(`${API_URL}/duplicate/${memberId}`)
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
export const signUp = async (member : Member) => {
    const response = await axios.post<number>(API_URL,member);
    return response;
}

/**
 * 로그인 API 요청입니다.
 * @param member_id
 * @param password
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
