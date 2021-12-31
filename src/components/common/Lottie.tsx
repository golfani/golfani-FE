import Lottie from 'lottie-web';
import {useEffect, useRef} from "react";

interface ILottie {
    width : number
    height : number
    animationData : object
    speed? : number
}

const LottieAnimation = ({width,height,animationData,speed = 1} : ILottie) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(()=> {
        Lottie.loadAnimation({
            container : ref.current!,
            renderer : 'svg',
            loop : true,
            autoplay : true,
            animationData : animationData,
        })
        Lottie.setSpeed(speed);
    },[])

    return (
        <div style={{width:`${width}px`, height: `${height}px`}} ref={ref}></div>
    );
};

export default LottieAnimation;
