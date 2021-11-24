import style from 'src/components/board/item/boardItem.module.css';
import React from 'react';
import {IBoardData} from "src/apis/Board";
import {useRouter} from "next/router";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {dateDiff} from "../../../utils/dateUtil";
import UserName from "../../common/UserName";

interface IBoardProps{
    board : IBoardData;
}

const BoardItem = (board: IBoardProps) : JSX.Element => {

    const router = useRouter();

    const onTitleClick = async (id : number) => { // 클릭 되는 객체 반환
        // const response = await onClickBoard(id); // 해당 게시글이 클릭 될 때마다 조회수 증가
        // if(response.status === 200)
        router.push(`/board/view/${id}`);
    }

    return(
        <>
            <div className={style.board_item_container}>
                <div className={style.num}>{board.board.id}</div>
                <div className={style.board_title} onClick={() => onTitleClick(board.board.id)} >
                    <span
                        className={style.board_title_text} >{board.board.title.length > 30 ? board.board.title.slice(0, 27) + '...' : board.board.title}</span>
                </div>
                <div className={style.board_id}> {board.board.userId}</div>
                <div className={style.board_date}>{dateDiff(board.board.createdTime)}</div>
                <div className={style.recommend}>
                    <span>❣️</span>
                    <span> {board.board.likesCount}</span>
                </div>
            </div>
        </>
    )
}
export default BoardItem;