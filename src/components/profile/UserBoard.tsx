import style from './userBoard.module.css';
import {IProfileMemberProps} from "../../../pages/profile/[userId]";
import {useQuery} from "react-query";
import {getAllUserPost, IBoardData} from "src/apis/Board";
import {boardTypeToString} from "src/utils/boardUtil";
import {useRouter} from "next/router";

const UserBoard = ({member} : IProfileMemberProps) : JSX.Element => {
    const userPostQuery = useQuery<IBoardData[]>(['userPost',member.userId], () => getAllUserPost(member.userId));
    const router = useRouter();

    const handleClickPost = (id : number) => {
        router.push(`/board/view/${id}`);
    }

    return (
        <div className={style.container}>
            {userPostQuery.data?.map((post)=>(
                <div key={post.id} className={style.post_box} onClick={()=>handleClickPost(post.id)}>
                    <div className={style.post_title_box}>
                        <span className={style.board_type_txt}>{`[${boardTypeToString(post.boardType)}]`}</span>
                        <span className={style.post_title_txt}>{post.title}</span>
                    </div>
                    <div className={style.post_count_box}>
                        <span className={style.post_like_txt}>{`좋아요 ${post.likesCount}`}</span>
                        <span className={style.post_reply_txt}>{`댓글 ${post.replyCount}`}</span>
                    </div>
                    <span className={style.post_date_txt}>{post.createdTime.slice(0,10)}</span>
                </div>
            ))}
        </div>
    );
};

export default UserBoard;
