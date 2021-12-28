import style from 'src/components/board/boardView.module.css';
import React, {useEffect, useState} from 'react';
import BoardComment from "src/components/board/comment/BoardComment";
import {getCookie} from "src/utils/cookieUtil";
import {IBoardData} from "src/apis/Board";
import {useRouter} from "next/router";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getAllPostLikes, getPostLikes, registerLikes} from "src/apis/Likes";
import {EBoardType,onHandleImgClick} from "src/domain/board";
import DetailMenuModal from "src/components/modals/DetailMenuModal";

export interface IBoardProps{
    boardView : IBoardData
}

const BoardView = ({boardView} : IBoardProps): JSX.Element => {
    const queryClient = useQueryClient();
    const [showDeleteBtn, setShowDeleteBtn] = useState(false);
    const userId = getCookie('userId');
    const router = useRouter();
    const [detailModalOpen, setDetailModalOpen] = useState(false);

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

    useEffect(() => {
        if (userId === boardView.userId) setShowDeleteBtn(true);
    }, [showDeleteBtn, likeQuery]);

    const onLikeClick = async () => {
       await onRegisterLikes();
    }

    const onUserIdClick = () =>{
        router.push(`/profile/${boardView.userId}`);
    }

    const infoClickHandler = () => {
        setDetailModalOpen(true);
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
                            <div>
                                <span className={style.header_box}>No</span>
                                <span className={style.text_box}>{boardView.id}</span>
                                <span className={style.header_box}>글쓴이</span>
                                {boardView.boardType !== EBoardType.ANONYMOUS ? <span className={style.text_box_user} onClick={onUserIdClick}>{boardView.userId}</span> : <span className={style.text_box_user}>Anonymous</span>}
                                <span className={style.header_box}>게시일</span>
                                <span className={style.text_box}>{boardView.createdTime.slice(0,10)}</span>
                                <span className={style.header_box}>조회수</span>
                                <span className={style.text_box}>{boardView.viewCount}</span>
                            </div>
                            <MoreHorizIcon className={style.info_icon} onClick={infoClickHandler}/>
                            {detailModalOpen && <DetailMenuModal setModalOpen={setDetailModalOpen} target={boardView} type={"POST"}/>}
                        </div>
                    </div>
                    <div className={style.content} >
                        {
                            boardView.content.split('\n').map((line, index) => (
                                <span key={index}>{line}<br/></span>
                            ))
                        }
                        <div className={style.img_wrap}>
                            {
                                boardView.urlList.map( (img,index)=>(
                                    <img src={img} alt={img} onClick={() => onHandleImgClick(img)} className={style.img_box}/>))
                            }
                        </div>
                        <div className={style.like_wrap}>
                            {likeQuery.data?.likes ? <FavoriteIcon onClick={onLikeClick} style={{fontSize : '1.5rem'}}/> : <FavoriteBorderIcon onClick={onLikeClick} style={{fontSize : '1.5rem'}}/>}
                            <span className={style.like_count}>{totalLikesQuery.data}</span>
                        </div>
                    </div>
                    <BoardComment boardView={boardView}/>
                </div>
            </div>
        </div>
    )
}

export default BoardView;
