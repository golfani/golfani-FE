import style from './boardPreviewItem.module.css';
import CircleIcon from "@material-ui/icons/Circle";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import CloudQueueIcon from "@material-ui/icons/CloudQueue";
import {IBoardData} from "src/apis/Board";
import {useRouter} from "next/router";

interface IBoardPreviewItemProps {
    board : IBoardData
}

const BoardPreviewItem = ({board} : IBoardPreviewItemProps) : JSX.Element => {
    const router = useRouter();

    const handleClickTitle = () => {
        router.push(`/board/${board.id}?type=${board.boardType}&page=0`);
    }

    return (
        <div className={style.board_box}>
            <CircleIcon style={{fontSize: 7}}/>
            <span className={style.board_title_txt} onClick={handleClickTitle}>{board.title}</span>
            <div className={style.info_box}>
                <FavoriteBorderOutlinedIcon style={{fontSize: 15}} className={style.like_icon}/>
                <span className={style.like_count_txt}>{board.likesCount}</span>
            </div>
            <div className={style.info_box}>
                <CloudQueueIcon style={{fontSize: 14}} className={style.reply_icon}/>
                <span className={style.reply_count_txt}>{board.replyCount}</span>
            </div>
        </div>
    );
};

export default BoardPreviewItem;
