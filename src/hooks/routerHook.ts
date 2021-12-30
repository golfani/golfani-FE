import {useRouter} from "next/router";

const useCustomRouter = () => {
    const router = useRouter();

    const onConflictRoute = (path : string) => {
        /*
            path 에 한글이 포함된경우 asPath, encodeURI 가 다르게 보여짐
            router.asPath encode 하여 비교해야함
         */
        if(router.asPath === encodeURI(path) || router.asPath === path) {
            if(typeof window !== 'undefined') {
                window.location.href = path;
            }
        }
        else {
            router.push(path);
        }
    }

    return {onConflictRoute}
}

export default useCustomRouter;
