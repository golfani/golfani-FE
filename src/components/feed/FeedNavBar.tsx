import style from './feedNavbar.module.css'
import FeedSearch from "./FeedSearch";
import FeedStyleTab from "./FeedStyleTab";
import NavbarMenu from "src/components/common/navbar/NavbarMenu";
import NavbarLink from "../common/navbar/NavbarLink";

const FeedNavBar = () : JSX.Element => {
    return (
      <div className={style.container}>
          <div className={style.navbar_box}>
              <NavbarLink/>
              <div className={style.feed_box}>
                  <FeedSearch/>
                  <FeedStyleTab/>
              </div>
              <NavbarMenu/>
          </div>
      </div>
    );
}

export default FeedNavBar;
