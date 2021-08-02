import axios from "axios";


export type Member = {
    user_id : string
    password : string | null
    username : string
    gender : string
    year : number
    month : number
    day : number
    email : string
}

export type LoginMember = {
    memberId: string,
    password: string
}

// API 주소입니다
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/member`;

/**
 * 회원가입 ID 중복검사 API 요청입니다.
 * @param member_id
 */
export const validateById = async (memberId : string) => {
    const response = await axios.get<boolean>(`${API_URL}/${memberId}`)
    return response;
}

/**
 * 이메일 본인인증 API 요청입니다.
 * @param email
 */
export const authEmail = async (email : string) => {
    const data = {
        email : email
    }
    const response = await axios.post<string>(`${API_URL}/email`,data);
    return response;
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
    const response = await axios.post(`${API_URL}/login`,member)
    return response.data;
}
