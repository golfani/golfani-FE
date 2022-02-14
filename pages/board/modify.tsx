import BoardPut from "src/components/board/BoardPut";
import {useRouter} from "next/router";
import Navbar from "src/components/common/navbar/Navbar";
import {useQuery} from "react-query";
import {getBoardView, IBoardData} from "src/apis/Board";
import {useEffect} from "react";
import {getCookie} from "src/utils/cookieUtil";
import Head from "next/head";

const Modify = (): JSX.Element => {
    const userId = getCookie('userId');
    const router = useRouter();
    const {boardNo} = router.query;
    const boardQuery = useQuery<IBoardData>(['board',boardNo], () => getBoardView(boardNo as string));

    useEffect(()=> {
        if(boardQuery.isSuccess) {
            if (boardQuery.data?.userId !== userId) {
                router.push('/board');
                alert('잘못된 접근입니다.');
            }
        }
    },[boardQuery.isSuccess]);

    return(
        <div>
            <Head>
                <title>골아니 커뮤니티 - 게시글 수정</title>
            </Head>
            <Navbar/>
            {boardQuery.data && <BoardPut board={boardQuery.data}/>}
        </div>
    )
}

export default Modify;
