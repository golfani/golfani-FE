import style from "src/components/board/search/boardSearchHistory.module.css"
import BoardSearchItem from "./BoardSearchItem";

interface ISearchResultProps{
    searchResult : string[]
    setSearchList : (searchList : string[]) => void
    setPayload : (payload : string) => void
    setOnSearchId : (OnSearch : boolean) => void
}

const BoardSearchHistory = ({searchResult,setSearchList, setPayload,setOnSearchId} : ISearchResultProps) : JSX.Element =>{

    const handleClickAllDeleteButton = () => {
        const state = confirm('최근검색어를 모두 삭제하시겠습니까?');
        if(state) {
            localStorage.setItem('searchList', '[]');
            setSearchList([]);
        }
    }

    return(
        <div className={style.container}>
            <div className={style.history_box}>
                <span className={style.history_txt}>최근검색어</span>
                <button className={style.history_all_delete_btn} onClick={handleClickAllDeleteButton}>전체삭제</button>
            </div>
            {
                searchResult?.map((data,index) => (
                    <BoardSearchItem key={index} item={data} setSearchList={setSearchList} setPayload={setPayload} setOnSearchId={setOnSearchId}/>
                ))
            }
        </div>
    )
}

export default BoardSearchHistory;
