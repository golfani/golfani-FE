import style from './feedNavbar.module.css'
import TagSearch from "./TagSearch";
import FeedStyleTab from "./FeedStyleTab";
import NavbarMenu from "src/components/common/navbar/NavbarMenu";
import NavbarLink from "../common/navbar/NavbarLink";

const FeedNavBar = () : JSX.Element => {
    return (
      <div className={style.container}>
          <div className={style.navbar_box}>
              {/*<span className={style.logo_txt}>DAILY SHOT</span>*/}
              <NavbarLink/>
              <div className={style.feed_box}>
                  <TagSearch/>
                  <FeedStyleTab/>
              </div>
              <NavbarMenu/>
          </div>
      </div>
    );
}

export default FeedNavBar;
