export class LoginModel {
    username: string
    password: number
    fullname: string
    email: string
    SĐT: number
    refreshToken: string;
    roles: string;
}

export class LoginUserDto {
    username: string
    password: number
}