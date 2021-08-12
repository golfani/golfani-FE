import style from './userActivity.module.css';

const UserActivity = () : JSX.Element => {
    return (
        <div className={style.container}>
            <div className={style.category_box}>
                <span className={style.category_txt}>피드</span>
                <span className={style.count_txt}>10</span>
            </div>
            <div className={style.category_box}>
                <span className={style.category_txt}>게시글</span>
                <span className={style.count_txt}>3</span>
            </div>
            <div className={style.category_box}>
                <span className={style.category_txt}>댓글</span>
                <span className={style.count_txt}>17</span>
            </div>
        </div>
    );
};

export default UserActivity;