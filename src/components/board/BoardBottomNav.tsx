import style from './boardBottomNav.module.css';
import HomeIcon from 'public/icon/home_ico.png';
import HomeActiveIcon from 'public/icon/home_active_ico.png';
import SearchIcon from 'public/icon/search_ico.png';
import SearchActiveIcon from 'public/icon/search_active_ico.png';
import CategoryIcon from 'public/icon/category_ico.png';
import CategoryActiveIcon from 'public/icon/category_active_ico.png';
import Image from "next/image";
import {useRouter} from "next/router";
import {EBoardType} from "src/domain/board";

const BoardBottomNav = () => {
    const router = useRouter();
    const {type} = router.query;

    const handleClickHome = () => {
        type && router.push('/board');
    }

    const handleClickCategory = () => {
        type !== EBoardType.CATEGORY && router.push('/board?type=CATEGORY')
    }

    const handleClickSearch = () => {
        type !== EBoardType.SEARCH && router.push('/board?type=SEARCH')
    }

    return (
        <div className={style.container}>
            <li className={style.menu_list} onClick={handleClickHome}>
                <Image src={type === EBoardType.HOME || type === undefined ? HomeActiveIcon : HomeIcon} width={20}
                       height={20}/>
            </li>
            <li className={style.menu_list} onClick={handleClickCategory}>
                <Image src={type === EBoardType.CATEGORY ? CategoryActiveIcon : CategoryIcon} width={22} height={22}/>
            </li>
            <li className={style.menu_list} onClick={handleClickSearch}>
                <Image src={type === EBoardType.SEARCH ? SearchActiveIcon : SearchIcon} width={20} height={20}/>
            </li>
        </div>
    );
};

export default BoardBottomNav;
