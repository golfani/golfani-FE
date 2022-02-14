import style from 'styles/message.module.css';
import Navbar from "src/components/common/navbar/Navbar";
import MessageMain from "src/components/message/MessageMain";
import Head from "next/head";

const Message = () : JSX.Element => {

    return (
        <div className={style.container}>
            <Head>
                <title>골아니 메세지</title>
            </Head>
            <Navbar/>
            <MessageMain/>
        </div>
    );
};

export default Message;
