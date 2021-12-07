import style from './shopOption.module.css';

const ShopOption = () : JSX.Element => {
    return (
        <div className={style.container}>
            <div className={style.option_box}>
                <span className={style.option_title_txt}>성별</span>
                <input id={'male'} type={'checkbox'} className={style.input}/>
                <label htmlFor={'male'} className={style.checkBox_label}/>
                <span className={style.option_txt}>남성</span>
                <input id={'female'} type={'checkbox'} className={style.input}/>
                <label htmlFor={'female'} className={style.checkBox_label}/>
                <span className={style.option_txt}>여성</span>
            </div>
            <div className={style.option_box}>
                <span className={style.option_title_txt}>브랜드</span>
                <input id={'ping'} type={'checkbox'} className={style.input}/>
                <label htmlFor={'ping'} className={style.checkBox_label}/>
                <span className={style.option_txt}>핑</span>
                <input id={'callaway'} type={'checkbox'} className={style.input}/>
                <label htmlFor={'callaway'} className={style.checkBox_label}/>
                <span className={style.option_txt}>캘러웨이</span>
                <input id={'taylorMade'} type={'checkbox'} className={style.input}/>
                <label htmlFor={'taylorMade'} className={style.checkBox_label}/>
                <span className={style.option_txt}>테일러메이드</span>
                <input id={'titleist'} type={'checkbox'} className={style.input}/>
                <label htmlFor={'titleist'} className={style.checkBox_label}/>
                <span className={style.option_txt}>타이틀리스트</span>
            </div>
        </div>
    );
};

export default ShopOption;
