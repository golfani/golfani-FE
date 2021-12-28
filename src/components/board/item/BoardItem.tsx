import style from 'src/components/board/item/boardItem.module.css';
import React from 'react';
import {IBoardData} from "src/apis/Board";
import {useRouter} from "next/router";
import {dateDiff} from "../../../utils/dateUtil";
import {EBoardType} from "../../../domain/board";
import ImageIcon from '@material-ui/icons/Image';

interface IBoardProps{
    board : IBoardData;
}

const BoardItem = (board: IBoardProps) : JSX.Element => {
    const router = useRouter();
    const onTitleClick = async (id : number) => { // 클릭 되는 객체 반환
        router.push(`/board/${id}`);
    }

    return(
        <>
            <div className={style.board_item_container}>
                <div className={style.num}>{board.board.id}</div>
                <div className={style.board_title} onClick={() => onTitleClick(board.board.id)} >
                    <span
                        className={style.board_title_text} >{board.board.title.length > 30 ? board.board.title.slice(0, 27) + '...' : board.board.title}
                    </span>
                    {
                        board.board.urlList !== [] &&
                        <ImageIcon style={{fontSize : '15px'}}/>
                    }
                </div>
                <div className={style.board_id}> { board.board.boardType !== EBoardType.ANONYMOUS ? board.board.userId : '익명'}</div>
                <div className={style.board_date}>{dateDiff(board.board.createdTime)}</div>
                <div className={style.recommend}>
                    <span>❣️</span>
                    <span> {board.board.likesCount}</span>
                </div>
                <div className={style.board_views}>{board.board.viewCount}</div>
            </div>

        </>
    )
}
export default BoardItem;
