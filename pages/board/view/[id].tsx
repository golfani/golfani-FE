import {useRouter} from "next/router";
import Board_view from "../../../src/components/board/main/view/BoardView";
import {getBoardView} from "../../../src/apis/Board";
import BoardNavbar from "../../../src/components/board/main/BoardNavBar";
import {useQuery} from "react-query";

const ViewPage = () : JSX.Element => {

    const router = useRouter()
    const {id} = router.query;
    const boardQuery = useQuery(['board',id], ()=>getBoardView(id as string), {
        enabled : id!==undefined,
    });

    return (
        <div>
            <BoardNavbar/>
            {boardQuery.data && <Board_view boardView={boardQuery.data}/>}
        </div>
    )
}

export default ViewPage;
