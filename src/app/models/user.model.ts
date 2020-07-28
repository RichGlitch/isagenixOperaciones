
export class UserModel{
    id?:string;
    email?: string;
    password?: string;
    displayName?: string;
    photoURL?: string;
    isManager?: boolean;
    position?:string;
    manager?:string;
}

export class UserAuthModel{
    id?:string;
    email?: string;
    password?: string;
    displayName?: string;
    photoURL?: string;
}
