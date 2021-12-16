import style from "src/components/board/page/boardSearchHistory.module.css"
import {ISearchResult} from "./BoardSearchBar";
import BoardSearchItem from "./BoardSearchItem";

interface ISearchResultProps{
    searchResult : ISearchResult[]
    setSearchList : (searchList : ISearchResult[]) => void
    setPayload : (payload : string) => void
    setOnSearchId : (OnSearch : boolean) => void
}

const BoardSearchHistory = ({searchResult,setSearchList, setPayload,setOnSearchId} : ISearchResultProps) : JSX.Element =>{
    return(
        <div className={style.container}>
            {
                searchResult?.map((data,index) => (
                    <BoardSearchItem key={index} item={data} setSearchList={setSearchList} setPayload={setPayload} setOnSearchId={setOnSearchId}/>
                ))
            }
        </div>
    )
}

export default BoardSearchHistory;