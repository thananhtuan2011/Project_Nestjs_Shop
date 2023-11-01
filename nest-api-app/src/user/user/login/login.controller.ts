import { User } from 'src/modelSchema/UserModelSchema';
import { Body, Controller, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { LoginModel, LoginUserDto } from 'src/dto/login.dto';
import { LoginService } from './services/login/login.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { catchError } from 'rxjs';
import { error } from 'console';
@Controller('login')
export class LoginController {

    constructor(private login_services: LoginService) {

    }

    @Post("Register")
    async CreatedUser(@Body() user: LoginModel) {
        try {

            const userInDb = await this.login_services.findByCondition({
                username: user.username
            })
            if (userInDb) {
                throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
            }


            await this.login_services.create(user)
            var dt = await this.login_services.findByCondition({ username: user.username })
            return { status: 1, data: dt }

        }
        catch (e) {
            return { status: HttpStatus.NOT_FOUND, message: e.message || 'my error' }
        }
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
            return null;
        }
        const authen = await this.login_services._createToken(userInDb)
        let data = {
            username: userInDb.username,
            roles: userInDb.roles,
            _id: userInDb._id,
            fullname: userInDb.fullname
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


