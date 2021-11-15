import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from "@material-ui/icons/Favorite";
import style from './feedLike.module.css';
import {IFeedContent} from "src/apis/Feed";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getFeedLikes, getUserIsFeedLikes, ILikesDto, registerLikes} from "src/apis/Likes";
import {useCallback} from "react";
import {sendAlarmBySocket} from "src/apis/Alarm";

interface IFeedLikeProps {
    feed : IFeedContent
}

const FeedLike = ({feed} : IFeedLikeProps) : JSX.Element => {
    const queryClient = useQueryClient();
    const totalLikesQuery = useQuery<number,Error>(['feedLikes',feed.id], () => getFeedLikes(feed.id),{
        staleTime : 1000 * 60
    })
    const userIsFeedLikes = useQuery<ILikesDto,Error>(['isFeedLikes',feed.id], () => getUserIsFeedLikes(feed.id),{
        staleTime : 1000 * 60
    })
    const mutation = useMutation(()=> registerLikes("FEED",feed.id));

    const onRegisterLikes = useCallback( async ()=> {
        try {
            const response = await mutation.mutateAsync();
            userIsFeedLikes.data?.likes || sendAlarmBySocket('LIKES',feed.userId,'피드를 좋아합니다. ',feed.id,null,'FEED');
        }
        catch (e) {
            console.log(e)
        }
        finally {
            await queryClient.invalidateQueries(['feedLikes', feed.id]);
            await queryClient.invalidateQueries(['isFeedLikes', feed.id]);
        }
    },[mutation])

    const handleClick = async () => {
        await onRegisterLikes();
    }

    return(
        <div className={style.container} onClick={handleClick}>
            {userIsFeedLikes.data?.likes
                ? <FavoriteIcon fontSize={'small'} color={'error'}/>
                : <FavoriteBorderOutlinedIcon fontSize={'small'} color={'error'}/>
            }
            {feed.isLikesActive
                ?
                <div>
                    <span className={style.like_txt}>좋아요 </span>
                    <span className={style.like_number_txt}>{`${totalLikesQuery.data}`}</span>
                </div>
                : <></>
            }
        </div>
    );
};

export default FeedLike;
