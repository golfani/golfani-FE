import style from 'src/components/board/boardPut.module.css';
import React, {useState} from 'react';
import {IBoardData, putBoard} from 'src/apis/Board';
import {useRouter} from "next/router";
import Modal from "../modals/Modal";
import {IBoardProps} from "./BoardView";
import {EBoardType} from "../../domain/board";
import Link from "next/link";

const BoardPut = (boardData:IBoardProps): JSX.Element => {
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);
    const [modalMsg, setModalMsg] = useState("");

    const setMsg = (msg : string) => {
        setOpenModal(true);
        setModalMsg(msg);
    }

    const [inputs , setInputs] = useState<IBoardData>(boardData.boardView);

    const {userId, boardType, content, title}  = inputs;

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
            try{
                const response = await putBoard(inputs);
                await router.push('/board');
            }catch (e) {
                console.log(e.response);
            }
        }
    }

    return(
        <div className={style.container}>
            <div className={style.write_wrap}>
                <div className={style.write_top}>
                    <div className={style.write_head}>게시판 수정</div>
                    <div className={style.bt_wrap}>
                        <button className={style.btn_register} onClick={handleOnSummit}>수정</button>
                        <Link href={'/board'}>
                            <button className={style.btn_cancel}>취소</button>
                        </Link>
                    </div>
                </div>
                <div className={style.board_write}>
                    <div className={style.title}>
                        <span className={style.title_head}>글제목</span>
                        <textarea className={style.titleTextArea} placeholder="제목을 입력해 주세요." name = "title" value={title} onChange={onChange}> </textarea>
                        <span className={style.board_type}>{boardType === EBoardType.FREE ? '자유게시판 ' : boardType === EBoardType.TIP ? 'TIP게시판' : boardType === EBoardType.ANONYMOUS ? '익몃게시판' : '거래게시판' }</span>
                    </div>
                    <div className={style.info}>
                        <span className={style.writer}>글쓴이</span>
                        <span className={style.userId}>{userId}</span>
                    </div>
                    <div className={style.content_wrap}>
                        <div className={style.content}>
                            <textarea className={style.contentTextarea} placeholder="내용 입력을 입력해 주세요" name="content" value = {content} onChange={onChange}/>
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
                                {fileURLs.map((img) => (
                                    <img className={style.preview_img} src={img}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {openModal && <Modal message={modalMsg} setModalOpen={setOpenModal}/>}
            </div>
        </div>
    )
}

export default BoardPut;