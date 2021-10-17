import style from './achievements.module.css';
import * as faker from "faker";
import Image from 'next/image';
import HonorIcon from 'public/honor_ico.png';

const Achievements = () : JSX.Element => {
    return (
        <div className={style.container}>
            <div className={style.item_box}>
                <Image className={style.img} src={HonorIcon} width={30} height={30}/>
                <span className={style.achievements_txt}>나는야 프로</span>
            </div>
            <div className={style.item_box}>
                <Image className={style.img} src={HonorIcon} width={30} height={30}/>
                <span className={style.achievements_txt}>나는야 프로</span>
            </div>
        </div>
    );
};

export default Achievements;
