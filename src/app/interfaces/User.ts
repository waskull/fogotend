export interface User{
    email?: string;
    password?: string;
    firstname?: string;
    lastname?: string;
    roles?: string[];
    birthdate?: Date;
    gender?:string;
    dni?: string;
    phone?: string;
    createdAt?:Date | string | null;
    id?: number;

}

export interface IUser{
    email?: string;
    password?: string;
    firstname?: string;
    lastname?: string;
    roles?: string[];
    birthdate?: Date;
    gender?:string;
    dni?: string;
    phone?: string;
    createdAt?:Date;
}

export interface IIUser{
    email?: string;
    password?: string;
    firstname?: string;
    lastname?: string;
    roles?: string[];
    birthdate?: Date;
    active?: boolean;
    id?: number;
    gender?:string;
    dni?: string;
    phone?: string;
    createdAt?:Date;
}

export interface IRegisterUser{
    email?: string;
    password?: string;
    firstname?: string;
    lastname?: string;
    roles?: string[];
    birthdate?: Date;
    gender?:string;
    dni?: string;
    phone?: string;
}
