import {IReplyDto} from "src/apis/Reply";

export interface IReplyProps {
    reply : IReplyDto
}

export interface IFeedReplyAddProps {
    feedId : number | null
    refId : number | null
    refUser : string | null
}
