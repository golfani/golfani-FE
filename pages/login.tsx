import style from 'styles/login.module.css'
import useLogin from "src/store/modules/login/loginHook";
import {useEffect} from "react";
import {LoginMember} from "src/apis/Member";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginSchema} from "src/utils/yupUtil";
import Link from "next/link";

const Login = () : JSX.Element => {
    const {loginMember,error, isLoggedIn} = useLogin();
    const {register, getValues, handleSubmit, formState : {errors}} = useForm({
        resolver : yupResolver(loginSchema),
        mode : "onChange"
    });
    const router = useRouter();


    const handleLogin = () => {
        const member : LoginMember = {
            userId : getValues('id'),
            password : getValues('password')
        }
        loginMember(member);
    }

    useEffect(()=> {
        if(isLoggedIn) {
            router.back();
        }
    },[isLoggedIn])

    return (
        <div className={style.container}>
            <div>
                <span className={style.logo_txt}>DAILY SHOT</span>
                <div className={style.login_box}>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div className={style.input_box}>
                            <input {...register('id')} className={style.input} placeholder="아이디"/>
                            <span className={style.input_error_txt}>{errors.id?.message}</span>
                        </div>
                        <div className={style.input_box}>
                            <input {...register('password')} type="password" className={style.input} placeholder="비밀번호"/>
                            <span className={style.input_error_txt}>{errors.password?.message}</span>
                        </div>
                        {error && <span className={style.login_error_txt}>{error.error}</span>}
                        <button className={style.login_btn} type="submit">로그인</button>
                    </form>
                    <div className={style.link_box}>
                        <span className={style.link_txt}>아이디 찾기</span>
                        <span className={style.link_txt}>비밀번호 찾기</span>
                        <Link href={"/signup"}>
                            <span className={style.link_txt}>회원가입</span>
                        </Link>
                    </div>
                </div>
                <div className={style.divider}></div>
                <div className={style.sns_box}>
                    {/*<span className={style.sns_login_txt}>소셜 로그인</span>*/}
                    <span className={style.kakao_login_btn}>카카오 로그인</span>
                    <span className={style.naver_login_btn}>네이버 로그인</span>
                </div>
            </div>
        </div>
    );
};

export default Login;
