import BoardNavbar from 'src/components/board/main/BoardNavBar';
import BoardWrite from 'src/components/board/main/BoardWrite';

const write = (): JSX.Element => {
    return(
        <div>
            <BoardNavbar/>
            <BoardWrite/>
        </div>
    )
}

export default write;