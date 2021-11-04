import Navbar from "src/components/common/navbar/Navbar";
import style from 'styles/index.module.css';
import {useRouter} from "next/router";

const Home = () : JSX.Element => {
    const router = useRouter();

    const onRoutePage = (page : string) => {
        router.push(`/${page}`);
    }

    const handleClickLinkButton = (page : string) => {
        onRoutePage(page);
    }
    return (
        <div>
            <Navbar/>
            <div className={style.main_box}>
                <div className={style.sub_box}>
                    <div>
                        <p className={style.main_txt}>나만의 골프라이프<br/>GOLF ANI</p>
                        <p className={style.sub_txt}>나에게 알맞는 골프라이프를 즐겨보세요.</p>
                    </div>
                    <div className={style.content_box}>
                    </div>
                </div>
            </div>
            <div className={style.feed_box}>
                <div className={style.sub_box}>
                    <div className={style.content_box}>
                    </div>
                    <div className={style.txt_box}>
                        <p className={style.main_txt}>오늘의 골프는<br/>어떠셨나요?</p>
                        <p className={style.sub_txt}>눈치보지 않고 마음껏 골프라이프를 공유해 보세요.</p>
                        <button className={style.link_btn} onClick={()=>handleClickLinkButton('feed')}>피드</button>
                    </div>
                </div>
            </div>
            <div className={style.board_box}>
                <div className={style.sub_box}>
                    <div className={style.txt_box}>
                        <p className={style.main_txt}>정보공유의 중심<br/>GOLF ANI</p>
                        <p className={style.sub_txt}>다른사람들과 골프얘기를 나누어 보세요.</p>
                        <button className={style.link_btn} onClick={()=>handleClickLinkButton('board')}>커뮤니티</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
