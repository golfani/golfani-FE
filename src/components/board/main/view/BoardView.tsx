import style from 'src/components/board/main/view/boardView.module.css';
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import BoardComment from "src/components/board/main/comment/BoardComment";
import {getCookie} from "../../../../utils/cookieUtil";
import {deleteBoard, IBoardData} from "../../../../apis/Board";
import {useRouter} from "next/router";

export interface IBoardProps{
    boardView : IBoardData
}

const BoardView = ({boardView} : IBoardProps): JSX.Element => {

    const [showDeleteBtn, setShowDeleteBtn] = useState(false);
    const userId = getCookie('userId');
    const router = useRouter();

    useEffect(()=>{
        if(userId === boardView.userId) setShowDeleteBtn(true);
        },[showDeleteBtn]);

    const onDeleteBoard = (boardId : number) => {
        const response = deleteBoard(boardId);
        router.push("/board");
    }

    return(
        <div className={style.container}>
            <div className={style.view_wrap}>
                <div className={style.board_view} id= "view">
                    <div className={style.title}>
                        {boardView.title}
                    </div>
                    <div className={style.info}>
                        <div className={style.info_wrap}>
                            <span className={style.header_box}>No</span>
                            <span className={style.text_box}>{boardView.id}</span>
                            <span className={style.header_box}>글쓴이</span>
                            <span className={style.text_box}>{boardView.userId}</span>
                            <span className={style.header_box}>게시일</span>
                            <span className={style.text_box}>{boardView.createdTime.slice(0,10)}</span>
                            <span className={style.header_box}>조회수</span>
                            <span className={style.text_box}>{boardView.viewCount}</span>
                        </div>
                    </div>
                    <div className={style.content} >
                        {
                            boardView.content.split('\n').map((line) => {
                            return(<span>{line}<br /></span>)})
                        }
                        <div className={style.img_wrap}>
                            {
                                boardView.urlList.map( (img)=>(
                                    <img src = {img} className={style.img_box}/>))
                            }
                        </div>
                    </div>
                    <BoardComment boardView={boardView}/>

                </div>
                <div className={style.bt_wrap}>
                    <button className={style.list_button}>목록</button>
                    <Link href={{
                        pathname: `put`,
                        query : { boardData : JSON.stringify(boardView)},
                    }} as={`put`}><a className={userId === boardView.userId ? style.list_button : style.block}>수정</a></Link>
                    <button className={showDeleteBtn ? style.delete_btn : style.block} onClick={(e) => onDeleteBoard(boardView.id)}>삭제</button>
                </div>
            </div>
        </div>
    )
}

export default BoardView;