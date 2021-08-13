import style from './achievements.module.css';
import AchievementsItem from "./AchievementsItem";

const Achievements = () : JSX.Element => {
    return (
        <div className={style.container}>
            <span className={style.title_txt}>업적</span>
            <AchievementsItem/>
        </div>
    );
};

export default Achievements