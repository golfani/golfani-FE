import style from 'src/components/board/page/boardSearchItem.module.css'
import {ISearchResult} from "./BoardSearchBar";
import {useRef} from "react";

interface ISearchItemProps{
    item : ISearchResult
    setSearchList : (searchList : ISearchResult[]) => void
    setPayload: (payload: string) => void
    setOnSearchId: (OnSearchId: boolean) => void
}

const BoardSearchItem = ({item,setSearchList,setPayload, setOnSearchId} : ISearchItemProps) => {
    const searchId = useRef<HTMLDivElement>(null);
    const handleOnDelete = () => {
        onDelete();
    }

    const onClickPayload = () => {
        setPayload(item.payload);
        setOnSearchId(false);
    }

    const onDelete = () => {
        const data = JSON.parse(window.localStorage.getItem('searchList') as string);
        const filterData = data.filter((el:ISearchResult) => el.payload !== item.payload)
        setSearchList(filterData);
    }

    return(
        <div className={style.container} ref={searchId}>
            <span className={style.search_payload} onClick={onClickPayload}>{item.payload}</span>
            <button className={style.delete_btn} onClick={handleOnDelete}>삭제</button>
        </div>
    )
}

export default BoardSearchItem;
