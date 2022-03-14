import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from "@material-ui/icons/Favorite";
import style from './feedLike.module.css';
import {IFeedContent} from "src/apis/Feed";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getFeedLikes, getUserIsFeedLikes, ILikesDto, registerLikes} from "src/apis/Likes";
import {useCallback, memo} from "react";
import {sendAlarmBySocket} from "src/apis/Alarm";
import {getCookie} from "src/utils/cookieUtil";
import {sendFCM} from "src/apis/FirebaseCloudMessage";

interface IFeedLikeProps {
    feed: IFeedContent
}

const FeedLike = ({feed}: IFeedLikeProps): JSX.Element => {
    const queryClient = useQueryClient();
    const mutation = useMutation(() => registerLikes("FEED", feed.id));
    const userId = getCookie('userId');
    const totalLikesQuery = useQuery<number, Error>(['feedLikes', feed.id], () => getFeedLikes(feed.id), {
        staleTime: 1000 * 60
    });
    const userIsFeedLikes = useQuery<ILikesDto, Error>(['isFeedLikes', feed.id], () => getUserIsFeedLikes(feed.id), {
        staleTime: 1000 * 60,
        enabled: userId !== undefined
    });

    const onRegisterLikes = useCallback(async () => {
        try {
            await mutation.mutateAsync();
            try {
                userIsFeedLikes.data?.likes || sendAlarmBySocket('LIKES', feed.userId, '피드를 좋아합니다. ', feed.id, null, 'FEED');
                userIsFeedLikes.data?.likes || await sendFCM('피드를 좋아합니다.', feed.userId);
            } catch (e) {

            }
        } catch (e) {
            console.log(e)
        } finally {
            await queryClient.invalidateQueries(['feedLikes', feed.id]);
            await queryClient.invalidateQueries(['isFeedLikes', feed.id]);
        }
    }, [mutation]);

    const handleClick = async () => {
        await onRegisterLikes();
    }

    return (
        <div className={style.container} onClick={handleClick}>
            {userIsFeedLikes.data?.likes
                ? <FavoriteIcon fontSize={'small'} color={'error'}/>
                : <FavoriteBorderOutlinedIcon fontSize={'small'} color={'error'}/>
            }
            {feed.isLikesActive || feed.userId === userId
                ?
                <div>
                    <span className={style.like_txt}>좋아요</span>
                    <span className={style.like_number_txt}>{` ${totalLikesQuery.data}`}</span>
                </div>
                : null
            }
        </div>
    );
};

export default memo(FeedLike);
