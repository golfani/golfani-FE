import style from "./navbarLink.module.css";
import Link from "next/link";
import {useRouter} from "next/router";

const NavbarLink = () : JSX.Element => {
    const router = useRouter();
    const where = router.pathname.split('/')[1];

    return (
        <div className={style.logo_box}>
            <Link href={'/'}>
                <span className={style.logo_txt}>GOLF ANI</span>
            </Link>
            <ul className={style.link_box}>
                <li className={where === 'feed' ? style.list_item_active : style.list_item}>
                    <Link href={'/feed'}>
                        <span>피드</span>
                    </Link>
                </li>
                <li className={where === 'board' ? style.list_item_active : style.list_item}>
                    <Link href={'/board'}>
                        <span>커뮤니티</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default NavbarLink;
