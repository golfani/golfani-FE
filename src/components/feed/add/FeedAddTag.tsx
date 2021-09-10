import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import style from "./feedAddTag.module.css";
import useFeedAdd from "src/store/modules/feedAdd/feedAddHook";
import useTag from "src/store/modules/tag/tagHook";
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';

const FeedAddTag = () : JSX.Element=> {
    const {feedAddState, onAddTag, onDeleteTag} = useFeedAdd();
    const {data, loading,error, onGetTagList, onInitTagList} = useTag();
    const [value ,setValue] = useState("");
    const [size ,setSize] = useState(1);
    const [tagBoxClassName , setTagBoxClassName] = useState(style.tag_input_box_inactive);
    const [tagClassName , setTagClassName] = useState(style.tag_input_inactive);

    const handleKeyDown = (event : React.KeyboardEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement;
        const width = input.value.length;
        setSize((size)=>width + 3);
    }

    const initTagInput = () => {
        setSize(1)
        setValue("");
        onInitTagList();
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

    const handleGetTagList = (payload : string) => {
        if(payload.trim().length > 0) {
            onGetTagList(payload);
        }
        else {
            onInitTagList();
        }
    }

    const handleChange = (event : ChangeEvent) => {
        const input = event.target as HTMLInputElement;
        setValue(input.value);
        handleGetTagList(input.value);
    }

    useEffect(()=> {
        console.log(data);
    },[data]);

    const autoComplete = (tag : string) => {
        if(feedAddState.tagList.indexOf(tag) === -1) {
            onAddTag(tag);
        }
    }

    const handleClickAutoCompleteTag = (tag : string) => {
        autoComplete(tag);
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
                <input onChange={handleChange}
                       onFocus={onFocus}
                       value={value}
                       size={size}
                       onBlur={onBlur}
                       onKeyDown={handleKeyDown}
                       className={tagClassName}
                       placeholder="태그를 입력해 주세요"
                />
                <button className={style.hidden}></button>
            </form>
            {data ? data.length > 0
                ?   <div className={style.tag_search_container}>
                        {data?.map((tag) => (
                            <div className={style.tag_search_box} key={tag.id}>
                                <div className={style.tag_search_txt_box} onMouseDown={()=>handleClickAutoCompleteTag(tag.tagName)}>
                                    <span className={style.tag_search_txt}>{`#${tag.tagName}`}</span>
                                    <span className={style.tag_search_total_txt}>{`${tag.totalCount}개 게시글`}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                : <></>
                : <></>
            }
        </div>
    );
};

export default FeedAddTag
