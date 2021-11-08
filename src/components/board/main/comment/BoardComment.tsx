import style from 'src/components/board/main/comment/boardComment.module.css';
import Link from 'next/link';
import React from 'react';
import RecommendRoundedIcon from '@material-ui/icons//RecommendRounded';
import ReportGmailerrorredRoundedIcon from '@material-ui/icons/ReportGmailerrorredRounded';

const BoardComment = () => {
    return (
        <div className={style.container}>
            <div className={style.comment_wrap}>
                <div className={style.comment_top}>
                    <div className={style.comment_total}>
                        <span>전체댓글 </span>
                        <span className={style.total_count}>215</span>
                        <span>개</span>
                    </div>

                </div>
                <div className={style.comment_box}>
                    <ul className={style.comment_list}>
                        <li className={style.comment}>
                            <div className={style.commentList_top}>
                                <Link href="#view" >
                                    리틀 박은비
                                </Link>
                                <span className={style.date}> 2시간 전</span>

                                <div className={style.commentList_right}>
                                    <RecommendRoundedIcon/>
                                    <span className={style.count}>100</span>
                                    <ReportGmailerrorredRoundedIcon/>
                                </div>
                            </div>
                            <div className={style.comment_main}>
                                <p className={style.comment_style}>날씨가 좋네요 !</p>
                            </div>
                            <div className={style.reply}>
                                <span>답글 </span>
                                <em className={style.count}>0</em>
                                <span>개 </span>
                                <Link href="#">답글쓰기</Link>
                            </div>
                        </li>
                        <li className={style.comment}>
                            <div className={style.commentList_top}>
                                <Link href="#view" >
                                    리틀 박은비
                                </Link>
                                <span className={style.date}> 2시간 전</span>

                                <div className={style.commentList_right}>
                                    <RecommendRoundedIcon/>
                                    <span className={style.count}>100</span>
                                    <ReportGmailerrorredRoundedIcon/>
                                </div>
                            </div>
                            <div className={style.comment_main}>
                                <p className={style.comment_style}>날씨가 좋네요 !</p>
                            </div>
                            <div className={style.reply}>
                                <span>답글 </span>
                                <em>0</em>
                                <span>개 </span>
                                <Link href="#">답글쓰기</Link>
                            </div>
                        </li>
                    </ul>
                    <div className={style.comment_write}>
                        <div className={style.write_top}>
                            댓글 작성
                        </div>

                        <div className={style.write_contain}>
                            <div>멋쟁이</div>
                            <div className={style.submit_form}>
                                <textarea className={style.write_box} placeholder="내용을 입력하시오."></textarea>
                                <button className={style.submit}>등록</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BoardComment;