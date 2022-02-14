import style from 'styles/login.module.css'
import useLogin from "src/store/modules/login/loginHook";
import React, {useEffect} from "react";
import {LoginMember} from "src/apis/Member";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginSchema} from "src/utils/yupUtil";
import Link from "next/link";
import {getCookie} from "src/utils/cookieUtil";
import Head from "next/head";

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
        if(getCookie('userId')) {
            router.back();
        }
    },[]);

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

    const handleClickLogo = () => {
        router.push('/');
    }

    return (
        <div className={style.container}>
            <Head>
                <title>골아니 : 로그인</title>
                <meta name="description" content="골아니 로그인 페이지 입니다."/>
                <meta name="og:title" content="골아니 로그인"/>
                <meta name="og:description" content="골아니 로그인 페이지 입니다."/>
                <meta name="og:url" content="https://golfani.com/login"/>
            </Head>
            <div className={style.box}>
                <span className={style.logo_txt} onClick={handleClickLogo}>GOLF ANI</span>
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
                        <Link href={'/member/findId'}>
                            <span className={style.link_txt}>아이디 찾기</span>
                        </Link>
                        <Link href={'/member/findPw'}>
                            <span className={style.link_txt}>비밀번호 찾기</span>
                        </Link>
                        <Link href={"/signup"}>
                            <span className={style.link_txt}>회원가입</span>
                        </Link>
                    </div>
                </div>
                <div className={style.divider}></div>
                <div className={style.sns_box}>
                    {/*<span className={style.sns_login_txt}>소셜 로그인</span>*/}
                    <span className={style.kakao_login_btn} onClick={onRouteKakaoLoginPage}>카카오 로그인</span>
                    <span className={style.naver_login_btn} onClick={onRouteNaverLoginPage}>네이버 로그인</span>
                </div>
            </div>
        </div>
    );
};

export default Login;
