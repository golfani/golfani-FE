import style from "./navbarLink.module.css";
import Link from "next/link";
import {useRouter} from "next/router";

const NavbarLink = () : JSX.Element => {
    const router = useRouter();
    const where = router.pathname.split('/')[1];

    const onRoutePage = (page : string) => {
        if(router.asPath === `/${page}`) {
            if(typeof window !== 'undefined') {
                window.location.href = `/${page}`;
            }
        }
        else {
            router.push(`/${page}`);
        }
    }

    const handleClickLinkButton = (page : string) => {
        onRoutePage(page);
    }

    return (
        <div className={style.logo_box}>
            <Link href={'/'}>
                <span className={style.logo_txt}>GOLF ANI</span>
            </Link>
            <ul className={style.link_box}>
                <li className={where === 'feed' ? style.list_item_active : style.list_item} onClick={()=>handleClickLinkButton('feed')}>
                    <span>피드</span>
                </li>
                <li className={where === 'board' ? style.list_item_active : style.list_item} onClick={()=>handleClickLinkButton('board')}>
                    <span>커뮤니티</span>
                </li>
            </ul>
        </div>
    );
};

export default NavbarLink;
