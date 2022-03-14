import style from './feedDetailMenu.module.css';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {useEffect, useState, memo} from "react";
import DetailMenuModal from "src/components/modals/DetailMenuModal";
import {IFeedProps} from "src/domain/Feed";

const FeedDetailMenu = ({feed}: IFeedProps): JSX.Element => {
    const [detailMenuModalOpen, setDetailMenuModalOpen] = useState(false);

    const onOpenModal = () => {
        setDetailMenuModalOpen((detailMenuModalOpen) => true);
    }

    const handleClickMenu = () => {
        onOpenModal();
    }

    return (
        <div className={style.container}>
            <MoreHorizIcon style={{width: '90%', height: '100%'}} className={style.icon} onClick={handleClickMenu}/>
            {detailMenuModalOpen &&
            <DetailMenuModal setModalOpen={setDetailMenuModalOpen} target={feed} type={"FEED"}/>}
        </div>
    );
};

export default memo(FeedDetailMenu);
