import style from "src/components/board/page/boardSearchHistory.module.css"
import {ISearchResult} from "./BoardSearchBar";
import BoardSearchItem from "./BoardSearchItem";

interface ISearchResultProps{
    searchResult : ISearchResult[]
    setSearchList : (searchList : ISearchResult[]) => void
    setPayload : (payload : string) => void
}

const BoardSearchHistory = ({searchResult,setSearchList, setPayload} : ISearchResultProps) : JSX.Element =>{
    return(
        <div className={style.container}>
            {
                searchResult?.map((data,index) => (
                    <BoardSearchItem key={index} item={data} setSearchList={setSearchList} setPayload={setPayload}/>
                ))
            }
        </div>
    )
}

export default BoardSearchHistory;