import style from './feedAdd.module.css'
import FeedAddPhoto from "./FeedAddPhoto";
import FeedAddContents from "./FeedAddContents";
import {useState} from "react";
import {useRouter} from "next/router";
import Modal from "src/components/modals/Modal";
import useFeedAdd from "src/store/modules/feedAdd/feedAddHook";
import {registerFeed} from "src/apis/Feed";
import LoadingModal from "src/components/modals/LoadingModal";
import {registerTag} from "../../../apis/Tag";

enum FEED_COMPONENT {
    ADD_PHOTO,
    ADD_CONTENTS
}

const FeedAdd = () : JSX.Element => {
    const {feedAddState} = useFeedAdd();
    const router = useRouter();
    const [component, setComponent] = useState<FEED_COMPONENT>(FEED_COMPONENT.ADD_PHOTO);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMsg, setModalMsg] = useState("");
    const [loadingModalOpen, setLoadingModalOpen] = useState(false);

    const onNext = async () => {
        if(component === FEED_COMPONENT.ADD_PHOTO) {
            if(feedAddState.imgList.length > 0) {
                setComponent(FEED_COMPONENT.ADD_CONTENTS);
            }
            else {
                setModalMsg("최소 1장의 사진을 등록해야합니다.");
                setModalOpen(true);
            }
        }
        else if (component === FEED_COMPONENT.ADD_CONTENTS) {
            if(feedAddState.content.trim().length <= 0) {
                setModalMsg("내용을 입력해주세요.")
                setModalOpen(true)
            }
            else {
                try {
                    setLoadingModalOpen(true);
                    const tagResponse = await registerTag(feedAddState.tagList);
                    const feedResponse = await registerFeed(feedAddState);
                    router.push("/feed")
                }
                catch (e) {
                    setModalOpen(false);
                    setModalMsg("잠시후 다시 시도해주세요.");
                    console.log(e);
                }
            }
        }
    }

    const onPrevious = () => {
        component === FEED_COMPONENT.ADD_PHOTO ? router.back() : setComponent(FEED_COMPONENT.ADD_PHOTO);
    }

    const onModalSubmit = () => {
        setModalOpen(false)
    }

    const handleNextButton = () => {
        onNext();
    }

    const handlePreviousButton = () => {
        onPrevious()
    }

    return (
        <div className={style.container}>
            <div>
                <span className={style.main_txt}>피드 작성하기</span>
                {/*<span className={style.sub_txt}>나만의 피드를 만들어 자랑해 보세요</span>*/}
            </div>
            <div className={style.component_box}>
                {component === FEED_COMPONENT.ADD_PHOTO ? <FeedAddPhoto/> : <FeedAddContents/>}
            </div>
            <div className={style.button_box}>
                <button className={style.prev_btn} onClick={handlePreviousButton}>이전</button>
                <button className={style.next_btn} onClick={handleNextButton}>
                    {component === FEED_COMPONENT.ADD_PHOTO ? "다음" : "등록"}
                </button>
            </div>
            <Modal
                open={modalOpen}
                message= {modalMsg}
                onSubmit={onModalSubmit}
            />
            <LoadingModal open={loadingModalOpen}/>
        </div>
    );
};

export default FeedAdd;
