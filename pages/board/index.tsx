import Navbar from "../../src/components/common/navbar/Navbar";
import BoardMain from 'src/components/board/main/BoardMain';
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
            <Navbar/>
            <BoardLeftSideBar onSetBoardType={onSetBoardType}/>
            <BoardMain props={boardType}/>
        </div>
    )
};

export default Board;
