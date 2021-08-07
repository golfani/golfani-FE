import SearchIcon from '@material-ui/icons/Search';
import style from './tagSearch.module.css';
import {useEffect, useRef, useState} from "react";

const TagSearch = () : JSX.Element => {
    const [searchBox, setSearchBox] = useState(style.hide);
    const tagRef = useRef<HTMLDivElement>(null);

    const handleFocus = () => {
        setSearchBox(style.search_box);
    }

    /**
     * 원하는 영역 바깥 클릭 감지
     */
    useEffect(() => {
        function handleClickOutside(e: MouseEvent): void {
            if (tagRef.current && !tagRef.current.contains(e.target as Node)) {
                setSearchBox(style.hide);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [tagRef]);

    return (
        <>
            <div className={style.container} ref={tagRef}>
                <SearchIcon/>
                <form className={style.form_box}>
                    <input onFocus={handleFocus} className={style.input} placeholder="#태그 검색"/>
                    <div className={searchBox}>
                        <span>최근 검색 태그</span>
                        <div>
                            <span># 골프</span>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
};

export default TagSearch;
