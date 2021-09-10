import {RootState} from "../index";
import {useDispatch, useSelector} from "react-redux";
import {tagAsync,initTag} from "./tag";

const useTag = () => {
    const data = useSelector((state : RootState) => state.tag.data);
    const loading = useSelector((state : RootState) => state.tag.loading);
    const error = useSelector((state : RootState) => state.tag.error);

    const dispatch = useDispatch();

    const onGetTagList = (payload : string) => {
        dispatch(tagAsync(payload));
    }

    const onInitTagList = () => {
        dispatch(initTag());
    }

    return {data,loading,error,onGetTagList,onInitTagList};
}

export default useTag;
