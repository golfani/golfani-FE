import style from 'styles/board.module.css';
import {useRouter} from "next/router";
import {getBoardView, onClickBoard} from "src/apis/Board";
import {useQuery} from "react-query";
import Navbar from "src/components/common/navbar/Navbar";
import {useEffect} from "react";
import BoardView from "src/components/board/view/BoardView";
import Custom404 from "../404";

const ViewPage = () : JSX.Element => {
    const router = useRouter()
    const {id} = router.query;

    const onLoadView = async () => {
        try {
            const response = await onClickBoard(id as string);
            //await queryClient.invalidateQueries(['board', id]);
        }
        catch (e) {

        }
    }

    useEffect(() => {
        onLoadView();
    }, [])

    const boardQuery = useQuery(['board', id], () => getBoardView(id as string), {
        enabled: id !== undefined,
        retry : false
    });

    return (
        <div>
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
