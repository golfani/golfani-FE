import {useEffect, useRef, useState} from "react";

interface ILazyImageProps {
    src: string
    className?: string
    onClick?: () => void
    onDoubleClick?: () => void
    id?: string
}

const LazyImage = ({src, className, id, onClick, onDoubleClick}: ILazyImageProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const observer = useRef<IntersectionObserver>();

    useEffect(() => {
        observer.current = new IntersectionObserver(intersectionObserver);
        ref.current && observer.current?.observe(ref.current);
    }, []);

    const intersectionObserver = (entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                io.unobserve(entry.target);
                setIsLoading(true);
            }
        })
    }

    return (
        <div ref={ref}>
            <img src={isLoading ? src : '/icon/loading.png'} id={id} className={className} onClick={onClick}
                 onDoubleClick={onDoubleClick} alt={'img'}/>
        </div>
    )
}

export default LazyImage;
