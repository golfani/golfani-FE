import style from 'styles/message.module.css';
import Navbar from "src/components/common/navbar/Navbar";
import Head from "next/head";
import ChatRoomList from "src/components/message/ChatRoomList";

const Index = (): JSX.Element => {

    return (
        <div className={style.container}>
            <Head>
                <title>골아니 메세지</title>
            </Head>
            <Navbar/>
            <div className={style.box}>
                <ChatRoomList/>
                <div className={style.empty_chat_box}>
                    <span className={style.title_txt}>메세지</span>
                    <span className={style.show_txt}>사용자들과 채팅을 시작해보세요!</span>
                </div>
            </div>
        </div>
    );
};

export default Index;
