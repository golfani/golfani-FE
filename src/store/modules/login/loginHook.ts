import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../index";
import {loginAsync} from './login';
import {LoginMember} from 'src/apis/Member';

const useLogin = () => {
    const loading = useSelector((state : RootState)=> state.login.loading);
    const isLoggedIn = useSelector((state : RootState)=> state.login.isLoggedIn);
    const error = useSelector((state : RootState)=> state.login.error);

    const dispatch = useDispatch();

    const loginMember = (member : LoginMember) => {
        dispatch(loginAsync(member));
    }

    return {loginMember, loading, isLoggedIn, error}
}

export default useLogin;
