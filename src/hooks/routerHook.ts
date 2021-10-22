import {useRouter} from "next/router";

const useCustomRouter = () => {
    const router = useRouter();

    const onConflictRoute = (path : string) => {
        if(router.asPath === path) {
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
