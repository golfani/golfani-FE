import style from 'src/components/board/item/boardItem.module.css';
import React from 'react';
import {IBoardData} from "src/apis/Board";
import {useRouter} from "next/router";
import {dateDiff} from "src/utils/dateUtil";
import {EBoardType} from "src/domain/board";
import ImageIcon from '@material-ui/icons/Image';
import CloudQueueIcon from "@material-ui/icons/CloudQueue";

interface IBoardItemProps{
    board : IBoardData;
}

const BoardItem = ({board} : IBoardItemProps) : JSX.Element => {
    const router = useRouter();
    const {type, page} = router.query;

    const handleClickSubject = async () => {
        await router.push(`/board/${board.id}?type=${type}&page=${page}`);
    }

    return(
        <div className={style.container}>
            <div className={style.no_txt}>{board.id}</div>
            <div className={style.subject_box}>
                <span className={style.subject_txt} onClick={handleClickSubject}>{board.title}</span>
                {
                    board.replyCount
                        ?
                        <div className={style.reply_box}>
                            <CloudQueueIcon style={{fontSize: 16}} className={style.reply_icon}/>
                            <span className={style.reply_txt}>{board.replyCount}</span>
                        </div>
                        : null
                }
                {
                    board.hasImage &&
                    <ImageIcon style={{fontSize : '15px'}} color={"disabled"}/>
                }
            </div>
            <div className={style.writer_txt}>{board.boardType !== EBoardType.ANONYMOUS ? board.userId : '익명'}</div>
            <div className={style.date_txt}>{dateDiff(board.createdTime)}</div>
            <span className={style.like_txt}>{board.likesCount}</span>
            <div className={style.visit_txt}>{board.viewCount}</div>
        </div>
    )
}

export default BoardItem;
