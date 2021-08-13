import style from 'styles/mypage.module.css'
import MyPageNavbar from "src/components/mypage/MyPageNavbar";
import UserProfile from "src/components/mypage/UserProfile";
import UserActivity from "src/components/mypage/UserActivity";
import UserFeed from "src/components/mypage/UserFeed";
import UserItem from "src/components/mypage/UserItem";
import UserInfo from "src/components/mypage/UserInfo";

const MyPage = () : JSX.Element => {
    return (
        <div className={style.container}>
            <MyPageNavbar/>
            <div className={style.main_container}>
                <UserProfile/>
                <UserActivity/>
                <UserFeed/>
                <UserItem/>
                <UserInfo/>
            </div>
        </div>
    );
};

export default MyPage;
