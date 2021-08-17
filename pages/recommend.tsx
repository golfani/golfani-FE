import style from 'styles/recommend.module.css';
import GctiInfo from "src/components/recommend/GctiInfo";
import MyPageNavbar from "src/components/mypage/MyPageNavbar";
import RecommendList from "src/components/recommend/RecommendList";
import {useRef} from "react";

const Recommend = () : JSX.Element => {
    const recommendRef = useRef<HTMLDivElement>(null);
    const scrollToRef = () => {
        recommendRef.current?.scrollIntoView({behavior : "smooth"});
    }

    return (
        <div className={style.container}>
            <MyPageNavbar/>
            <div className={style.main_container}>
                <GctiInfo scrollToRef={scrollToRef}/>
                <RecommendList recommendRef={recommendRef}/>
            </div>
        </div>
    );
};

export default Recommend;