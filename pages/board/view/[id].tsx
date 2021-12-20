import {useRouter} from "next/router";
import BoardView from "src/components/board/BoardView";
import {getBoardView, onClickBoard} from "src/apis/Board";
import {useQuery} from "react-query";
import Navbar from "src/components/common/navbar/Navbar";
import {useEffect} from "react";

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
    });



    return (
        <div>
            <Navbar/>
            {boardQuery.data && <BoardView boardView={boardQuery.data}/>}
        </div>
    )
}

export default ViewPage;
