import style from 'styles/message.module.css';
import Navbar from "src/components/common/navbar/Navbar";
import MessageMain from "src/components/message/MessageMain";

const Message = () : JSX.Element => {

    return (
        <div className={style.container}>
            <Navbar/>
            <MessageMain/>
        </div>
    );
};

export default Message;
