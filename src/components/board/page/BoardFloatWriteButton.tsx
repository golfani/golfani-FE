import style from 'src/components/board/page/boardFloatWriteButton.module.css';
import {ITypeProps} from "../BoardMain";
import {getCookie} from "src/utils/cookieUtil";
import {useRouter} from "next/router";

const BoardFloatWriteButton = (boardType : ITypeProps) : JSX.Element => {
    const router = useRouter();
    const userId = getCookie("userId");

    const handleClickButton = () => {
        userId ? router.push(`/board/write?category=${boardType.boardType}`) : router.push('/login');
    }

    return (
        <div className={style.container} onClick={handleClickButton}>
            <span>글쓰기</span>
        </div>
    )
}

export default BoardFloatWriteButton;
