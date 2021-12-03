import style from 'src/components/board/boardWrite.module.css';
import React, {useRef, useState} from 'react';
import {registerBoard} from 'src/apis/Board';
import {getCookie} from "src/utils/cookieUtil";
import {useRouter} from "next/router";
import Modal from "src/components/modals/Modal"
import {EBoardType} from "src//domain/board";

export interface boardDTO {
    userId : string,
    boardType: EBoardType,
    content : string,
    title : string
}

const BoardWrite = (): JSX.Element => {
    const getUserId = getCookie('userId');
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);
    const [modalMsg, setModalMsg] = useState("");
    const [onType,setOnType] = useState(false);
    const {boardType} = router.query;
    const [selectBoard, setSelectBoard] = useState('게시판선택');
    const ref = useRef<HTMLTextAreaElement | null>(null);

    const setMsg = (msg : string) => {
        setOpenModal(true);
        setModalMsg(msg);
    }

    const [inputs , setInputs] = useState<boardDTO>({
        userId : getUserId,
        boardType: boardType as EBoardType,
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

    const [imgList, setImgList] = useState<File[]>([]);
    const [fileURLs,setFileURLs] = useState<Array<string>>([]);

    const handleChangeFile = (e: any) => {
        const fileArr =  e.target.files;
        const fileUrls = Array<string>();
        for(let i =0 ; i < fileArr.length; i++){
            const fileURL = URL.createObjectURL(fileArr[i]); // 미리보기를 위한 변수화
            fileUrls.push(fileURL);
        }
        setFileURLs(fileURLs.concat(fileUrls));
        setImgList(imgList.concat(Array.from(fileArr)));
    }

    const handleDeleteImg = (index: number) => {
        const data = fileURLs.filter(data => data !== fileURLs[index]);
        setFileURLs(data);
        setImgList(imgList.splice(index,1));
    }

    const onEnterPress = (e : React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.key == 'Enter' && !e.shiftKey)
        {
            e.preventDefault(); // 엔터키 입력 방지
            ref.current?.focus();
        }
    }

    const handleTypeClick = () => {
        setOnType(!onType);
    }

    const handleOnSummit = async () => {
        if(inputs.title.length <= 0)
        {
            setMsg("제목을 입력해주세요");
        }
        else if(inputs.content.length <= 0){
            setMsg("내용을 입력해주세요");
        }
        else if(boardType === undefined)
        {
            setMsg("게시판을 선택해주세요");
        }

        else {
            try{
                console.log(imgList);
                const response = await registerBoard(inputs, imgList);
                await router.push(`/board?type=${boardType}`);
            }catch (e) {
                console.log(e.response);
            }
        }
    }

    const handleOnTypeClick =  (type : EBoardType) => {
        setInputs({
            ...inputs,
            boardType : type
        })
        const data = type.toString();
        setSelectBoard(data);
        setOnType(false);
    }

    return(
        <div className={style.container}>
            <div className={style.write_wrap}>
                <div>글작성페이지</div>
                <div className={style.board_write}>
                    <div className={style.title}>
                        <textarea className={style.titleTextArea} placeholder="제목을 입력해 주세요." name = "title" value={title} onChange={onChange} onKeyPress={onEnterPress}> </textarea>
                    </div>
                    <button className={style.boardType_btn} onClick={handleTypeClick}>{selectBoard}</button>
                    {
                        onType &&
                        <div className={style.menu_wrap}>
                            <div className={style.board_type_free} id={EBoardType.FREE} onClick={() => handleOnTypeClick(EBoardType.FREE)}>자유게시판</div>
                            <div className={style.board_type_trade} id={EBoardType.TRADE} onClick={() => handleOnTypeClick(EBoardType.TRADE)}>거래게시판</div>
                            <div className={style.board_type_tip} id={EBoardType.TIP} onClick={() => handleOnTypeClick(EBoardType.TIP)}>TIP게시판</div>
                            <div className={style.board_type_anonymous} id={EBoardType.ANONYMOUS} onClick={() => handleOnTypeClick(EBoardType.ANONYMOUS)}>익명게시판</div>
                        </div>
                    }
                    <div className={style.info}>
                        <span className={style.writer}>글쓴이</span>
                        <span className={style.userId}>{userId}</span>
                    </div>
                    <div className={style.content_wrap}>
                        <div className={style.content}>
                            <textarea className={style.contentTextarea} placeholder="내용 입력을 입력해 주세요" name="content" value = {content} onChange={onChange} ref={ref}></textarea>
                        </div>
                        <div className={style.preview}>
                            {
                                fileURLs.map((img,index) => (
                                    <img src={img} key={index} onClick={() => handleDeleteImg(index)} className={style.preview_img}/>
                                ))}
                        </div>
                    </div>
                    <div className={style.upload}>
                        <label htmlFor="input-file" className={style.plus_img}> 사진 추가</label>
                        <input
                            className={style.file_input}
                            type="file"
                            multiple
                            id="input-file"
                            accept =".jpg, .jpeg, .png"
                            onChange={handleChangeFile}
                        />
                    </div>
                </div>
                <div className={style.bt_wrap}>
                    <button className={style.btn_register} onClick={handleOnSummit}>등록</button>
                    <a href="/board" className={style.btn_cancel}>취소</a>
                </div>
                {openModal && <Modal message={modalMsg} setModalOpen={setOpenModal}/>}
            </div>
        </div>
    )
}

export default BoardWrite;