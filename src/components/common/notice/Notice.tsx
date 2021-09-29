import style from './notice.module.css';
import NoticeItem from "./NoticeItem";
import useNotice from "src/store/modules/notice/noticeHook";

const Notice = () : JSX.Element => {
    const {notice} = useNotice();
    return (
        <div className={style.container}>
            {notice.map((item,index)=> {
                if(item.type !== 'MESSAGE')
                    return <NoticeItem key={index} notice={item}/>
            })}
        </div>
    );
};

export default Notice;
