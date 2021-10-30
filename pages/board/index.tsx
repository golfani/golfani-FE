import BoardNavbar from 'src/components/board/main/BoardNavBar';
import BoardMain from 'src/components/board/main/Main';
import BoardLeftSideBar from 'src/components/board/main/leftSideBar/BoardLeftSideBar';
import {useState} from "react";
import {EType} from "../../src/domain/board";


const Board = () : JSX.Element => {

    const [boardType,setBoardType] = useState(EType.FREE);

    const onSetBoardType = (type: EType) => {
        setBoardType(type);
    }
    
    return (
        <div>
            <BoardNavbar/>
            <BoardLeftSideBar onSetBoardType={onSetBoardType}/>
            <BoardMain props={boardType}/>
        </div>

    )
};

export default Board;
