import { User } from 'src/model/UserModelSchema';
import { Body, Controller, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { LoginModel, LoginUserDto } from 'src/dto/login.dto';
import { LoginService } from './services/login/login.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
@Controller('login')
export class LoginController {

    constructor(private login_services: LoginService) {

    }

    @Post("Register")
    async CreatedUser(@Body() user: LoginModel) {

        const userInDb = await this.login_services.findByCondition({
            username: user.username
        })
        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }


        return await this.login_services.create(user)
    }
    @Post('refresh')
    async refresh(@Body() body) {
        return await this.login_services.refresh(body.refresh_token);
    }
    @Post("Login")
    async Login(@Body() user: LoginUserDto) {
        const userInDb = await this.login_services.findByCondition({
            username: user.username,
            password: user.password
        })
        if (!userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        const authen = await this.login_services._createToken(userInDb)
        let data = {
            username: userInDb.username,
            roles: userInDb.roles,
            _id: userInDb._id
        }
        return {
            user: data,
            accessToken: authen.accessToken,
            refreshToken: authen.refreshToken,
        };

    }

    @Post("ChangePass/:id")
    @UseGuards(AuthGuard('jwt'))
    async ChangePass(@Param("id") id: string, @Body() user: LoginModel) {
        const userInDb = await this.login_services.findById(id
        )
        console.log("userInDb", userInDb)
        if (!userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        await this.login_services.findByIdAndUpdate(id, user)
        return await this.login_services.findById(id)

    }

    @Post("DeleteUser/:id")
    @UseGuards(AuthGuard('jwt'))
    DeleteUser(@Param('id') id: string) {
        return this.login_services.deleteOne(id)
    }

    @Post("FindUserById/:id")
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('JWT')
    FindUserById(@Param("id") id: string) {
        return this.login_services.findById(id)
    }
}


