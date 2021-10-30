import style from 'src/components/board/main/boardWrite.module.css';
import React, { useState } from 'react';
import {registerBoard} from 'src/apis/Board';
import {getCookie} from "../../../utils/cookieUtil";
import {useRouter} from "next/router";
import Modal from "../../modals/Modal";
import {EType} from "../../../domain/board";

export interface boardDTO {
    userId : string,
    boardType: EType,
    content : string,
    title : string
}

const BoardWrite = (): JSX.Element => {
    const getUserId = getCookie('userId');
    const router = useRouter(); //
    const [openModal, setOpenModal] = useState(false);
    const [modalMsg, setModalMsg] = useState("");

    const setMsg = (msg : string) => {
        setOpenModal(true);
        setModalMsg(msg);
    }

    const [inputs , setInputs] = useState<boardDTO>({
        userId : getUserId,
        boardType: EType.FREE,
        content : '',
        title : ''
    })

    const {userId, content, title}  = inputs;

    const onChange = (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value , name } = e.target;
        setInputs({
            ...inputs,
            [name] : value // 해당하는 title, content, type, userId 의 값을 변경 한다.
        });
    }

    const [imgList, setImgList] = useState<Array<File>>([]);
    const [fileURLs,setFileURLs] = useState<Array<string>>([]);

    const handleChangeFile = (e: any) => {
        const fileArr =  e.target.files;
        const fileUrls = Array<string>();
        for(let i =0 ; i < fileArr.length; i++){
            const fileURL = URL.createObjectURL(fileArr[i]); // 미리보기를 위한 변수화
            fileUrls.push(fileURL);
        }
        setFileURLs(fileUrls);
        setImgList(fileArr);
    }

    const handleOnSummit = async () => {

        if(inputs.title.length <= 0)
        {
            setMsg("제목을 입력해주세요");
        }
        else if(inputs.content.length <= 0){
            setMsg("내용을 입력해주세요");
        }
        else {
            console.log(imgList);
            try{
                const response = await registerBoard(inputs, imgList);
                await router.push('/board');
            }catch (e) {
                console.log(e.response);
            }
        }
    }

    return(
        <div className={style.container}>
            <div className={style.write_wrap}>
                <div className={style.board_write}>
                    <div className={style.title}>
                        <textarea className={style.titleTextArea} placeholder="제목을 입력해 주세요." name = "title" value={title} onChange={onChange}> </textarea>
                    </div>
                    <div className={style.menu_wrap}>
                        <input type="radio" id={EType.FREE} value="FREE" name="boardType"  onChange={onChange}/>자유게시판
                        <input type="radio" id={EType.TRADE} value ="TRADE" name="boardType" onChange={onChange}/>거래게시판
                        <input type="radio" id={EType.TRADE} value="TIP" name="boardType" onChange={onChange}/>TIP게시판
                        <input type="radio" id={EType.ANONYMOUS} value="ANONYMOUS" name="boardType" onChange={onChange}/>익명게시판
                    </div>
                    <div className={style.info}>
                            <span className={style.writer}>글쓴이</span>
                            <span className={style.userId}>{userId}</span>
                    </div>
                    <div className={style.content_wrap}>
                        <div className={style.content}>
                            <textarea className={style.contentTextarea} placeholder="내용 입력을 입력해 주세요" name="content" value = {content} onChange={onChange}></textarea>
                        </div>
                        <div className={style.upload}>
                            <input
                                className={style.file_input}
                                type="file"
                                multiple
                                id="input-file"
                                accept =".jpg, .jpeg, .png"
                                onChange={handleChangeFile}
                            />
                            <div className={style.preview}>
                                {fileURLs.map((img) => {
                                        return (
                                            <img className={style.preview_img} src={img}></img>
                                        )
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.bt_wrap}>
                    <a href="#" className={style.btn_on} onClick={handleOnSummit}>등록</a>
                    <a href="/board" className={style.btn_off}>취소</a>
                </div>
                {openModal && <Modal message={modalMsg} setModalOpen={setOpenModal}/>}
            </div>
        </div>
    )
}

export default BoardWrite;