import style from 'src/components/board/item/boardItem.module.css';
import React from 'react';
import {IBoardData} from "src/apis/Board";
import {useRouter} from "next/router";
import {dateDiff} from "src/utils/dateUtil";
import {EBoardType} from "src/domain/board";
import ImageIcon from '@material-ui/icons/Image';
import CloudQueueIcon from "@material-ui/icons/CloudQueue";
import {isMobile} from "src/utils/detectDevice";
import {getProfileImage} from "src/apis/Member";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';

interface IBoardItemProps{
    board : IBoardData;
}

const BoardItem = ({board} : IBoardItemProps) : JSX.Element => {
    const router = useRouter();
    const {type, page} = router.query;

    const onRoutePost = async () => {
        await router.push(`/board/${board.id}?type=${type}&page=${page}`);

    }

    const handleClickSubject = async () => {
        await onRoutePost();
    }

    const handleClickPost = async () => {
        isMobile() && await onRoutePost();
    }

    return(
        <div className={style.container} onClick={handleClickPost}>
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
            <div className={style.info_box}>
                {isMobile() && <img src={getProfileImage('default','MID')} alt={'user_icon'} className={style.user_img}/>}
                <span className={style.writer_txt}>{board.boardType !== EBoardType.ANONYMOUS ? board.userId : '익명'}</span>
                {isMobile() && <FavoriteBorderOutlinedIcon style={{fontSize: 14}} className={style.like_icon}/>}
                <span className={style.like_txt}>{board.likesCount}</span>
                {isMobile() && <VisibilityIcon style={{fontSize: 14}} className={style.view_icon}/>}
                <span className={style.visit_txt}>{board.viewCount}</span>
                <span className={style.date_txt}>{dateDiff(board.createdTime)}</span>
            </div>
        </div>
    )
}

export default BoardItem;
