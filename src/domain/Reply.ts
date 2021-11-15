import {IReplyDto} from "src/apis/Reply";

export interface IReplyProps {
    reply : IReplyDto
}

export interface IFeedReplyAddProps {
    feedId : number
    feedUser : string | null
    refId : number | null
    refUser : string | null
}

export interface IPostReplyAddProps{
    postId : number,
    postUser : string | null,
    refId : number | null,
    refUser : string | null
}