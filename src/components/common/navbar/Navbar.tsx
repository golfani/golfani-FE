import style from "./navbar.module.css";
import NavbarMenu from "./NavbarMenu";
import NavbarLink from "./NavbarLink";

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

export default Navbar;
