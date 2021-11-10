
export type TAlarm = 'REPLY' | 'LIKES' | 'CHAT'

export interface IAlarm {
    id : number
    sender : string
    receiver : string
    message : string
    content : string | null
    alarmType : TAlarm
    isRead : boolean
    createdAt : Date
    postId? : number
    feedId? : number
    replyId? : number
}

export type TAlarmSendDto = Omit<IAlarm, 'id' | 'isRead' | 'createdAt' | 'redirectUrl'>
