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
                        <MoreHorizIcon className={style.info_icon} onClick={infoClickHandler}/>
                        {detailModalOpen && <DetailMenuModal setModalOpen={setDetailModalOpen} target={boardView} type={"POST"}/>}
                    </div>
                    <div className={style.info}>
                        <span className={style.user_txt} onClick={onUserIdClick}>{boardView.boardType !== EBoardType.ANONYMOUS ? boardView.userId : '익명'}</span>
                        <div className={style.info_sub_box}>
                            <span className={style.view_txt}>조회수</span>
                            <span className={style.view_count_txt}>{boardView.viewCount}</span>
                            <span className={style.date_txt}>{boardView.createdTime.slice(0,10)}</span>
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
                        <div className={style.like_wrap} onClick={onLikeClick}>
                            {likeQuery.data?.likes
                                ? <FavoriteIcon style={{fontSize : '23px', color : 'red'}}/>
                                : <FavoriteBorderIcon style={{fontSize : '23px', color : 'red'}}/>
                            }
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
