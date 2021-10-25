import style from './feedDetailMenu.module.css';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {useCallback, useState} from "react";
import DetailMenuModal from "src/components/modals/DetailMenuModal";
import {IFeedProps} from "src/domain/Feed";

const FeedDetailMenu = ({feed}: IFeedProps): JSX.Element => {
    const [detailMenuModalOpen, setDetailMenuModalOpen] = useState(false);

    const onOpenModal = useCallback(() => {
        setDetailMenuModalOpen((detailMenuModalOpen) => true);
    }, [detailMenuModalOpen])

    const handleClickMenu = () => {
        onOpenModal();
    }

    return (
        <div className={style.container} onClick={handleClickMenu}>
            <MoreHorizIcon/>
            {detailMenuModalOpen && <DetailMenuModal setModalOpen={setDetailMenuModalOpen} target={feed} type={"FEED"}/>}
        </div>
    );
};

export default FeedDetailMenu;
