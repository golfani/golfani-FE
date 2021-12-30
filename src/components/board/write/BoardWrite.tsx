import style from 'src/components/board/write/boardWrite.module.css';
import React, {useRef, useState} from 'react';
import {IBoardData, registerBoard} from 'src/apis/Board';
import {getCookie} from "src/utils/cookieUtil";
import {useRouter} from "next/router";
import Modal from "src/components/modals/Modal"
import {EBoardType} from "src//domain/board";
import BoardWriteImage from "./BoardWriteImage";
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';

const BoardWrite = (): JSX.Element => {
    const getUserId = getCookie('userId');
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);
    const [modalMsg, setModalMsg] = useState("");
    const {category} = router.query;
    const ref = useRef<HTMLTextAreaElement | null>(null);

    const setMsg = (msg : string) => {
        setOpenModal(true);
        setModalMsg(msg);
    }

    const [inputs , setInputs] = useState<Partial<IBoardData>>({
        userId : getUserId,
        boardType: category as EBoardType,
        content : '',
        title : ''
    })

    const {userId, content, title, boardType}  = inputs;

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
        e.target.value=''; // 같은 파일 재입력시 onChange 이벤트 적용할 수 있도록 적용
    }

    const handleDeleteImg = (index: number) => {
        const data = fileURLs.filter(data => data !== fileURLs[index]);
        setFileURLs(data);
        const img = imgList.filter(img => img !== imgList[index]);
        setImgList(img);
    }

    const onEnterPress = (e : React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.key == 'Enter' && !e.shiftKey)
        {
            e.preventDefault(); // 엔터키 입력 방지
            ref.current?.focus();
        }
    }

    const handleOnSummit = async () => {
        if(inputs.title!.length <= 0)
        {
            setMsg("제목을 입력해주세요");
        }
        else if(inputs.content!.length <= 0){
            setMsg("내용을 입력해주세요");
        }
        else if(boardType === undefined)
        {
            setMsg("게시판을 선택해주세요");
        }

        else {
            try{
                const response = await registerBoard(inputs, imgList);
                await router.push(`/board?type=${boardType}`);
            }catch (e) {
                console.log(e.response);
            }
        }
    }

    const handleClickCategory =  (type : EBoardType) => {
        setInputs({
            ...inputs,
            boardType : type
        })
    }

    const handleClickCancelButton = () => {
        router.back();
    }

    return(
        <div className={style.container}>
            <div className={style.write_wrap}>
                <div className={style.write_top}>
                    <div className={style.write_head}>게시판 글쓰기</div>
                    <div className={style.bt_wrap}>
                        <button className={style.btn_cancel} onClick={handleClickCancelButton}>취소</button>
                        <button className={style.btn_register} onClick={handleOnSummit}>등록</button>
                    </div>
                </div>
                <div className={style.board_write}>
                    <div className={style.title}>
                        <textarea className={style.titleTextArea} placeholder="제목을 입력해 주세요" name = "title" value={title} onChange={onChange} onKeyPress={onEnterPress} autoFocus={true}> </textarea>
                    </div>
                    <div className={style.select_type_wrap}>
                        <button
                            className={boardType === EBoardType.FREE ? style.category_btn_active : style.category_btn}
                            onClick={() => handleClickCategory(EBoardType.FREE)}
                        >자유
                        </button>
                        <button
                            className={boardType === EBoardType.ANONYMOUS ? style.category_btn_active : style.category_btn}
                            onClick={() => handleClickCategory(EBoardType.ANONYMOUS)}
                        >익명
                        </button>
                        <button
                            className={boardType === EBoardType.TIP ? style.category_btn_active : style.category_btn}
                            onClick={() => handleClickCategory(EBoardType.TIP)}
                        >정보
                        </button>
                        <button
                            className={boardType === EBoardType.REVIEW ? style.category_btn_active : style.category_btn}
                            onClick={() => handleClickCategory(EBoardType.REVIEW)}
                        >후기
                        </button>
                        <button
                            className={boardType === EBoardType.TRADE ? style.category_btn_active : style.category_btn}
                            onClick={() => handleClickCategory(EBoardType.TRADE)}
                        >거래
                        </button>
                        <button
                            className={boardType === EBoardType.ASK ? style.category_btn_active : style.category_btn}
                            onClick={() => handleClickCategory(EBoardType.ASK)}
                        >문의
                        </button>
                    </div>
                    <div className={style.info}>
                        <span className={style.writer}>글쓴이</span>
                        <span className={style.userId}>{userId}</span>
                    </div>
                    <div className={style.photo_wrap} >
                        <label htmlFor="input-file" className={style.plus_img}>
                            <InsertPhotoIcon/>
                        </label>
                    </div>
                    <div className={style.content_wrap}>
                        <div className={style.content}>
                            <textarea className={style.contentTextarea} placeholder="내용 입력을 입력해 주세요" name="content" value = {content} onChange={onChange} ref={ref}></textarea>
                        </div>
                        <div className={style.preview}>
                            {
                                fileURLs.map((img,index) => (
                                    <BoardWriteImage index={index} src={img} handleDeleteImg={handleDeleteImg}/>
                                ))}
                        </div>
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
                    </div>
                </div>
                {openModal && <Modal message={modalMsg} setModalOpen={setOpenModal}/>}
            </div>
        </div>
    )
}

export default BoardWrite;
