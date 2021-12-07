import style from './shopMenu.module.css';

const ShopMenu = () : JSX.Element => {
    return (
        <div className={style.container}>
            <ul className={style.menu_list_box}>
                <li>전체상품</li>
                <li>드라이버</li>
                <li>우드</li>
                <li>아이언</li>
                <li>퍼터</li>
                <li>웨지</li>
                <li>유틸</li>
            </ul>
        </div>
    );
};

export default ShopMenu;
