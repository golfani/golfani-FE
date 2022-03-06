import SearchIcon from '@material-ui/icons/Search';
import style from './feedSearch.module.css';
import React, {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {handleClickRefOutSide} from "src/utils/clickUtil";
import useFeedMenu from "src/store/modules/feedMenu/feedMenuHook";
import useCustomRouter from "src/hooks/routerHook";
import useSearch from "src/store/modules/search/searchHook";
import {getProfileImage} from "src/apis/Member";
import useFeedType from "src/store/modules/feedType/feedTypeHook";

enum SEARCH_TYPE {
    tag = 'tag',
    user = 'user'
}

interface IRecentSearch {
    type: SEARCH_TYPE,
    searchName: string
}

const FeedSearch = (): JSX.Element => {
    const search = useSearch();
    const feedMenu = useFeedMenu();
    const feedType = useFeedType();
    const [searchBox, setSearchBox] = useState(style.hide);
    const [searchName, setSearchName] = useState("");
    const tagRef = useRef<HTMLDivElement>(null);
    const [recentSearchList, setRecentSearchList] = useState<IRecentSearch[]>([]);
    const {onConflictRoute} = useCustomRouter();

    useEffect(() => {
        const output = window.localStorage.getItem("recent_tag");
        const recentSearchList: IRecentSearch[] = JSON.parse(output as string);
        recentSearchList ? setRecentSearchList(recentSearchList) : setRecentSearchList([]);
        feedType.type === 'MOBILE_SEARCH' && setSearchBox(style.search_box);
    }, [])

    // input inFocus 됬을때
    const handleFocus = () => {
        setSearchBox(style.search_box);
        onHideMenu();
    }

    // css 스타일 바꾸기
    const onHideSearchBox = () => {
        setSearchBox(style.hide);
    }

    // leftSideMenu 숨기기
    const onHideMenu = () => {
        feedMenu.menu && feedMenu.onChangeMenu('NONE');
    }

    // 검색결과 가져오기
    const onFetchSearchList = (payload: string) => {
        payload.length && search.onGetTagList(payload);
        payload.length && search.onGetUserList(payload);
    }

    // 검색한 태그 페이지로 이동하기
    const onRoute = (tag: string) => {
        onHideSearchBox();
        onConflictRoute(`/feed?search=${tag}`);
        onInitInput();
    }

    // 검색 태그 초기화
    const onInitInput = () => {
        setSearchName("");
        search.onInitTagList();
        search.onInitSearchUserList();
    }

    const handleChangeInput = (e: ChangeEvent) => {
        const input = e.target as HTMLInputElement
        setSearchName((searchName) => input.value.replace(/\s/g, ''));
        onFetchSearchList(input.value);
    }

    const handleClickTag = (tag: string) => {
        onRoute(tag);
        saveSearchHistory(SEARCH_TYPE.tag, tag);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (searchName.replace(/\s/g, '').length) {
            (document.activeElement as HTMLElement).blur(); // 현재 활성화된 element blur 처리
            onRoute(searchName);
            saveSearchHistory(SEARCH_TYPE.tag, searchName);
        }
    }

    const handleClickDeleteRecentTag = (id: number) => {
        deleteSearchHistory(id);
    }

    const saveSearchHistory = (type: SEARCH_TYPE, searchName: string) => {
        if (typeof window !== 'undefined') {
            const saveSearch: IRecentSearch = {
                type: type,
                searchName: searchName
            }
            recentSearchList.splice(0, 0, saveSearch);
            window.localStorage.setItem("recent_tag", JSON.stringify(recentSearchList));
        }
    }

    const deleteSearchHistory = (deleteId: number) => {
        const deleteTagList = recentSearchList.filter((tag, id) => (
            id !== deleteId
        ));
        window.localStorage.setItem("recent_tag", JSON.stringify(deleteTagList));
        setRecentSearchList(deleteTagList);
    }

    const handleClickSearchUser = (userId: string) => {
        onConflictRoute(`/profile/${userId}`);
        saveSearchHistory(SEARCH_TYPE.user, userId);
    }

    /**
     * 원하는 영역 바깥 클릭 감지
     */
    handleClickRefOutSide(tagRef, onHideSearchBox);

    return (
        <div className={style.container} ref={tagRef}>
            <SearchIcon className={style.search_icon}/>
            <form className={style.form_box} onSubmit={handleSubmit}>
                <input onFocus={handleFocus}
                       className={style.input}
                       placeholder="원하는 #태그를 검색해 보세요!"
                       value={searchName}
                       onChange={handleChangeInput}
                />
                <div className={searchBox}>
                    {
                        searchName ?
                            search.searchTag?.map((item) => (
                                <div className={style.tag_search_box} key={item.id}>
                                    <div className={style.tag_search_txt_box}
                                         onClick={() => handleClickTag(item.tagName)}>
                                        <span className={style.tag_search_txt}>{`#${item.tagName}`}</span>
                                        <span
                                            className={style.tag_search_total_txt}>{`${item.totalCount}개 게시글`}</span>
                                    </div>
                                </div>
                            ))
                            :
                            <div className={style.recent_search_box}>
                                <span className={style.recent_tag_title_txt}>최근 검색어</span>
                                {recentSearchList.map((item, id) => (
                                    <div className={style.recent_tag_box} key={id}>
                                        {item.type === SEARCH_TYPE.tag &&
                                        <span className={style.recent_tag_txt}
                                              onClick={() => handleClickTag(item.searchName)}>{`#${item.searchName}`}</span>
                                        }
                                        {item.type === SEARCH_TYPE.user &&
                                        <div className={style.recent_user_search_box}
                                             onClick={() => handleClickSearchUser(item.searchName)}>
                                            <img src={getProfileImage(item.searchName, 'MID')}
                                                 className={style.user_profile_img}/>
                                            <span className={style.user_search_txt}>{item.searchName}</span>
                                        </div>
                                        }
                                        <button type={"button"}
                                                className={style.recent_tag_delete_btn}
                                                onClick={() => handleClickDeleteRecentTag(id)}>삭제
                                        </button>
                                    </div>
                                ))}
                            </div>
                    }
                    {searchName && search.searchUser?.map((user) => (
                        <div key={user.id} className={style.user_search_box}
                             onClick={() => handleClickSearchUser(user.userId)}>
                            <img src={getProfileImage(user.userId, 'MID')} className={style.user_profile_img}/>
                            <span className={style.user_search_txt}>{user.userId}</span>
                        </div>
                    ))}
                </div>
            </form>
        </div>
    )
};

export default FeedSearch;
