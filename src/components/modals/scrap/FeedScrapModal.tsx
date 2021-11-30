import style from "./scrapModal.module.css";
import ArrowBackIosNewIcon from "@material-ui/icons/ArrowBackIosNew";
import {useInfiniteQuery} from "react-query";
import {getFeedScrap, IScrapDto} from "src/apis/Scrap";
import {useEffect, useRef, useState} from "react";
import {IPages} from "src/domain/Page";
import {getFeedOne, IFeedContent} from "src/apis/Feed";
import {handleClickRefOutSide} from "src/utils/clickUtil";
import {LOW_LEVEL_FIRST_PICTURE} from "src/domain/Picture";
import FeedModal from "src/components/modals/feed/FeedModal";

interface IFeedScrapModalProps {
    setModalOpen : (state : boolean) => void
}

const FeedScrapModal = (props : IFeedScrapModalProps) : JSX.Element => {
    const allFeedScrapQuery = useInfiniteQuery<IPages<IScrapDto>>(['scrapAllFeed'],() => getFeedScrap());
    const [scrapFeed, setScrapFeed] = useState<IFeedContent[]>([]);
    const feedScrapModalRef = useRef<HTMLDivElement>(null);
    const [imgWidth, setImgWidth] = useState(200);
    const [isClose, setIsClose] = useState(false);
    const [feedModalOpen, setFeedModalOpen] = useState(false);
    const [feed, setFeed] = useState<IFeedContent>();

    const onLoadFeedData = () => {
        let temp : IFeedContent[] = [];

        allFeedScrapQuery.data?.pages.map((page)=> (
            page.content.map(async (scrap)=> {
                try {
                    const feed = await getFeedOne(scrap.refId);
                    temp = temp.concat(feed);
                    setScrapFeed(temp);
                }
                catch (e) {
                    
                }
            })
        ))
    }

    const onCloseModal = () => {
        props.setModalOpen(false);
    }

    const onCloseModalForMobile = () => {
        setIsClose(true);
        setTimeout(()=> {
            onCloseModal();
        },300);
    }

    const handleClickBackIcon = () => {
        onCloseModalForMobile();
    }

    const handleClickFeedImg = (feed : IFeedContent) => {
        setFeedModalOpen(true);
        setFeed(feed);
    }

    useEffect(() => {
        onLoadFeedData();
    },[allFeedScrapQuery.isSuccess]);

    useEffect(()=> {
        const resizeListener = () => {
            if(window.innerWidth < 768) {
                setImgWidth((window.innerWidth) / 3);
            }
            else if(window.screen.width < 768) {
                setImgWidth((window.innerWidth) / 3);
            }
            else {
                setImgWidth(200);
            }
        }
        resizeListener();
        window.addEventListener('resize',resizeListener);
        return () => window.removeEventListener('resize',resizeListener);
    },[]);

    handleClickRefOutSide(feedScrapModalRef,onCloseModal);

    return (
        <div className={isClose ? style.modal_close : style.modal}>
            <div className={style.scrap_box} ref={feedScrapModalRef}>
                <div className={style.title_box}>
                    <div className={style.title_icon} onClick={handleClickBackIcon}>
                        <ArrowBackIosNewIcon/>
                    </div>
                    <span className={style.title_txt}>피드 스크랩</span>
                </div>
                <div className={style.all_feed_scrap_box}>
                    {scrapFeed.map((feed) => (
                        <img
                            key={feed.id}
                            src={feed.urlList[LOW_LEVEL_FIRST_PICTURE]}
                            style={{width : imgWidth, height : imgWidth as number}}
                            className={style.feed_img}
                            onClick={()=>handleClickFeedImg(feed)}
                        />
                    ))}
                </div>
                {feedModalOpen && <FeedModal feed={feed!} setModalOpen={setFeedModalOpen}/>}
            </div>
        </div>
    );
};

export default FeedScrapModal;
