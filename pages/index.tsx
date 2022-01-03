import Navbar from "src/components/common/navbar/Navbar";
import MobileHome from "src/components/home/MobileHome";
import Home from "src/components/home/Home";
import {isMobile} from "src/utils/detectDevice";

const HomePage = () : JSX.Element => {

    return (
        <div>
            <Navbar/>
            {isMobile() ? <MobileHome/> : <Home/>}
        </div>
    )
}

export default HomePage;
