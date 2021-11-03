import style from 'src/components/board/main/item/boardItem.module.css';
import {useEffect, useState} from 'react';
import BoardItem from 'src/components/board/main/item/BoardItem';
import {getBoard, IBoardData} from "../../../../apis/Board";
import {ITypeProps} from "../BoardMain";
import {useQuery} from "react-query";
import {IPages} from "../../../../domain/Page";

const BoardList = (boardType : ITypeProps) : JSX.Element => {

    const [pageNum,setPageNum] = useState<number>(0);
    const [totalPage, setTotalPage] = useState(0);

    const boardQuery = useQuery<IPages<IBoardData>>(['board',boardType.boardType], () => getBoard(boardType.boardType,pageNum,10), {
        enabled : boardType.boardType!==undefined,
    });

    const btnOnClick = () =>{
        setTotalPage(boardQuery.data?.totalPages as number)
        console.log(totalPage);
        console.log(boardQuery.data);
        console.log(pageNum);
        if(pageNum < totalPage-1){
            setPageNum(pageNum +1);
        }
    }

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

                {boardQuery.data &&
                boardQuery.data.content.map((board : IBoardData)=> {
                    return(
                        <BoardItem board={board}/>
                    )
                })}
                <div>
                    <button onClick={btnOnClick}>다음</button>
                    <button >이전</button>
                </div>
            </div>
        </div>
    )
}

export default BoardList;