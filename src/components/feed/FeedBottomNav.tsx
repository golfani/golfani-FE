import style from './feedBottomNav.module.css';
import useFeedType from "src/store/modules/feedType/feedTypeHook";
import Image from 'next/image';
import HomeIcon from 'public/home_ico.png';
import HomeActiveIcon from 'public/home_active_ico.png';
import CardViewIcon from 'public/card_view_ico.png';
import CardViewActiveIcon from 'public/card_view_active_ico.png';
import SearchIcon from 'public/search_ico.png';
import SearchActiveIcon from 'public/search_active_ico.png';

const FeedBottomNav = () : JSX.Element => {
    const {type,onChangeListView,onChangeCardView,onChangeMobileSearchView} = useFeedType();

    const handleClickListView = () => {
        type === 'LIST' ? window.scrollTo({top : 0, behavior : 'smooth'}) : onChangeListView();
    }

    const handleClickCardView = () => {
        type === 'CARD' ? window.scrollTo({top : 0, behavior : 'smooth'}) : onChangeCardView();
    }

    const handleClickSearch = () => {
        onChangeMobileSearchView();
    }

    return (
        <ul className={style.bottom_menu_box}>
            <li className={style.menu_list} onClick={handleClickListView}>
                <Image src={type==='LIST' ? HomeActiveIcon : HomeIcon} width={20} height={20}/>
            </li >
            <li className={style.menu_list} onClick={handleClickCardView}>
                <Image src={type==='CARD' ? CardViewActiveIcon : CardViewIcon} width={20} height={20}/>
            </li>
            <li className={style.menu_list} onClick={handleClickSearch}>
                <Image src={type === 'MOBILE_SEARCH' ? SearchActiveIcon : SearchIcon} width={20} height={20}/>
            </li>
        </ul>
    );
};

export default FeedBottomNav;
