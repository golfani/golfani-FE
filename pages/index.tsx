import Navbar from "src/components/common/navbar/Navbar";
import MobileHome from "src/components/home/MobileHome";
import Home from "src/components/home/Home";
import useDevice from "src/hooks/deviceHook";

const HomePage = (): JSX.Element => {
    const {isMobile} = useDevice();

    return (
        <div>
            <Navbar/>
            {isMobile ? <MobileHome/> : <Home/>}
        </div>
    )
}

export default HomePage;
