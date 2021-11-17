import style from 'src/components/board/main/view/boardView.module.css';
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import BoardComment from "src/components/board/main/comment/BoardComment";
import {getCookie} from "src/utils/cookieUtil";
import {deleteBoard, IBoardData} from "src/apis/Board";
import {useRouter} from "next/router";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from '@material-ui/icons/Favorite';
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getAllPostLikes, getFeedLikes, getPostLikes, registerLikes} from "../../../../apis/Likes";

export interface IBoardProps{
    boardView : IBoardData
}

const BoardView = ({boardView} : IBoardProps): JSX.Element => {
    const queryClient = useQueryClient();

    const [showDeleteBtn, setShowDeleteBtn] = useState(false);
    const userId = getCookie('userId');
    const router = useRouter();

    const totalLikesQuery = useQuery(['totalLikes',boardView.id], () => getAllPostLikes(boardView.id),{
        staleTime : 1000 * 60
    })

    const likeMutation = useMutation(()=> registerLikes("POST",boardView.id));

    const onRegisterLikes = async () => {
            try{
                const response = await likeMutation.mutateAsync();
            }catch (e) {
                console.log(e);
            }
            finally {
                await queryClient.invalidateQueries(['postLikes',boardView.id]);
                await queryClient.invalidateQueries(['totalLikes',boardView.id]);
            }
    }

    const likeQuery = useQuery(['postLikes',boardView.id],() => getPostLikes(boardView.id),{
        staleTime : 1000 * 60
        }
    )

    useEffect(()=>{
        if(userId === boardView.userId) setShowDeleteBtn(true);
        },[showDeleteBtn,likeQuery]);

    const onDeleteBoard = (boardId : number) => {
        const response = deleteBoard(boardId);
        router.push("/board");
    }

    const onLikeClick = () => {
        onRegisterLikes();
    }

    return(
        <div className={style.container}>
            <div className={style.view_wrap}>
                <div className={style.board_view} id= "view">
                    <div className={style.title}>
                        {boardView.title}
                        <div className={style.like_wrap}>
                            {likeQuery.data?.likes ? <FavoriteIcon onClick={onLikeClick} style={{fontSize : '1.0rem'}}/> : <FavoriteBorderIcon onClick={onLikeClick} style={{fontSize : '1.0rem'}}/>}
                            {totalLikesQuery.data}
                        </div>
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