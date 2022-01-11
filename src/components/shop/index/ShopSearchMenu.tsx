import style from './shopSearchMenu.module.css';

const ShopSearchMenu = () : JSX.Element => {
    return (
        <div className={style.container}>
            <span className={style.title_txt}>검색 옵션</span>
            <div className={style.menu_box}>
                <span className={style.menu_title_txt}>브랜드</span>
                <ul className={style.menu_list_box}>
                    <li className={style.option_txt_active}>전체</li>
                    <li className={style.option_txt}>핑</li>
                    <li className={style.option_txt}>캘러웨이</li>
                    <li className={style.option_txt}>테일러메이드</li>
                    <li className={style.option_txt}>타이틀리스트</li>
                </ul>
            </div>
            <div className={style.menu_box}>
                <span className={style.menu_title_txt}>타입</span>
                <ul className={style.menu_list_box}>
                    <li className={style.option_txt_active}>전체</li>
                    <li className={style.option_txt}>드라이버</li>
                    <li className={style.option_txt}>우드</li>
                    <li className={style.option_txt}>아이언</li>
                    <li className={style.option_txt}>퍼터</li>
                    <li className={style.option_txt}>웨지</li>
                    <li className={style.option_txt}>유틸</li>
                </ul>
            </div>
            <div className={style.menu_box}>
                <span className={style.menu_title_txt}>성별</span>
                <ul className={style.menu_list_box}>
                    <li className={style.option_txt_active}>전체</li>
                    <li className={style.option_txt}>남성</li>
                    <li className={style.option_txt}>여성</li>
                </ul>
            </div>
        </div>
    );
};

export default ShopSearchMenu;
