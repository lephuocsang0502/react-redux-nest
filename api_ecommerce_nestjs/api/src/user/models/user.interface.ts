import { RequestEntry } from "src/request/model/request-entry.interface";


export interface User{
    id?: number;
    name?: string;
    username?: string;
    email?:string;
    password?:string;
    role?:UserRole;
    profileImage?:string;
    requestEntries?:RequestEntry[];

}


export enum UserRole{
    ADMIN='admin',
    EDITOR='editor',
    USER='user'
}