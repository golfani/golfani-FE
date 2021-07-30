import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import style from './navbar.module.css'

const NavBar = () : JSX.Element => {

    return (
      <div className={style.container}>
          <div>
              <div className={style.nav_box}>
                  <span className={style.logo_txt}>DAILY SHOT</span>
                  <div className={style.icon_box}>
                      <AccountCircleOutlinedIcon className={style.icon}/>
                      <FavoriteBorderOutlinedIcon className={style.icon}/>
                  </div>
              </div>
          </div>
      </div>
    );
}

export default NavBar;