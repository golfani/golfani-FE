import style from 'styles/404.module.css';
import LottieAnimation from "src/components/common/Lottie";

const Custom404 = () : JSX.Element => {
    return (
        <div className={style.container}>
            <LottieAnimation width={500}
                             height={300}
                             animationData={require('/public/lottie/lottie_notFound.json')}
            />
            <p className={style.error_txt}>죄송합니다. 해당 페이지를 찾을 수 없습니다.</p>
        </div>
    );
};

export default Custom404;
