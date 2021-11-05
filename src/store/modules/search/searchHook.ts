import {RootState} from "../index";
import {useDispatch, useSelector} from "react-redux";
import {tagAsync,initTag,searchUserAsync,initSearchUser} from "./search";

const useSearch = () => {
    const searchTag = useSelector((state : RootState) => state.search.tag.data);
    const searchUser = useSelector((state : RootState) => state.search.user.data);

    const dispatch = useDispatch();

    const onGetTagList = (payload : string) => {
        dispatch(tagAsync(payload));
    }

    const onInitTagList = () => {
        dispatch(initTag());
    }

    const onGetUserList = (payload : string) => {
        dispatch(searchUserAsync(payload));
    }

    const onInitSearchUserList = () => {
        dispatch(initSearchUser());
    }

    return {searchTag,searchUser,onGetTagList,onInitTagList,onGetUserList,onInitSearchUserList};
}

export default useSearch;
