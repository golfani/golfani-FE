import Navbar from "src/components/common/navbar/Navbar";
import BoardWrite from 'src/components/board/write/BoardWrite';
import Head from "next/head";

const write = (): JSX.Element => {
    return(
        <div>
            <Head>
                <title>골아니 커뮤니티 - 게시글 작성</title>
            </Head>
            <Navbar/>
            <BoardWrite/>
        </div>
    )
}

export default write;
