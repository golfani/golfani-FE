import Navbar from "src/components/common/navbar/Navbar";
import MobileHome from "src/components/home/MobileHome";
import {useEffect, useState} from "react";
import Home from "src/components/home/Home";

const HomePage = () : JSX.Element => {
    const [isMobileDevice , setIsMobileDevice] = useState(false);

    useEffect(()=> {
        if(window.innerWidth <= 768) {
            setIsMobileDevice(true);
        }
    },[]);

    return (
        <div>
            <Navbar/>
            {isMobileDevice ? <MobileHome/> : <Home/>}
        </div>
    )
}

export default HomePage;
