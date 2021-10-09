import style from './chatInput.module.css';
import {useState} from "react";

const ChatInput = () : JSX.Element => {
    const [chatInputText, setChatInputText] = useState("");

    return (
        <div className={style.container}>
            <form className={style.form}>
                <textarea className={style.input} value={chatInputText} onChange={(e)=>{setChatInputText(e.target.value)}}/>
                <button className={style.send_button} disabled={!chatInputText}>전송</button>
            </form>
        </div>
    );
};

export default ChatInput;
