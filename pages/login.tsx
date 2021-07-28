import style from 'styles/login.module.css'

const Login = () : JSX.Element => {
    return (
        <div className={style.container}>
            <div>
                <span className={style.logo_txt}>DAILY SHOT</span>
                <div className={style.login_box}>
                    <form>
                        <input className={style.input} placeholder="아이디"/>
                        <input type="password" className={style.input} placeholder="비밀번호"/>
                        <button className={style.login_btn} type="submit">로그인</button>
                    </form>
                    <div className={style.link_box}>
                        <span className={style.link_txt}>아이디 찾기</span>
                        <span className={style.link_txt}>비밀번호 찾기</span>
                        <span className={style.link_txt}>회원가입</span>
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