import Navbar from "src/components/common/navbar/Navbar";
import BoardWrite from 'src/components/board/write/BoardWrite';

const write = (): JSX.Element => {
    return(
        <div>
            <Navbar/>
            <BoardWrite/>
        </div>
    )
}

export default write;
