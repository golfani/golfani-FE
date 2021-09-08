import style from './feedReplyAdd.module.css';
import GitHubIcon from '@material-ui/icons/GitHub';
import {IFeedReplyAddProps} from "src/domain/Reply";
import FeedReplyAddInput from "./FeedReplyAddInput";

const FeedReplyAdd =({feedId} : IFeedReplyAddProps) => {
    return(
        <div className={style.container}>
            <GitHubIcon className={style.icon}/>
            <FeedReplyAddInput feedId={feedId} refId={null} refUser={null}/>
        </div>
    );
};

export default FeedReplyAdd;
