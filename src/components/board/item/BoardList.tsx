import style from 'src/components/board/item/boardList.module.css';
import BoardItem from 'src/components/board/item/BoardItem';
import {getBoard, IBoardData} from "src/apis/Board";
import {IBoardTypeProps} from "../BoardMain";
import {useQuery} from "react-query";
import {IPages} from "src/domain/Page";
import {useRouter} from "next/router";
import {EBoardType} from "src/domain/board";
import BoardPageNav from "src/components/board/page/BoardPageNav";

const BoardList = (boardType : IBoardTypeProps) : JSX.Element => {
    const router = useRouter();
    const {page} = router.query;

    const boardQuery = useQuery<IPages<IBoardData>>(['board', [boardType.boardType,Number(page)]], () => getBoard(boardType.boardType, Number(page), 20), {
        enabled: boardType.boardType !== EBoardType.HOME
    });

    return(
        <div className={style.container}>
            <div className={style.post_box}>
                <div className={style.title_box}>
                    <span className={style.no_txt}>번호</span>
                    <span className={style.subject_txt}>제목</span>
                    <span className={style.writer_txt}>글쓴이</span>
                    <span className={style.date_txt}>작성일</span>
                    <span className={style.like_txt}>추천</span>
                    <span className={style.visit_txt}>조회</span>
                </div>
                <div>
                    {boardQuery.data &&
                    boardQuery.data.content.map((board: IBoardData, index) => (
                        <BoardItem board={board} key={index}/>
                    ))}
                </div>
            </div>
            <BoardPageNav totalPage={boardQuery.data?.totalPages!}/>
        </div>
    )
}

export default BoardList;
