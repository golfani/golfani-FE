import style from 'src/components/board/main/boardMain.module.css'
import BoardList from 'src/components/board/main/item/BoardList';
import BoardPage from 'src/components/board/main/page/BoardPage';
import {EType} from "../../../domain/board";

export interface IProps{
    props : EType
}

const BoardMain = (props: IProps): JSX.Element => {

    return(
        <div className={style.container}>
            <div>
                <BoardList props={props.props}/>
                <BoardPage/>
            </div>
        </div>
    )
}

export default BoardMain;