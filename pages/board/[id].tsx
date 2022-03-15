import style from 'styles/board.module.css';
import {useRouter} from "next/router";
import {getBoardView, IBoardData, onClickBoard} from "src/apis/Board";
import {useQuery} from "react-query";
import Navbar from "src/components/common/navbar/Navbar";
import React, {useEffect} from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const Custom404 = dynamic(() => import('pages/404'));
const BoardView = dynamic(() => import('src/components/board/view/BoardView'));

const ViewPage = (): JSX.Element => {
    const router = useRouter()
    const {id} = router.query;

    const onLoadView = async () => {
        try {
            await onClickBoard(id as string);
        } catch (e) {

        }
    }

    useEffect(() => {
        id && onLoadView();
    }, [id])

    const boardQuery = useQuery<IBoardData>(['board', id], () => getBoardView(id as string), {
        enabled: id !== undefined,
        retry: false
    });

    return (
        <div>
            <Head>
                <title>{boardQuery.data?.title}</title>
                <meta name="description" content="골프정보를 공유하는 커뮤니티 페이지 입니다."/>
                <meta property="og:title" key="ogtitle" content="골아니 커뮤니티"/>
                <meta property="og:description" key="ogdesc" content="골프정보를 공유하는 커뮤니티 페이지 입니다."/>
                <meta property="og:url" key="ogurl"
                      content={`https://golfani.com/board/${boardQuery.data?.id}?type=${boardQuery.data?.boardType}&page=0`}/>
            </Head>
            <Navbar/>
            {boardQuery.error
                ? <Custom404/>
                :
                <div className={style.main_box}>
                    {boardQuery.data && <BoardView board={boardQuery.data}/>}
                </div>
            }
        </div>
    )
}

export default ViewPage;
