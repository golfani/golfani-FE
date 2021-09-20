import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from "@material-ui/icons/Favorite";
import style from './feedLike.module.css';
import {IFeedContent} from "src/apis/Feed";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getFeedLikes, getUserIsFeedLikes, ILikesDto, registerLikes} from "src/apis/Likes";
import {useCallback} from "react";

interface IFeedLikeProps {
    feed : IFeedContent
}

const FeedLike = ({feed} : IFeedLikeProps) : JSX.Element => {
    const queryClient = useQueryClient();
    const totalLikesQuery = useQuery<number,Error>(['feedLikes',feed.id], () => getFeedLikes(feed.id),{
        staleTime : 1000 * 60
    })
    const userIsFeedLikes = useQuery<ILikesDto,Error>(['isFeedLikes',feed.id], () => getUserIsFeedLikes("gudwh14",feed.id),{
        staleTime : 1000 * 60
    })
    const mutation = useMutation(()=> registerLikes("FEED",feed.id,"gudwh14"));

    const onRegisterLikes = useCallback( async ()=> {
        try {
            const response = await mutation.mutateAsync();
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
            <span className={style.like_number_txt}>{totalLikesQuery.data}</span>
        </div>
    );
};

export default FeedLike;
