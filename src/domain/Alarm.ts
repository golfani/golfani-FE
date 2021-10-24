
export type TAlarm = 'FEED' | 'POST' | 'SYSTEM';

export interface IAlarm {
    id : number
    sender : string
    receiver : string
    message : string
    content : string | null
    alarmType : TAlarm
    isRead : boolean
    createdAt : Date
    redirectUrl : string
    referId : number
}

export type TAlarmSendDto = Omit<IAlarm, 'id' | 'isRead' | 'createdAt' | 'redirectUrl'>
