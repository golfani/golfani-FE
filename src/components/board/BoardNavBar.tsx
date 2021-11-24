import style from 'src/components/board/boardNavBar.module.css';

const BoardNavbar = () : JSX.Element => {

    return (
        <div className={style.container}>
            <div>
                <a href="/board" className={style.logo_txt}>Golf ani</a>
                <div className={style.user_box}>
                </div>
            </div>
        </div>
    );
};

export default BoardNavbar;
