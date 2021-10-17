import style from './userActivity.module.css';
import {IProfileMemberProps} from "../../../pages/profile/[userId]";

const UserActivity = ({member} : IProfileMemberProps) : JSX.Element => {
    return (
        <div className={style.container}>
            <div className={style.category_box}>
                <span className={style.category_txt}>피드</span>
                <span className={style.count_txt}>{member.feedCount}</span>
            </div>
            <div className={style.category_box}>
                <span className={style.category_txt}>게시글</span>
                <span className={style.count_txt}>{member.boardCount}</span>
            </div>
            <div className={style.category_box}>
                <span className={style.category_txt}>댓글</span>
                <span className={style.count_txt}>{member.replyCount}</span>
            </div>
        </div>
    );
};

export default UserActivity;
