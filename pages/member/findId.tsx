import style from 'styles/find.module.css';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {emailSchema} from "src/utils/yupUtil";
import React, {useEffect, useState} from "react";
import {authMailForFindUser, fetchAuthCode, findUserIdByEmail} from "src/apis/Member";
import Link from 'next/link';
import {useRouter} from "next/router";
import {getCookie} from "src/utils/cookieUtil";
import Head from "next/head";

interface IForm {
    email: string
}

const FindId = (): JSX.Element => {
    const {register, getValues, handleSubmit, formState: {errors}} = useForm<IForm>({
        resolver: yupResolver(emailSchema),
        mode: 'onChange'
    });
    const [bindInput, setBindInput] = useState(false);
    const [userId, setUserId] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [authCodeError, setAuthCodeError] = useState('');
    const router = useRouter();

    const onSendEmail = async (data: IForm) => {
        try {
            setAuthCodeError('');
            const response = await authMailForFindUser(data.email);
            if (response.status === 200) {
                setBindInput(true);
            }
        } catch (e) {
            if (e.response.status === 409) {
                alert('존재하지 않는 이메일 입니다.');
            } else if (e.response.status === 500) {
                alert('잠시 후 다시 시도해 주세요.');
            }
        }
    }

    const onFindUserId = async () => {
        const email = getValues('email');
        try {
            const authResponse = await fetchAuthCode(email, authCode);
            if (authResponse) {
                const findResponse = await findUserIdByEmail(email);
                setUserId(findResponse.data);
            } else {
                setAuthCodeError('인증번호가 일치하지 않습니다');
            }
        } catch (e) {
            alert('잠시 후 다시 시도해 주세요.');
        }
    }

    useEffect(() => {
        if (getCookie('userId')) {
            router.push('/');
        }
    }, [])

    return (
        <div className={style.container}>
            <Head>
                <title>아이디 찾기</title>
                <meta name="description" content="골아니 아이디 찾기 페이지 입니다."/>
                <meta property="og:title" key="ogtitle" content="골아니 아이디 찾기"/>
                <meta property="og:description" key="ogdesc" content="골아니 아이디 찾기 페이지 입니다."/>
                <meta property="og:url" key="ogurl" content="https://golfani.com/findId"/>
            </Head>
            <div className={style.box}>
                <div className={style.find_box}>
                    <span className={style.logo_txt}>GOLFANI</span>
                    <div className={style.title_box}>
                        <Link href={'/member/findId'}>
                            <span className={style.title_txt_active}>아이디 찾기</span>
                        </Link>
                        <Link href={'/member/findPw'}>
                            <span className={style.title_txt}>비밀번호 찾기</span>
                        </Link>
                    </div>
                    <form className={style.input_box} onSubmit={handleSubmit(onSendEmail)}>
                        <input className={style.input} type={'text'} placeholder={'이메일 입력'} {...register('email')}/>
                        <button className={style.mail_btn} disabled={!getValues('email')}>인증번호 전송</button>
                    </form>
                    <div>
                        <span className={style.input_error_txt}>{errors.email?.message}</span>
                    </div>
                    {bindInput &&
                    <div className={style.input_box}>
                        <input className={style.input} type={'text'} placeholder={'인증번호'} value={authCode}
                               onChange={(e) => setAuthCode(e.target.value)}/>
                        <button className={style.mail_btn} disabled={!authCode} onClick={onFindUserId}>인증</button>
                    </div>
                    }
                    <div>
                        <span className={style.input_error_txt}>{authCodeError}</span>
                    </div>
                    {userId &&
                    <div>
                        <div className={style.divider}></div>
                        <div className={style.result_box}>
                            <span className={style.userId_info}>회원 ID</span>
                            <span className={style.userId_txt}>{userId}</span>
                        </div>
                        <Link href={'/login'}>
                            <span className={style.login_link_txt}>로그인 하러가기</span>
                        </Link>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default FindId;
