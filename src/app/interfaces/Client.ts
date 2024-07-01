export interface IClient{
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