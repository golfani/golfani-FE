import {IReplyDto} from "src/apis/Reply";
import {IBoardData} from "src/apis/Board";
import {RefObject} from "react";

export interface IReplyProps {
    reply : IReplyDto
    board? : IBoardData
    replyRef? : RefObject<string[]>
}

export interface IFeedReplyAddProps {
    feedId : number
    feedUser? : string
    refId? : number
    refUser? : string
}

export interface IPostReplyAddProps{
    postId : number,
    postUser? : string
    refId? : number
    refUser? : string
    anonymous? : boolean
}