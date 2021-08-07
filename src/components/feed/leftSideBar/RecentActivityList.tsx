import * as faker from "faker";
import RecentActivityItem from "./RecentActivityItem";
import style from './recentActivityList.module.css';

export type RecentActivity = {
    feedImg : string
    user : string
    activity : number
}

const recentActivityItems : RecentActivity[] = [
    {
        user : faker.name.firstName(),
        activity : 0,
        feedImg : faker.image.avatar()
    },
    {
        user : faker.name.firstName(),
        activity : 1,
        feedImg : faker.image.avatar()
    },
    {
        user : faker.name.firstName(),
        activity : 0,
        feedImg : faker.image.avatar()
    },
    {
        user : faker.name.firstName(),
        activity : 1,
        feedImg : faker.image.avatar()
    },
    {
        user : faker.name.firstName(),
        activity : 0,
        feedImg : faker.image.avatar()
    },
]

const RecentActivityList = () : JSX.Element => {
    return (
        <div className={style.container}>
            <div>
                <span className={style.title_txt}>최근 활동기록</span>
            </div>
            <RecentActivityItem items={recentActivityItems}/>
        </div>
    );
};

export default RecentActivityList;