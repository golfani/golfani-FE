import Lottie from 'lottie-web';
import {useEffect, useRef} from "react";

interface ILottie {
    width : number
    height : number
    animationData : object
}

const LottieAnimation = ({width,height,animationData} : ILottie) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(()=> {
        Lottie.loadAnimation({
            container : ref.current!,
            renderer : 'svg',
            loop : true,
            autoplay : true,
            animationData : animationData
        })
    },[])

    return (
        <div style={{width:`${width}px`, height: `${height}px`}} ref={ref}></div>
    );
};

export default LottieAnimation;
