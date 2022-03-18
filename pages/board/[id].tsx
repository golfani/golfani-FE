import style from 'styles/board.module.css';
import {useRouter} from "next/router";
import {getBoardView, IBoardData, onClickBoard} from "src/apis/Board";
import {useQuery} from "react-query";
import Navbar from "src/components/common/navbar/Navbar";
import React, {useEffect} from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import {GetServerSideProps, NextPage} from "next";

const Custom404 = dynamic(() => import('pages/404'));
const BoardView = dynamic(() => import('src/components/board/view/BoardView'));

interface IBoardSSRProps {
    board: IBoardData
}

const ViewPage: NextPage<IBoardSSRProps> = ({board}) => {
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
        initialData: board,
        enabled: id !== undefined,
        retry: false
    });

    return (
        <div>
            <Head>
                <title>{board.title}</title>
                <meta name="description" content={board.content}/>
                <meta property="og:title" key="ogtitle" content={board.title}/>
                <meta property="og:description" key="ogdesc" content="골프정보를 공유하는 커뮤니티 페이지 입니다."/>
                <meta property="og:url" key="ogurl"
                      content={`https://golfani.com/board/${boardQuery.data?.id}?type=${boardQuery.data?.boardType}&page=0`}/>
                <meta property="og:image" key="ogimage" content={board.urlList ? board.urlList[0] : "https://golfani.com/og_img.png"}/>
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

export const getServerSideProps: GetServerSideProps<IBoardSSRProps> = async (context) => {
    const id = context.params?.id;
    const response = await getBoardView(id as string);

    return {
        props: {
            board: response
        }
    }
}

export default ViewPage;
