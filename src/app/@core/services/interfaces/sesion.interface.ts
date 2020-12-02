import { IUser } from './user.interface';

export interface ISession {
    expireTime: string,
    token?: string
}

export interface IMeData {
    status: boolean,
    message?: string,
    user?: IUser
}