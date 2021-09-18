import {useRouter} from "next/router";
import {useEffect} from "react";

const Routing = () : JSX.Element => {
    const router = useRouter();

    useEffect(()=> {
        router.push('/feed');
    })

    return (
        <div>

        </div>
    );
};

export default Routing