import style from 'src/components/board/main/item/boarditem.module.css';
import {useEffect, useState} from 'react';
import BoardItem from 'src/components/board/main/item/BoardItem';
import {getBoard, IBoardData} from "../../../../apis/Board";
import {IProps} from "../Main";
import {useInfiniteQuery, useQuery} from "react-query";
import {IPages} from "../../../../domain/Page";
import {getFeed, IFeedContent} from "../../../../apis/Feed";

const BoardList = (props : IProps) : JSX.Element => {
    // const feedQuery = useInfiniteQuery<IPages<IFeedContent>>('board',({pageParam = ''})=>getBoard(props.props,pageParam,10), {
    //     getNextPageParam : (lastPage) => {
    //         console.log(lastPage);
    //         const currentPage = lastPage.pageable.pageNumber;
    //         if(currentPage + 1 >= lastPage.totalPages) {
    //             return undefined;
    //         }
    //         return currentPage + 1;
    //     },
    //     staleTime : 1000 * 60,
    // })

    const boardQuery = useQuery(['board',props.props], () => getBoard(props.props), {
        enabled : props.props!==undefined,
    });

    useEffect(()=>{
        console.log(boardQuery.data);
    },[props.props])

    return(
        <div className={style.container}>
            <div className={style.list_item}>
                <div className={style.list_top}>
                    <div className={style.num}>No.</div>
                    <div className={style.board_title}>글제목</div>
                    <div className={style.board_id}>글쓴이</div>
                    <div className={style.board_date}>작성일</div>
                    <div className={style.recommend}>추천</div>
                </div>
                {boardQuery.data && <BoardItem boardList={boardQuery.data}></BoardItem>}
            </div>
        </div>
    )
}

export default BoardList;
