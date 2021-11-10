import {useRouter} from "next/router";
import BoardView from "../../../src/components/board/main/view/BoardView";
import {getBoardView} from "../../../src/apis/Board";
import {useQuery} from "react-query";
import Navbar from "../../../src/components/common/navbar/Navbar";

const ViewPage = () : JSX.Element => {

    const router = useRouter()
    const {id} = router.query;
    const boardQuery = useQuery(['board',id], ()=>getBoardView(id as string), {
        enabled : id !== undefined,
    });

    return (
        <div>
            <Navbar/>
            {boardQuery.data && <BoardView boardView={boardQuery.data}/>}
        </div>
    )
}

export default ViewPage;