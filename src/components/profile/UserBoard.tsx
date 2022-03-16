import style from './userBoard.module.css';
import {IProfileMemberProps} from "../../../pages/profile/[userId]";
import {useQuery} from "react-query";
import {getAllUserPost, IBoardData} from "src/apis/Board";
import {boardTypeToString} from "src/utils/boardUtil";
import {useRouter} from "next/router";
import {EBoardType} from "src/domain/board";
import {getCookie} from "src/utils/cookieUtil";

const UserBoard = ({member}: IProfileMemberProps): JSX.Element => {
    const userId = getCookie('userId');
    const userPostQuery = useQuery<IBoardData[]>(['userPost', member.userId], () => getAllUserPost(member.userId), {
        staleTime: 60 * 10 * 1000
    });
    const router = useRouter();

    const handleClickPost = (id: number, boardType: string) => {
        router.push(`/board/${id}?type=${boardType}`);
    }

    return (
        <div className={style.container}>
            {userPostQuery.data?.map((post) => (
                post.boardType === EBoardType.ANONYMOUS && post.userId !== userId ?
                    null
                    :
                    <div key={post.id} className={style.post_box} onClick={() => handleClickPost(post.id, post.boardType)}>
                        <div className={style.post_title_box}>
                            <span className={style.board_type_txt}>{`[${boardTypeToString(post.boardType)}]`}</span>
                            <span className={style.post_title_txt}>{post.title}</span>
                        </div>
                        <div className={style.post_count_box}>
                            <span className={style.post_like_txt}>{`좋아요 ${post.likesCount}`}</span>
                            <span className={style.post_reply_txt}>{`댓글 ${post.replyCount}`}</span>
                        </div>
                        <span className={style.post_date_txt}>{post.createdTime.slice(0, 10)}</span>
                    </div>
            ))}
        </div>
    );
};

export default UserBoard;
