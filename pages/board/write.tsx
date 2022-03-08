import Navbar from "src/components/common/navbar/Navbar";
import BoardWrite from 'src/components/board/write/BoardWrite';
import Head from "next/head";
import {useEffect} from "react";
import {getCookie} from "src/utils/cookieUtil";
import {useRouter} from "next/router";


const write = (): JSX.Element => {
    const router = useRouter();

    useEffect(() => {
        if (!getCookie('userId')) {
            router.push('/login');
        }
    }, []);

    return (
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
