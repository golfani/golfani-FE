import style from "styles/find.module.css";
import Link from "next/link";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {emailSchema, passwordSchema} from "src/utils/yupUtil";
import {FormEvent, useEffect, useState} from "react";
import {authMailForFindUser, fetchAuthCode, findUserPw, modifyMemberPassword, validateById} from "src/apis/Member";
import {useRouter} from "next/router";
import {getCookie} from "src/utils/cookieUtil";

interface IEmailForm {
    email : string
}

interface IPasswordForm {
    password : string
    checkPassword : string
}

const FindPw = () : JSX.Element => {
    const {register,getValues, handleSubmit, formState : {errors}} = useForm<IEmailForm>({
        resolver : yupResolver(emailSchema),
        mode : 'onChange'
    });
    const passwordForm = useForm<IPasswordForm>({
        resolver : yupResolver(passwordSchema),
        mode : 'onChange'
    });
    const [userId, setUserId] = useState('');
    const [isValidUserId, setIsValidUserId] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [authCode, setAuthCode] = useState('');
    const [authCodeError, setAuthCodeError] = useState('');
    const [isCertified, setIsCertified] = useState(false);
    const router = useRouter();

    const onValidUserId = async () => {
        try {
            const response = await validateById(userId);
            if(response.data) {
                setIsValidUserId(true);
            }
            else {
                alert('존재하지 않는 아이디입니다.');
            }
        }
        catch (e) {
            alert('잠시 후 다시 시도해 주세요.');
        }
    }

    const onSendEmail = async (data : IEmailForm) => {
        try {
            setAuthCodeError('');
            setIsAuth(true);
            const response = await authMailForFindUser(data.email);
        }
        catch (e) {
            setIsAuth(false);
            if(e.response.status === 409) {
                alert('존재하지 않는 이메일 입니다.');
            }
            else if(e.response.status === 500) {
                alert('잠시 후 다시 시도해 주세요.');
            }
        }
    }

    const onFindUserPw = async () => {
        const email = getValues('email');
        try {
            const authResponse = await fetchAuthCode(email,authCode);
            if(authResponse) {
                try {
                    const findResponse = await findUserPw(userId, email);
                    if(findResponse.status === 200) {
                        setIsCertified(true);
                    }
                }
                catch (e) {
                    if(e.response.status === 409) {
                        alert('해당ID와 Email 정보가 일치하지 않습니다.');
                    }
                    else  {
                        alert('잠시 후 다시 시도해 주세요.');
                    }
                }
            }
            else {
                setAuthCodeError('인증번호가 일치하지 않습니다');
            }
        }
        catch (e) {
            alert('잠시 후 다시 시도해 주세요.');
        }
    }

    const onModifyPassword = async () => {
        try {
            const response = await modifyMemberPassword(userId,passwordForm.getValues('password'));
            if(response?.status === 200) {
                await router.push('/login');
            }
        }
        catch (e) {
            alert('잠시 후 다시 시도해 주세요.');
        }
    }

    const handleClickUserId = async (e : FormEvent) => {
        e.preventDefault();
        await onValidUserId();
    }

    const handleClickChangePassword = async () => {
        await onModifyPassword();
    }

    useEffect(()=> {
        if(getCookie('userId')) {
            router.push('/');
        }
    },[])

    return (
        <div className={style.container}>
            <div className={style.box}>
                <div className={style.find_box}>
                    <span className={style.logo_txt}>GOLFANI</span>
                    <div className={style.title_box}>
                        <Link href={'/member/findId'}>
                            <span className={style.title_txt}>아이디 찾기</span>
                        </Link>
                        <Link href={'/member/findPw'}>
                            <span className={style.title_txt_active}>비밀번호 찾기</span>
                        </Link>
                    </div>
                    <form className={style.input_box} onSubmit={handleClickUserId}>
                        <input className={style.input}
                               type={'text'}
                               placeholder={'GOLFANI 아이디'}
                               value={userId}
                               onChange={(e)=> setUserId(e.target.value)}
                               readOnly={isValidUserId}
                        />
                        <button className={style.mail_btn} disabled={!userId}>다음</button>
                    </form>
                    {isValidUserId &&
                    <form className={style.input_box} onSubmit={handleSubmit(onSendEmail)}>
                        <input className={style.input} type={'text'} placeholder={'이메일 입력'} {...register('email')}/>
                        <button className={style.mail_btn} disabled={!getValues('email')}>인증번호 전송</button>
                    </form>
                    }
                    <div>
                        <span className={style.input_error_txt}>{errors.email?.message}</span>
                    </div>
                    {isAuth &&
                    <div className={style.input_box}>
                        <input className={style.input} type={'text'} placeholder={'인증번호'} value={authCode}
                               onChange={(e) => setAuthCode(e.target.value)}/>
                        <button className={style.mail_btn} disabled={!authCode} onClick={onFindUserPw}>인증</button>
                    </div>
                    }
                    <div>
                        <span className={style.input_error_txt}>{authCodeError}</span>
                    </div>
                    {
                        isCertified &&
                        <div>
                            <div className={style.divider}></div>
                            <h2>비밀번호 변경</h2>
                            <form onSubmit={passwordForm.handleSubmit(handleClickChangePassword)}>
                                <div className={style.input_box}>
                                    <input className={style.input} type={'password'}
                                           placeholder={'새로운 비밀번호'} {...passwordForm.register('password')}/>
                                </div>
                                <span
                                    className={style.input_error_txt}>{passwordForm.formState.errors.password?.message}</span>
                                <div className={style.input_box}>
                                    <input className={style.input} type={'password'}
                                           placeholder={'비밀번호 확인'} {...passwordForm.register('checkPassword')}/>
                                </div>
                                <span
                                    className={style.input_error_txt}>{passwordForm.formState.errors.checkPassword?.message}</span>
                                <button className={style.password_btn}>비밀번호 변경</button>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default FindPw;
