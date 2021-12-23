import style from 'src/components/board/item/boardHotList.module.css';
import {useQuery} from "react-query";
import {IPages} from "../../../domain/Page";
import {getBoard, IBoardData} from "../../../apis/Board";
import {EBoardType} from "../../../domain/board";
import BoardHotItem from "./BoardHotItem";
import LocalFireDepartmentIcon from '@material-ui/icons/LocalFireDepartment';

const BoardHotList = () => {
    const boardQuery = useQuery<IPages<IBoardData>>(['boardHotList'],() => getBoard(EBoardType.TRADE));

    return(
        <div className={style.container}>
            <div className={style.list_wrap}>
                <div className={style.text_wrap}>
                    <LocalFireDepartmentIcon className={style.fire_icon} style={{color:"red",fontSize: '20px'}}/>
                    <span className={style.title_text}>Hot 게시글</span>
                </div>
                <div className={style.more_view}>더보기</div>
                {boardQuery.data &&
                    boardQuery.data.content.map((data,index) => (
                        <BoardHotItem board={data}/>
                    ))}
            </div>

        </div>
    )
}

export default BoardHotList;