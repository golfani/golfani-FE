import * as yup from "yup";
import {regExpEmail, regExpId, regExpPw} from "./regExpUtil";

export const signUpSchema = yup.object({
    id : yup.string().trim().required('필수 항목입니다.').matches(regExpId,'아이디는 5 ~ 15자 사이여야 합니다.'),
    password : yup.string().trim().required('필수 항목입니다.').matches(regExpPw,'특수문자, 영어, 숫자를 포함한 8 ~ 15자 사이여야 합니다.'),
    checkPw : yup.string().oneOf([yup.ref('password'), null],'비밀번호가 일치하지 않습니다.').required('필수 항목입니다.'),
    name : yup.string().required('필수 항목입니다.'),
    gender : yup.string().oneOf(['male','female'],'성별을 선택해 주세요.').required('필수 항목입니다.'),
    year : yup.number().required('필수 항목입니다.').typeError("연도를 숫자4자리로 적어주세요."),
    month : yup.number().required('필수 항목입니다.').typeError("숫자로 적어주세요."),
    day : yup.number().required('필수 항목입니다.').typeError("숫자로 적어주세요."),
    email : yup.string().required('필수 항목입니다.').matches(regExpEmail,'이메일 형식에 맞지 않습니다.')
})

export const loginSchema = yup.object({
    id : yup.string().trim().required('아이디를 입력해주세요.'),
    password : yup.string().trim().required('비밀번호를 입력해주세요.'),
})