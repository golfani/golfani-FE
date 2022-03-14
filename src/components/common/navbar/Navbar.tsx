import style from "./navbar.module.css";
import NavbarMenu from "./NavbarMenu";
import NavbarLink from "./NavbarLink";
import {memo} from "react";

const Navbar = () : JSX.Element => {

    return (
        <div className={style.container}>
            <div className={style.header_box}>
                <NavbarLink/>
                <NavbarMenu/>
            </div>
        </div>
    );
};

export default memo(Navbar);
