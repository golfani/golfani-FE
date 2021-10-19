import style from "styles/signup.module.css";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    authEmail,
    fetchAuthCode,
    IOauthSignUp,
    ISignUpMember,
    registerOauthSignUp,
    signUp,
    validateById
} from "src/apis/Member";
import {signUpSchema} from "../src/utils/yupUtil";
import {ChangeEvent, useState} from "react";
import {useRouter} from "next/router";
import {getCookie, removeCookie} from "../src/utils/cookieUtil";

type FormData = {
    id : string,
    password : string,
    checkPw : string,
    name : string,
    gender : string,
    year : number,
    month : number,
    day : number,
    email : string
    authCode : number,
}

const SignUp = () : JSX.Element=> {
    const memberId = 1;
    const {register,getValues, handleSubmit, formState : {errors}} = useForm<FormData>({
        resolver : yupResolver(signUpSchema),
        mode : "onChange",
    });
    const id = register("id"); // input id 변수입니다.
    const [duplicate, setDuplicate] = useState(false); // 아이디 중복검사 변수입니다.
    const [auth, setAuth] = useState<boolean | null | undefined>(false); // 이메일 인증 변수입니다.
    const [readOnly, setReadOnly] = useState(false); // input readOnly 상태 관리 변수입니다.
    const router = useRouter();
    const [isSendMail, setIsSendMail] = useState(false);

    // ID 중복 검사
    const onValidateId = async (e : ChangeEvent) => {
        try {
            const response = await validateById(getValues('id'))
            const data = response.data;
            if(data) {
                setDuplicate(true);
            }
            else {
                setDuplicate(false);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    // 이메일 인증코드 받기
    const sendMail = async () => {
        if(errors.email || getValues('email').trim().length === 0) {
            console.log("이메일 입력");
        }
        else {
            try {
                setIsSendMail(true);
                const response = await authEmail(getValues('email'));
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    // 인증코드로 인증하기
    const onAuth = async () => {
        const authCode = getValues('authCode');
        if(authCode) {
            try {
                const response = await fetchAuthCode(getValues('email'), authCode.toString());
                if(response) {
                    setReadOnly(true);
                    setAuth(true);
                }
                else {
                    setReadOnly(false);
                    setAuth(null);
                }
            }
            catch (e) {
                console.log(e);
            }
        }
    };

    const handleClickAuthCode = async () => {
        await onAuth();
    }

    const onSingUp = async (data : FormData) => {
        const member  : ISignUpMember = {
            userId : data.id,
            password : data.password,
            username : data.name,
            gender : data.gender,
            year : data.year,
            month : data.month,
            day : data.day,
            email : data.email
        }

        if (auth) {
            try {
                const response = await signUp(member);
                if (response.status === 200) {
                    router.push("/");
                }
            } catch (e) {
                alert('[서버에러] 잠시 후 다시 시도해 주세요');
            }
        }
    }

    const onOauthSignUp = async (data : FormData) => {
        const member  : IOauthSignUp = {
            memberId : Number(memberId),
            userId : data.id,
            password : data.password,
            username : data.name,
            gender : data.gender,
            year : data.year,
            month : data.month,
            day : data.day,
            email : data.email
        }

        if (auth) {
            try {
                const response = await registerOauthSignUp(member);
                if (response.status === 200) {
                    removeCookie('memberId');
                    router.push("/");
                }
            } catch (e) {
                alert('[서버에러] 잠시 후 다시 시도해 주세요');
            }
        }
    }

    // 회원가입 버튼 클릭
    const onSubmit = async (data : FormData) => {
        memberId ? await onOauthSignUp(data) : await onSingUp(data);
    };

    const onRouteNaverLoginPage = () => {
        if(typeof window !== 'undefined') {
            window.location.href = 'https://golfani.com:8080/oauth2/authorization/naver';
        }
    }

    const onRouteKakaoLoginPage = () => {
        if(typeof window !== 'undefined') {
            window.location.href = 'https://golfani.com:8080/oauth2/authorization/kakao';
        }
    }

    return (
        <div className={style.container}>
            <div>
                <h1>GOLF ANI</h1>
                {memberId ? <></> :
                <div className={style.sns_box}>
                    <span className={style.sns_main_txt}>SNS 계정을 보유하고 계신가요?</span>
                    <span className={style.sns_sub_txt}>SNS 계졍을 이용해 로그인</span>
                    <span className={style.kakao_login_btn} onClick={onRouteKakaoLoginPage}>카카오 로그인</span>
                    <span className={style.naver_login_btn} onClick={onRouteNaverLoginPage}>네이버 로그인</span>
                </div>
                }
                <form className={style.form_box} onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.input_box}>
                        <span className={style.input_title_txt}>아이디</span>
                        <input name="id" onChange={(e)=>{id.onChange(e); onValidateId(e)}} className={style.input} ref={id.ref}/>
                        <span className={style.input_error_txt}>{errors.id?.message}</span>
                        {duplicate && <span className={style.input_error_txt}>중복된 아이디입니다.</span>}
                    </div>
                    <div className={style.input_box}>
                        <span className={style.input_title_txt}>비밀번호</span>
                        <input type='password' className={style.input} {...register("password")}/>
                        <span className={style.input_error_txt}>{errors.password?.message}</span>
                    </div>
                    <div className={style.input_box}>
                        <span className={style.input_title_txt}>비밀번호 확인</span>
                        <input type='password' className={style.input} {...register("checkPw")}/>
                        <span className={style.input_error_txt}>{errors.checkPw?.message}</span>
                    </div>
                    <div className={style.input_box}>
                        <span className={style.input_title_txt}>이름</span>
                        <input className={style.input} {...register("name")}/>
                        <span className={style.input_error_txt}>{errors.name?.message}</span>
                    </div>
                    <div className={style.input_box}>
                        <span className={style.input_title_txt}>성별</span>
                        <select className={style.input} {...register("gender")}>
                            <option value={undefined}>선택안함</option>
                            <option value="MALE">남자</option>
                            <option value="FEMALE">여자</option>
                        </select>
                        <span className={style.input_error_txt}>{errors.gender?.message}</span>
                    </div>
                    <div className={style.input_box}>
                        <span className={style.input_title_txt}>생년월일</span>
                        <div className={style.birth_box}>
                            <input className={style.birth_input} placeholder="년" {...register("year")}/>
                            <input className={style.birth_input} placeholder="월" {...register("month")}/>
                            <input className={style.birth_input} placeholder="일" {...register("day")}/>
                        </div>
                        <span className={style.input_error_txt}>{errors.year?.message || errors.month?.message || errors.day?.message}</span>
                    </div>
                    <div className={style.input_box}>
                        <span className={style.input_title_txt}>본인인증</span>
                        <div>
                            <input readOnly={readOnly} className={style.input} placeholder="@email.com" {...register("email")}/>
                            <span className={style.input_error_txt}>{errors.email?.message}</span>
                            <div>
                                <span className={style.email_send_txt} onClick={sendMail}>인증코드 전송</span>
                                {isSendMail && <span className={style.email_send_ok_txt}>메일이 발송되었습니다</span>}
                            </div>
                            <div className={style.code_box}>
                                <div>
                                    <input readOnly={readOnly} className={style.code_input} placeholder="인증번호 입력 (6자리)" {...register("authCode")}/>
                                    <button onClick={handleClickAuthCode} type="button" className={style.code_ok_btn}>확인</button>
                                </div>
                                {auth && <span className={style.input_success_txt}>인증되었습니다.</span>}
                                {auth || <span className={style.input_error_txt}>본인인증이 완료되지 않았습니다.</span>}
                                {auth === null && <span className={style.input_error_txt}>인증번호가 일치하지 않습니다.</span>}
                            </div>
                        </div>
                    </div>
                    <button type='submit' className={style.signup_btn}>회원가입</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;
