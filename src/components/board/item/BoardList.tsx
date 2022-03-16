import style from 'src/components/board/item/boardList.module.css';
import BoardItem from 'src/components/board/item/BoardItem';
import {getBoard, getHotPost, getPinnedPost, IBoardData} from "src/apis/Board";
import {IBoardTypeProps} from "../BoardMain";
import {useQuery} from "react-query";
import {IPages} from "src/domain/Page";
import {useRouter} from "next/router";
import {EBoardType} from "src/domain/board";
import BoardPageNav from "src/components/board/page/BoardPageNav";

const BoardList = ({boardType}: IBoardTypeProps): JSX.Element => {
    const router = useRouter();
    const {page} = router.query;

    const fetchBoard = async () => {
        if (boardType === EBoardType.HOT) {
            return await getHotPost(Number(page), 20)
        } else {
            return await getBoard(boardType, Number(page), 20);
        }
    }

    const boardQuery = useQuery<IPages<IBoardData>>(['board', [boardType, Number(page)]], fetchBoard, {
        enabled: boardType !== EBoardType.HOME
    });

    const pinnedPostQuery = useQuery<IBoardData[]>(['pinned', boardType], () => getPinnedPost(boardType!), {
        enabled: boardType !== undefined && boardType !== 'HOT'
    });

    return (
        <div className={style.container}>
            <div className={style.post_box}>
                <div className={style.title_box}>
                    <span className={style.no_txt}>번호</span>
                    <span className={style.subject_txt}>제목</span>
                    <span className={style.writer_txt}>글쓴이</span>
                    <span className={style.like_txt}>추천</span>
                    <span className={style.visit_txt}>조회</span>
                    <span className={style.date_txt}>작성일</span>
                </div>
                <div>
                    {pinnedPostQuery.data?.map((board) => (
                        <BoardItem board={board} key={board.id} pinned={true}/>
                    ))}
                </div>
                <div>
                    {boardQuery.data?.totalPages ?
                        boardQuery.data?.content.map((board: IBoardData, index) => (
                            <BoardItem board={board} key={index}/>
                        ))
                        :
                        <span className={style.no_content_txt}>등록된 글이 없습니다.</span>
                    }
                </div>
            </div>
            {boardQuery.data?.totalPages ? <BoardPageNav totalPage={boardQuery.data?.totalPages!}/> : null}
        </div>
    )
}

export default BoardList;
