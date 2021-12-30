import style from 'src/components/board/search/boardSearchItem.module.css'
import {useRef} from "react";

interface ISearchItemProps{
    item : string
    setSearchList : (searchList : string[]) => void
    setPayload: (payload: string) => void
    setOnSearchId: (OnSearchId: boolean) => void
}

const BoardSearchItem = ({item,setSearchList,setPayload, setOnSearchId} : ISearchItemProps) => {
    const searchId = useRef<HTMLDivElement>(null);

    const handleOnDelete = () => {
        onDelete();
    }

    const onClickPayload = () => {
        setPayload(item);
        setOnSearchId(false);
    }

    const onDelete = () => {
        const data = JSON.parse(window.localStorage.getItem('searchList') as string);
        const filterData = data.filter((el: string) => el !== item);
        setSearchList(filterData);
        updateSearchList(filterData);
    }

    const updateSearchList = (data : string[]) => {
        localStorage.setItem('searchList', JSON.stringify(data));
    }

    return(
        <div className={style.container} ref={searchId}>
            <span className={style.search_payload} onClick={onClickPayload}>{item}</span>
            <button className={style.delete_btn} onClick={handleOnDelete}>삭제</button>
        </div>
    )
}

export default BoardSearchItem;
