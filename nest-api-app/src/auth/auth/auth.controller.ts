import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authen_service: AuthService) {

    }


    // @Post("login")
    // login() {
    //     return process.env.MONGODB_URL
    // }
}
