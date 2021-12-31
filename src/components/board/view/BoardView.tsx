import style from './boardView.module.css';
import BoardContent, {IBoardProps} from "./BoardContent";
import BoardComment from "../comment/BoardComment";

const BoardView = ({board} : IBoardProps) => {
    return (
        <div className={style.container}>
            <BoardContent board={board}/>
            <BoardComment board={board}/>
        </div>
    );
};

export default BoardView;
