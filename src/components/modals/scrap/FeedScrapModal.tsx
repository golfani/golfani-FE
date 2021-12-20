import style from "./scrapModal.module.css";
import ArrowBackIosNewIcon from "@material-ui/icons/ArrowBackIosNew";
import {useInfiniteQuery, useMutation, useQueryClient} from "react-query";
import {deleteScrap, getFeedScrap, IScrapDto} from "src/apis/Scrap";
import {useEffect, useRef, useState} from "react";
import {IPages} from "src/domain/Page";
import {getFeedOne, IFeedContent} from "src/apis/Feed";
import {handleClickRefOutSide} from "src/utils/clickUtil";
import {LOW_LEVEL_FIRST_PICTURE} from "src/domain/Picture";
import FeedModal from "src/components/modals/feed/FeedModal";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";

interface IFeedScrapModalProps {
    setModalOpen : (state : boolean) => void
}

interface IScrapFeed {
    scrapId : number
    feed : IFeedContent
}

const FeedScrapModal = (props : IFeedScrapModalProps) : JSX.Element => {
    const allFeedScrapQuery = useInfiniteQuery<IPages<IScrapDto>>('scrapAllFeed',() => getFeedScrap());
    const [scrapFeed, setScrapFeed] = useState<IScrapFeed[]>([]);
    const feedScrapModalRef = useRef<HTMLDivElement>(null);
    const [imgWidth, setImgWidth] = useState(200);
    const [isClose, setIsClose] = useState(false);
    const [feedModalOpen, setFeedModalOpen] = useState(false);
    const [feed, setFeed] = useState<IFeedContent>();
    const [editMode, setEditMode] = useState(false);
    const [editFeed, setEditFeed] = useState<number[]>([]);
    const deleteScrapMutate = useMutation((id : number) => deleteScrap(id));
    const queryClient = useQueryClient();

    const onLoadFeedData = async () => {
        allFeedScrapQuery.data?.pages.map(async (page)=> {
            const reduceResponse =  await page.content.reduce(async (prevPromise : any, data) => {
                const prevResponse = await prevPromise;
                const response = await getFeedOne(data.refId);
                const scrapFeed : IScrapFeed = {
                    scrapId : data.id!,
                    feed : response
                }
                return [...prevResponse, scrapFeed];
            },[])
            setScrapFeed(reduceResponse);
        });
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

    const handleClickFeedImg = (scrapFeed : IScrapFeed) => {
        if(editMode) {
            onSelectFeedItem(scrapFeed.scrapId);
        }
        else {
            setFeedModalOpen(true);
            setFeed(scrapFeed.feed);
        }
    }

    const onInitEdit = () => {
        setEditFeed([]);
        setEditMode(false);
    }

    const handleClickEditButton = () => {
        if(editMode) {
            onInitEdit();
        }
        else {
            setEditMode(true);
        }
    }

    const onSelectFeedItem = (id : number) => {
        const index = editFeed.indexOf(id);
        if(index === -1) {
            setEditFeed(editFeed.concat(id));
        }
        else {
            setEditFeed(editFeed.filter(item => item !== id));
        }
    }

    const isSelectedFeed = (id : number) : boolean => {
        return editFeed.includes(id);
    }

    const handleClickDeleteButton = async () => {
        try {
            editFeed.map((scrapId)=> {
                const response = deleteScrapMutate.mutateAsync(scrapId);
            });
        }
        catch (e) {

        }
        finally {
            await queryClient.invalidateQueries('scrapAllFeed');
            await queryClient.invalidateQueries('scrapFeed');
            onInitEdit();
        }
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
                setImgWidth(630 / 3);
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
                    <button className={style.edit_btn} onClick={handleClickEditButton}>{editMode ? '취소' : '편집'}</button>
                </div>
                <div className={style.all_feed_scrap_box}>
                    {scrapFeed.map((scrapFeed) => (
                        <div className={style.img_box} key={scrapFeed.feed.id} style={{width : imgWidth, height : imgWidth as number}}>
                            <img
                                src={scrapFeed.feed.urlList[LOW_LEVEL_FIRST_PICTURE]}
                                alt={'feedImg'}
                                style={{width : imgWidth, height : imgWidth as number}}
                                className={style.feed_img}
                                onClick={()=>handleClickFeedImg(scrapFeed)}
                            />
                            {editMode
                                ?
                                    <div className={style.check_icon}>
                                        {isSelectedFeed(scrapFeed.scrapId) && <CheckRoundedIcon style={{fontSize : 16}}/>}
                                    </div>
                                :
                                null
                            }
                        </div>
                    ))}
                </div>
                {editMode && <div className={style.select_box}>
                    <span className={style.select_txt}>{editFeed.length}개 피드 선택됨</span>
                    <button className={style.delete_btn} onClick={handleClickDeleteButton}>삭제</button>
                </div>
                }
                {feedModalOpen && <FeedModal feed={feed!} setModalOpen={setFeedModalOpen}/>}
            </div>
        </div>
    );
};

export default FeedScrapModal;
