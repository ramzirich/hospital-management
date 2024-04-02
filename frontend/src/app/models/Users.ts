export interface User{
    email:string,
    firstName: string,
    lastName: string,
    dateOfBirth: string
    token: string
}

export interface Login{
    email:string,
    password: string,
}