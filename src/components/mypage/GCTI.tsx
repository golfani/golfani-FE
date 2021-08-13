import style from './gcti.module.css';
import Image from 'next/image'
import img from 'public/img.png'

const GCTI = () : JSX.Element => {
    return (
        <div className={style.container}>
            <span className={style.title_txt}>GCTI</span>
            <div className={style.gcti_box}>
                <Image className={style.img} src={img}/>
                <span className={style.gcti_txt}>ESFP</span>
                <span className={style.gcti_sub_txt}>이별에 대한 미련이 없는편<br/>슬퍼하는 시간에 많은 신경을 쓰지 않고<br/>새로운 사람을 만나는데 신경을 씀</span>
            </div>
        </div>
    );
};

export default GCTI;
