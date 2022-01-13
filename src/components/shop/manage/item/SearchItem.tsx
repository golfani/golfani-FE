import style from'./searchItem.module.css'
import {MouseEventHandler, useState} from "react";
const SearchItem = () : JSX.Element => {

    const [hover,setHover] = useState(false);

    const onMouseOverHandler = () => {
        setHover(true);
    }

    return(
        <div className={style.container} onMouseOver={onMouseOverHandler} onMouseOut={() => setHover(false)}>
            <img className={style.item_img}
                src="http://img.danawa.com/prod_img/500000/724/250/img/12250724_1.jpg?shrink=330:330&_v=20211216145449"/>
            <div className={style.item_info_wrap}>
                <span className={style.item_brand}>HONMA</span>
                <span className={style.item_name}>G425 MAX 드라이버 남성 ALTA J CB SLATE</span>
                <span className={style.item_release}>2018-12-03</span>
                <span className={style.item_type}>드라이버</span>
                {
                    hover &&
                    <span className={style.insert_btn}>추가</span>
                }
            </div>
        </div>
    )
}

export default SearchItem;