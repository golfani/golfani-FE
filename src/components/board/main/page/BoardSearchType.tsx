import style from 'src/components/board/main/page/boardSearchType.module.css'
import {useState} from "react";

const BoardSearchType = () : JSX.Element => {

    const [state, setState] = useState(false);
    const onBoxClick = () => {
        setState(!state);
    }

    const onHandlerOnclick = () =>{
        onBoxClick();
    }

    return (
        <div className={style.container}>
                <div className={style.list_style}>
                    <div className={style.sort_menu}>
                        <label className={state ? style.label_clicked : style.label}><input type="checkbox" value = "최신순" name = "box" defaultChecked={state} onClick={onHandlerOnclick}></input> 최신순</label>
                    </div>
                </div>
        </div>

    )
}

export default BoardSearchType;