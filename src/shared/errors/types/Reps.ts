import {tagTypes} from './TagTypes'

export interface Rep{
    id: int,
    nome: string,
    email: string,
    insta: string,
    descr: string,
    tags: tagTypes
}