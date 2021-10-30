import style from 'src/components/board/main/view/boardView.module.css';
import React, {useEffect,useState} from 'react';
import Link from "next/link";
import BoardComment from "../comment/BoardComment";
import {getCookie} from "../../../../utils/cookieUtil";
import {deleteBoard, IBoardData} from "../../../../apis/Board";
import {useRouter} from "next/router";
import BoardPut from "../BoardPut";


export interface IBoardProps{
    boardView : IBoardData
}

const Board_view = (boardView : IBoardProps): JSX.Element => {

    const [showDeleteBtn, setShowDeleteBtn] = useState(true);
    const userId = getCookie('userId');
    const router = useRouter();

    const onDeleteBoard = (boardId : number) => {
        setShowDeleteBtn(true);
        const response = deleteBoard(boardId);
        router.push("/board");
        if(boardView.boardView.userId === userId.toString()){
            setShowDeleteBtn(true);
        }
    }

    return(
        <div className={style.container}>
            <div className={style.view_wrap}>
                <div className={style.board_view} id= "view">
                    <div className={style.title}>
                        {boardView.boardView.title}
                    </div>
                    <div className={style.info}>
                        <div className={style.info_wrap}>
                            <span className={style.header_box}>No</span>
                            <span className={style.text_box}>{boardView.boardView.id}</span>
                            <span className={style.header_box}>글쓴이</span>
                            <span className={style.text_box}>{boardView.boardView.userId}</span>
                            <span className={style.header_box}>게시일</span>
                            <span className={style.text_box}>{boardView.boardView.createdTime.slice(0,10)}</span>
                            <span className={style.header_box}>조회수</span>
                            <span className={style.text_box}>{boardView.boardView.viewCount}</span>
                        </div>
                    </div>
                    <div className={style.content} >
                        {boardView.boardView.content}
                    </div>
                    <BoardComment/>
                </div>
                <div className={style.bt_wrap}>
                    <button className={style.list_button}>목록</button>
                    <Link href={{
                        pathname: `put`,
                        query : { boardData : JSON.stringify(boardView)},
                    }} as={`put`}><a className={style.list_button}>수정</a></Link>
                    <button className={showDeleteBtn ? style.delete_btn : style.block} onClick={(e) => onDeleteBoard(boardView.boardView.id)}>삭제</button>
                </div>
            </div>
        </div>
    )
}

export default Board_view;