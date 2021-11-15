import style from './scrapModal.module.css';
import ArrowBackIosNewIcon from '@material-ui/icons/ArrowBackIosNew';
import {useQuery} from "react-query";
import {getFeedScrap, getPostScrap, IScrapDto} from "src/apis/Scrap";
import {IPages} from "src/domain/Page";
import {useEffect, useRef, useState} from "react";
import {getFeedOne, IFeedContent} from "src/apis/Feed";
import {handleClickRefOutSide} from "src/utils/clickUtil";
import {bodyScrollActionForModal} from "src/utils/scrollUtil";
import FeedScrapModal from "./FeedScrapModal";
import {LOW_LEVEL_FIRST_PICTURE} from "src/domain/Picture";

interface IScrapModalProps {
    setModalOpen : (state : boolean) => void
}

const ScrapModal = (props : IScrapModalProps) : JSX.Element => {
    const scrapFeedQuery = useQuery<IPages<IScrapDto>>('scrapFeed',() => getFeedScrap(0,3));
    const scrapPostQuery = useQuery<IPages<IScrapDto>>('scrapPost', () => getPostScrap(0,10));
    const scrapModalRef = useRef<HTMLDivElement>(null);
    const [isClose, setIsClose] = useState(false);
    const [scrapFeed, setScrapFeed] = useState<IFeedContent[]>([]);
    const [imgWidth, setImgWidth] = useState(200);
    const [allFeedScrapModalOpen, setAllFeedScrapModalOpen] = useState(false);
    const [allPostScrapModalOpen, setAllPostScrapModalOpen] = useState(false);

    const onLoadFeedData = () => {
        let temp : IFeedContent[] = [];

        scrapFeedQuery.data?.content.map(async (scrap)=> {
            try {
                const feed = await getFeedOne(scrap.refId);
                temp = temp.concat(feed);
                setScrapFeed(temp);
            }
            catch (e) {

            }
        });
    }

    const onCloseModal = () => {
        props.setModalOpen(false);
    }

    const onCloseModalForMobile = () => {
        setIsClose(true);
        setTimeout(()=> {
            onCloseModal();
        },300)
    }

    const handleClickBackIcon = () => {
        onCloseModalForMobile();
    }

    const handleClickAllFeedScrap = () => {
        setAllFeedScrapModalOpen(true);
    }

    const handleClickAllPostScrap = () => {
        setAllPostScrapModalOpen(true);
    }

    useEffect(()=> {
        onLoadFeedData();
    },[scrapFeedQuery.isSuccess]);

    useEffect(()=> {
        const resizeListener = () => {
            if(window.innerWidth < 768) {
                setImgWidth((window.innerWidth - 30) / 3);
            }
            else if(window.screen.width < 768) {
                setImgWidth((window.innerWidth - 30) / 3);
            }
            else {
                setImgWidth(200);
            }
        }
        resizeListener();
        window.addEventListener('resize',resizeListener);
        return () => window.removeEventListener('resize',resizeListener);
    },[]);

    handleClickRefOutSide(scrapModalRef,onCloseModal);
    bodyScrollActionForModal();

    return (
        <div className={isClose ? style.modal_close : style.modal}>
            <div className={style.scrap_box} ref={scrapModalRef}>
                <div className={style.title_box}>
                    <div className={style.title_icon} onClick={handleClickBackIcon}>
                        <ArrowBackIosNewIcon/>
                    </div>
                    <span className={style.title_txt}>스크랩</span>
                </div>
                <div className={style.content_container}>
                    <div className={style.content_box}>
                        <div className={style.content_title_box}>
                            <span className={style.content_title_txt}>피드</span>
                            <span className={style.content_all_txt} onClick={handleClickAllFeedScrap}>전체</span>
                        </div>
                        <div className={style.feed_scrap_box}>
                            {scrapFeedQuery.data?.empty
                                ?
                                <span className={style.no_scrap_txt}>스크랩한 컨텐츠가 존재하지 않습니다</span>
                                :
                                scrapFeed.map((feed)=> (
                                    <img
                                        key={feed.id}
                                        style={{width : imgWidth, height : imgWidth as number}}
                                        className={style.feed_img}
                                        src={feed.urlList[LOW_LEVEL_FIRST_PICTURE]}
                                        onClick={handleClickAllFeedScrap}
                                    />
                                ))
                            }
                        </div>
                    </div>
                    <div className={style.content_box}>
                        <div className={style.content_title_box}>
                            <span className={style.content_title_txt}>게시글</span>
                            <span className={style.content_all_txt}>전체</span>
                        </div>
                        <div className={style.post_scrap_box}>
                            {scrapPostQuery.data?.empty
                                ?
                                <span className={style.no_scrap_txt}>스크랩한 컨텐츠가 존재하지 않습니다</span>
                                :
                                <span>데이터 존재</span>
                            }
                        </div>
                    </div>
                </div>
                {allFeedScrapModalOpen && <FeedScrapModal setModalOpen={setAllFeedScrapModalOpen}/>}
            </div>
        </div>
    );
};

export default ScrapModal;
