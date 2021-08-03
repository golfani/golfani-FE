import {useState} from "react";
import style from "./feedAddTag.module.css";

const FeedAddTag = () : JSX.Element=> {
    const [value ,setValue] = useState("");
    const [size ,setSize] = useState(1);
    const [tagBoxClassName , setTagBoxClassName] = useState(style.tag_input_box_inactive);
    const [tagClassName , setTagClassName] = useState(style.tag_input_inactive);

    const change = (event : any) => {
        const input = event.target as HTMLInputElement;
        const width = input.value.length;
        console.log(width);
        console.log("value : ", value.length)
        setSize((size)=>width + 3);
    }

    const leave = () => {
        setSize(1)
        setValue("");
    }

    const focus = () => {
        setTagBoxClassName(style.tag_input_box_active);
        setTagClassName(style.tag_input_active);
    }
    return (
        <div className={style.tag_box}>
            <form className={tagBoxClassName}>
                <span>#</span>
                <input onChange={(e)=>{setValue(e.target.value)}} onFocus={focus} value={value} size={size} onBlur={leave} onKeyDown={change} className={tagClassName} placeholder="태그를 입력해 주세요"/>
                <button className={style.hidden}></button>
            </form>
        </div>
    );
};

export default FeedAddTag