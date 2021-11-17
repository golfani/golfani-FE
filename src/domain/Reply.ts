import {IReplyDto} from "src/apis/Reply";

export interface IReplyProps {
    reply : IReplyDto
}

export interface IFeedReplyAddProps {
    feedId : number
    feedUser? : string
    refId? : number
    refUser? : string
}
