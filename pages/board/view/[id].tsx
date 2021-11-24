import {useRouter} from "next/router";
import BoardView from "src/components/board/main/view/BoardView";
import {getBoardView, onClickBoard} from "src/apis/Board";
import {useQuery, useQueryClient} from "react-query";
import Navbar from "src/components/common/navbar/Navbar";
import {useEffect} from "react";

const ViewPage = () : JSX.Element => {
    const router = useRouter()
    const {id} = router.query;
    const queryClient = useQueryClient();

    const checkFun = async () => {
        const response = await onClickBoard(id as string);
        console.log(response);
        if (response.status === 200) await queryClient.invalidateQueries(['board', id]);
    }

    useEffect(() => {
        checkFun();
    }, [])

    const boardQuery = useQuery(['board', id], () => getBoardView(id as string), {
        enabled: id !== undefined,
    });

    return (
        <div>
            <Navbar/>
            {boardQuery.data && <BoardView boardView={boardQuery.data}/>}
        </div>
    )
}

export default ViewPage;
