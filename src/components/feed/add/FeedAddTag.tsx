import React, {FormEvent, useState} from "react";
import style from "./feedAddTag.module.css";
import useFeedAdd from "src/store/modules/feedAdd/feedAddHook";

const FeedAddTag = () : JSX.Element=> {
    const {feedAddState, onAddTag, onDeleteTag} = useFeedAdd();
    const [value ,setValue] = useState("");
    const [size ,setSize] = useState(1);
    const [tagBoxClassName , setTagBoxClassName] = useState(style.tag_input_box_inactive);
    const [tagClassName , setTagClassName] = useState(style.tag_input_inactive);
    const [tagList, setTagList] = useState<Array<string>>([])

    const onChange = (event : React.KeyboardEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement;
        const width = input.value.length;
        setSize((size)=>width + 3);
    }

    const initTagInput = () => {
        setSize(1)
        setValue("");
    }

    const onBlur = () => {
        setTagClassName(style.tag_input_inactive);
        setTagBoxClassName(style.tag_input_box_inactive);
        initTagInput();
    }

    const onFocus = () => {
        setTagBoxClassName(style.tag_input_box_active);
        setTagClassName(style.tag_input_active);
    }

    const handleAddTag = () => {
        if(value.trim().length > 0) {
            const item = value.replace( /(\s*)/g, "");
            if(feedAddState.tagList.indexOf(item) === -1) {
                onAddTag(item);
            }
            initTagInput();
            return;
        }
        else return;
    }

    const handleSubmit = (event : FormEvent) => {
        event.preventDefault();
        handleAddTag();
    }

    const handleClickTag = (id : number) => {
        onDeleteTag(id);
    }

    return (
        <div className={style.tag_box}>
            {feedAddState.tagList.map((item,index) =>
                <span
                    key={item}
                    className={style.tag_item}
                    onClick={()=>handleClickTag(index)}>
                    {item}
                </span>
            )}
            <form className={tagBoxClassName} onSubmit={handleSubmit}>
                <span>#</span>
                <input onChange={(e)=>{setValue(e.target.value)}}
                       onFocus={onFocus}
                       value={value}
                       size={size}
                       onBlur={onBlur}
                       onKeyDown={onChange}
                       className={tagClassName}
                       placeholder="태그를 입력해 주세요"
                />
                <button className={style.hidden}></button>
            </form>
        </div>
    );
};

export default FeedAddTag
