import style from "styles/signup.module.css";
import {useForm} from "react-hook-form";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import {regExpEmail, regExpId, regExpPw} from "src/utils/regExpUtil";

const schema = yup.object({
    id : yup.string().trim().required('필수 항목입니다.').matches(regExpId,'아이디는 5 ~ 15자 사이여야 합니다.'),
    password : yup.string().trim().required('필수 항목입니다.').matches(regExpPw,'특수문자, 영어, 숫자를 포함한 8 ~ 15자 사이여야 합니다.'),
    checkPw : yup.string().oneOf([yup.ref('password'), null],'비밀번호가 일치하지 않습니다.').required('필수 항목입니다.'),
    name : yup.string().required('필수 항목입니다.'),
    gender : yup.string().oneOf(['남자','여자'],'성별을 선택해 주세요.').required('필수 항목입니다.'),
    year : yup.number().required('필수 항목입니다.').typeError("연도를 숫자4자리로 적어주세요."),
    month : yup.number().required('필수 항목입니다.').typeError("숫자로 적어주세요."),
    day : yup.number().required('필수 항목입니다.').typeError("숫자로 적어주세요."),
    email : yup.string().required('필수 항목입니다.').matches(regExpEmail,'이메일 형식에 맞지 않습니다.')
})

const SignUp = () : JSX.Element=> {
    const {register, getValues, handleSubmit, formState : {errors}} = useForm({
        resolver : yupResolver(schema),
        mode : "onChange",
    });

    const onSubmit = (data : any) => {
        console.log(data);
    }

    const sendMail = () => {
        if(errors.email || getValues('email').trim.length === 0) {
            console.log("이메일 입력");
        }
        else {
            console.log(getValues('email'));
        }
    }

    return (
        <div className={style.container}>
            <div>
                <h1>DAILY SHOT</h1>
                <div className={style.sns_box}>
                    <span className={style.sns_main_txt}>SNS 계정을 보유하고 계신가요?</span>
                    <span className={style.sns_sub_txt}>SNS 계졍을 이용해 로그인</span>
                    <span className={style.kakao_login_btn}>카카오 로그인</span>
                    <span className={style.naver_login_btn}>네이버 로그인</span>
                </div>
                <form className={style.form_box} onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.input_box}>
                        <span className={style.input_title_txt}>아이디</span>
                        <input className={style.input} {...register("id")}/>
                        <span className={style.input_error_txt}>{errors.id?.message}</span>
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
                            <option value="남자">남자</option>
                            <option value="여자">여자</option>
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
                            <input className={style.input} placeholder="@email.com" {...register("email")}/>
                            <span className={style.input_error_txt}>{errors.email?.message}</span>
                            <div>
                                <span className={style.email_send_txt} onClick={sendMail}>인증코드 전송</span>
                            </div>
                            <div className={style.code_box}>
                                <div>
                                    <input className={style.code_input} placeholder="인증번호 입력 (6자리)"/>
                                    <button type="button" className={style.code_ok_btn}>확인</button>
                                </div>
                                <span className={style.input_success_txt}>인증되었습니다.</span>
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