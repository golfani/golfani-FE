import SearchIcon from '@material-ui/icons/Search';
import style from './tagSearch.module.css';
import React, {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {handleClickRefOutSide} from "src/utils/clickUtil";
import useTag from "src/store/modules/tag/tagHook";
import useFeedMenu from "src/store/modules/feedMenu/feedMenuHook";
import {useRouter} from "next/router";

const TagSearch = (): JSX.Element => {
    const tag = useTag();
    const feedMenu = useFeedMenu();
    const [searchBox, setSearchBox] = useState(style.hide);
    const [tagName, setTagName] = useState("");
    const tagRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [saveTagName, setSaveTagName] = useState("");
    const [deleteTagId, setDeleteTagId] = useState<number | null>(null);
    const [recentTagList, setRecentTagList] = useState<string[]>([]);

    /**
     * NEXT.JS SERVERSIDE 에서 web API 사용하기위해서는 useEffect 에서 사용해야 한다!
     */
    useEffect(() => {
        const output = window.localStorage.getItem("recent_tag");
        const recentTagList: string[] = JSON.parse(output as string);
        recentTagList ? setRecentTagList(recentTagList) : setRecentTagList([]);
    }, [])

    useEffect(() => {
        if (saveTagName) {
            // push 대신 0번 인덱스에 삽입한다.
            recentTagList.splice(0, 0, saveTagName);
            window.localStorage.setItem("recent_tag", JSON.stringify(recentTagList));
        }
    }, [saveTagName])

    useEffect(()=> {
        if (deleteTagId !== null) {
            const deleteTagList = recentTagList.filter((tag, id) => (
                id !== deleteTagId
            ));
            window.localStorage.setItem("recent_tag", JSON.stringify(deleteTagList));
            setRecentTagList(deleteTagList);
            setDeleteTagId(null);
        }
    },[deleteTagId])

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
        feedMenu.menu && feedMenu.onChangeMenu(0);
    }

    // tagList 가져오기
    const onFetchTagList = (payload: string) => {
        payload.length && tag.onGetTagList(payload);
    }

    // 검색한 태그 페이지로 이동하기
    const onRoute = (tag: string) => {
        onHideSearchBox();
        router.push(`feed?search=${tag}`);
        onInitInput();
    }

    // 검색 태그 초기화
    const onInitInput = () => {
        setTagName("");
        tag.onInitTagList();
    }

    const handleChangeInput = (e: ChangeEvent) => {
        const input = e.target as HTMLInputElement
        setTagName((tagName) => input.value);
        onFetchTagList(input.value);
    }

    const handleClickTag = (tag: string) => {
        setSaveTagName(tag);
        onRoute(tag);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        (document.activeElement as HTMLElement).blur(); // 현재 활성화된 element blur 처리
        setSaveTagName(tagName);
        onRoute(tagName);
    }

    const handleClickDeleteRecentTag = (id: number) => {
        setDeleteTagId(id);
    }

    /**
     * 원하는 영역 바깥 클릭 감지
     */
    handleClickRefOutSide(tagRef, onHideSearchBox);

    return (
        <>
            <div className={style.container} ref={tagRef}>
                <SearchIcon/>
                <form className={style.form_box} onSubmit={handleSubmit}>
                    <input onFocus={handleFocus}
                           className={style.input}
                           placeholder="#태그 검색"
                           value={tagName}
                           onChange={handleChangeInput}
                    />
                    <div className={searchBox}>
                        {
                            tagName ?
                                tag.data?.map((item) => (
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
                                <div>
                                    <span className={style.recent_tag_title_txt}>최근 검색 내용</span>
                                    {recentTagList.map((tag, id) => (
                                        <div className={style.recent_tag_box} key={id}>
                                            <span className={style.recent_tag_txt}
                                                  onClick={() => handleClickTag(tag)}>{`#${tag}`}</span>
                                            <button type={"button"}
                                                    className={style.recent_tag_delete_btn}
                                                    onClick={() => handleClickDeleteRecentTag(id)}>삭제
                                            </button>
                                        </div>
                                    ))}
                                </div>
                        }
                    </div>
                </form>
            </div>
        </>
    )
};

export default TagSearch;
