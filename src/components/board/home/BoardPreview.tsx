import style from './boardPreview.module.css';
import {EBoardType} from "src/domain/board";
import {useQuery} from "react-query";
import {getBoard, getHotPost, IBoardData} from "src/apis/Board";
import {IPages} from "src/domain/Page";
import BoardPreviewItem from "./BoardPreviewItem";
import {useRouter} from "next/router";
import {boardTypeToPostString} from "src/utils/boardUtil";

interface IBoardPreviewProps {
    category : EBoardType
}

const BoardPreview = ({category} : IBoardPreviewProps) : JSX.Element => {
    const router = useRouter();
    const previewQuery = useQuery<IPages<IBoardData>>(['board',category], ()=>getBoard(category,0,6),{
        enabled : category !== EBoardType.HOT
    });

    const hotPostQuery = useQuery<IPages<IBoardData>>(['board',category], () => getHotPost(0,12), {
        enabled : category === EBoardType.HOT
    });

    const handleClickCategoryMove = () => {
        router.push(`/board?type=${category}&page=0`);
    }

    return (
        <div className={category===EBoardType.HOT ? style.hot_container : style.container}>
            <div className={style.title_box}>
                <span className={style.title_txt}>{boardTypeToPostString(category)}</span>
                <span className={style.more_txt} onClick={handleClickCategoryMove}>이동</span>
            </div>
            {category === EBoardType.HOT
                ?
                <div className={style.board_long_container}>
                    {hotPostQuery.data?.content.map((board) => (
                        <BoardPreviewItem board={board} key={board.id}/>
                    ))}
                </div>
                :
                <div className={style.board_container}>
                    {previewQuery.data?.content.map((board) => (
                        <BoardPreviewItem board={board} key={board.id}/>
                    ))}
                </div>
            }
        </div>
    );
};

export default BoardPreview;
