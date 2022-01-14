import style from 'src/components/shop/manage/item/shopItemAdd.module.css'
import SearchItem from "./SearchItem";
import {MouseEventHandler, useState} from "react";
const ShopItemAdd = () : JSX.Element => {
    const [saleCondition, setSaleCondition] = useState('');
    const selectBoxClickHandler = (type : string) => {
        setSaleCondition(type);
    }

    return(
        <div className={style.container}>
            <span className={style.sale_head_txt}>판매상품추가</span>
            <div className={style.search_item_box}>
                <span className={style.search_header_txt}>상품검색</span>
                <div className={style.search_box}>
                    <input type="text" className={style.input_box}/>
                    <span className={style.search_btn}>검색</span>
                </div>
                <div className={style.item_wrap}>
                    <SearchItem/>
                    <SearchItem/>
                    <SearchItem/>
                    <SearchItem/>
                    <SearchItem/>
                    <SearchItem/>
                    <SearchItem/>
                </div>
            </div>
            <div className={style.item_register_box}>
                <label htmlFor="input-file" className={style.img_wrap}>
                    <div className={style.img_box}></div>
                    <span className={style.img_representative_img}>대표</span>
                    <span className={style.plus_btn}>+</span>
                </label>
                <input type="file"
                       id="input-file"
                       className={style.item_input_file}/>
                <div className={style.register_item_box}>
                    <div className={style.item_box}>
                        <span className={style.item_head_txt}>브랜드</span>
                        <span className={style.sale_brand_txt}>Homna</span>
                    </div>
                    <div className={style.item_box}>
                        <span className={style.item_head_txt}>상품이름</span>
                        <span className={style.item_name_txt}>G425 MAX 드라이버 남성 ALTA J CB SLATE</span>
                    </div>
                    <div className={style.sale_price_box}>
                        <div className={style.sale_price_wrap}>
                            <span className={style.item_head_txt}>기존 판매가</span>
                            <input type="input" placeholder="0,000,000원" className={style.price_input}/>
                        </div>
                        <div className={style.sale_price_wrap}>
                            <span className={style.item_head_txt}>할인 판매가</span>
                            <input type="input" placeholder="0,000,000원" className={style.price_input}/>
                        </div>
                        <div className={style.sale_price_wrap}>
                            <span className={style.item_head_txt}>할인율</span>
                            <span className={style.sale_percent_txt}>55%</span>
                        </div>
                    </div>
                    <div className={style.item_box}>
                        <span className={style.item_head_txt}>중고여부</span>
                        {/*<div className={style.checkbox_wrap}>*/}
                        {/*    <input type="checkbox" id="new_item"/>*/}
                        {/*    <label htmlFor="new_item" className={style.sale_brand_txt}>신품</label>*/}
                        {/*    <input type="checkbox" onClick={(e) => checkBoxClickHandler}/>*/}
                        {/*    <label htmlFor="new_item" className={style.sale_brand_txt} >중고</label>*/}
                        {/*</div>*/}
                        <select className={style.select_box} onChange={(e) => selectBoxClickHandler(e.target.value)}>
                            <option value='신품'>신품</option>
                            <option value='중고'>중고</option>
                        </select>
                    </div>
                    {
                        saleCondition === '중고' &&
                        <div className={style.item_box}>
                            <span className={style.item_head_txt}>상품상태</span>
                            <div className={style.checkbox_wrap}>
                                <input type="checkbox" id="A"/>
                                <label htmlFor="A" className={style.sale_brand_txt}>A</label>
                                <input type="checkbox" id="B"/>
                                <label htmlFor="B" className={style.sale_brand_txt}>B</label>
                                <input type="checkbox" id="C"/>
                                <label htmlFor="C" className={style.sale_brand_txt}>C</label>
                                <input type="checkbox" id="D"/>
                                <label htmlFor="D" className={style.sale_brand_txt}>D</label>
                                <input type="checkbox" id="E"/>
                                <label htmlFor="E" className={style.sale_brand_txt}>E</label>
                            </div>
                        </div>
                    }
                    <div className={style.item_box}>
                        <span className={style.item_head_txt}>상품설명</span>
                        <textarea className={style.item_info}/>
                    </div>
                </div>
            </div>
            <div className={style.btn_box}>
                <button className={style.btn_cancel}>취소</button>
                <button className={style.btn_register}>작성</button>
            </div>
        </div>
    )
}

export default ShopItemAdd;