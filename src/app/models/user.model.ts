import { ResolveStart } from "@angular/router";
export class Roles{
    colaborador?: boolean;
    coordinador?: boolean;
}

export class UserModel{
    id?:string;
    email?: string;
    password?: string;
    displayName?: string;
    photoURL?: string;
    role?: Roles;
    position?:string;
}
