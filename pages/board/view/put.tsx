import BoardNavbar from 'src/components/board/BoardNavBar';
import BoardPut from "../../../src/components/board/BoardPut";
import {useRouter} from "next/router";
import Navbar from "../../../src/components/common/navbar/Navbar";

const put = (): JSX.Element => {

    const router = useRouter();
    const { boardData }  = router.query;
    console.log(boardData);
    const currenData = JSON.parse(boardData as string);

    return(
        <div>
            <Navbar/>
            <BoardPut boardView={currenData}/>
        </div>
    )
}

export default put;