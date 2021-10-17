import style from 'styles/mypage.module.css'
import Navbar from "src/components/common/navbar/Navbar";
import UserProfile from "src/components/profile/UserProfile";
import UserActivity from "src/components/profile/UserActivity";
import UserPost from "src/components/profile/UserPost";
import {GetServerSideProps} from "next";
import {QueryClient, useQueryClient} from "react-query";
import {getMember, IMember} from "src/apis/Member";
import {dehydrate} from "react-query/hydration";
import {ParsedUrlQuery} from "querystring";
import {useRouter} from "next/router";

export interface IProfileMemberProps {
    member : IMember
}

const Profile = () : JSX.Element => {
    const router = useRouter();
    const {userId} = router.query;
    const member = useQueryClient().getQueryData<IMember>(['member',userId])!!;

    return (
        <div className={style.container}>
            <Navbar/>
            <div className={style.main_container}>
                <UserProfile member={member}/>
                <UserActivity member={member}/>
                <UserPost member={member}/>
            </div>
        </div>
    );
};

interface IParams extends ParsedUrlQuery {
    userId : string
}

export const getServerSideProps : GetServerSideProps = async (context ) => {
    const queryClient = new QueryClient();
    const { userId } = context.params as IParams;
    await queryClient.prefetchQuery(['member',userId],()=> getMember(userId),{
        staleTime : 6000
    });

    return {
        props : {
            dehydrateState : JSON.parse(JSON.stringify(dehydrate(queryClient)))
        }
    }
}

export default Profile;
