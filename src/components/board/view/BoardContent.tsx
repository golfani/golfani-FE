import style from 'src/components/board/view/boardContent.module.css';
import React, {useEffect, useState} from 'react';
import {IBoardData} from "src/apis/Board";
import {useRouter} from "next/router";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getPostLikes, registerLikes} from "src/apis/Likes";
import {onHandleImgClick} from "src/domain/board";
import DetailMenuModal from "src/components/modals/DetailMenuModal";
import {boardTypeToPostString} from "src/utils/boardUtil";
import {dateDiff} from "src/utils/dateUtil";
import {getProfileImage} from "src/apis/Member";
import CloudQueueIcon from "@material-ui/icons/CloudQueue";
import LottieAnimation from "src/components/common/Lottie";
import BoardNavigation from "./BoardNavigation";

export interface IBoardProps{
    board : IBoardData
}

const BoardContent = ({board} : IBoardProps): JSX.Element => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [lottieLike, setLottieLike] = useState(false);

    const likeMutation = useMutation(()=> registerLikes("POST",board.id));

    const onRegisterLikes = async () => {
            try{
                const response = await likeMutation.mutateAsync();
                likeQuery.data || setLottieLike(true);
            }catch (e) {
                console.log(e);
            }
            finally {
                await queryClient.invalidateQueries(['postLikes',board.id]);
                await queryClient.invalidateQueries(['board',String(board.id)]);
            }
    }

    const likeQuery = useQuery(['postLikes',board.id],() => getPostLikes(board.id),{
        staleTime : 1000 * 60
        }
    )

    const handleClickLikeButton = async () => {
       await onRegisterLikes();
    }

    const handleClickMenuButton = () => {
        setDetailModalOpen(true);
    }

    const handleClickLinkShare = async () => {
        try {
            await navigator.clipboard.writeText(`https://golfani.com${router.asPath}`);
            alert('게시글 링크가 복사되었습니다');
        }
        catch (e) {

        }
    }

    const handleClickCategory = () => {
        router.push(`/board?type=${board.boardType}&page=0`);
    }

    useEffect(()=> {
        setTimeout(()=> {
            lottieLike && setLottieLike(false);
        },2000)
    },[lottieLike]);

    return (
        <div className={style.container}>
            <div className={style.title_box}>
                <span className={style.category_txt} onClick={handleClickCategory}>{boardTypeToPostString(board.boardType) + ' >'}</span>
                <span className={style.title_txt}>{board.title}</span>
                <span className={style.date_txt}>{dateDiff(board.createdTime)}</span>
            </div>
            <div className={style.info_box}>
                <div className={style.user_box}>
                    <img src={getProfileImage(board.userId,'MID')} className={style.user_img}/>
                    <span className={style.user_txt}>{board.userId}</span>
                </div>
                <div className={style.info_sub_box}>
                    <FavoriteBorderIcon style={{fontSize : 16}} className={style.like_icon}/>
                    <span className={style.like_count}>{board.likesCount}</span>
                    <CloudQueueIcon style={{fontSize : 16}} className={style.reply_icon}/>
                    <span className={style.reply_txt}>{board.replyCount}</span>
                    <span className={style.visit_txt}>조회</span>
                    <span className={style.visit_count_txt}>{board.viewCount}</span>
                </div>
            </div>
            <div className={style.menu_box}>
                <button className={style.link_share_btn} onClick={handleClickLinkShare}>URL 복사</button>
                <MoreHorizIcon className={style.menu_icon} onClick={handleClickMenuButton}/>
            </div>
            <div className={style.content_box}>
                {board.content.split('\n').map((content,index)=> (
                    <span className={style.content_txt} key={index}>{content}</span>
                ))}
            </div>
            <div className={style.img_box}>
                {board.urlList.map((img)=> (
                    <img key={img} src={img} alt={img} onClick={()=>onHandleImgClick(img)} className={style.img}/>
                ))}
            </div>
            <div className={style.like_wrap}>
                <div className={style.like_box} onClick={handleClickLikeButton}>
                    {likeQuery.data?.likes
                        ? !lottieLike && <FavoriteIcon style={{fontSize : 24, color : '#ff6969'}}/>
                        : !lottieLike && <FavoriteBorderIcon style={{fontSize : 24, color : '#ff6969'}}/>
                    }
                    {lottieLike && <LottieAnimation
                        width={140}
                        height={140}
                        animationData={require('/public/lottie/lottie_like.json')}
                        speed={0.5}
                    />}
                </div>
            </div>
            {detailModalOpen && <DetailMenuModal setModalOpen={setDetailModalOpen} target={board} type={'POST'}/>}
            <BoardNavigation board={board}/>
        </div>
    )
}

export default BoardContent;
