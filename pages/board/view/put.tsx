import BoardNavbar from 'src/components/board/main/BoardNavBar';
import BoardPut from "../../../src/components/board/main/BoardPut";
import {useRouter} from "next/router";

const put = (): JSX.Element => {

    const router = useRouter();
    const { boardData }  = router.query;
    const currenData = JSON.parse(boardData as string);

    return(
        <div>
            <BoardNavbar/>
            <BoardPut boardView={currenData.boardView}/>
        </div>
    )
}

export default put;