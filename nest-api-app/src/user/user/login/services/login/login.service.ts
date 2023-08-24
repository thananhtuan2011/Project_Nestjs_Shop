import { JwtService } from '@nestjs/jwt';
import { BaseRepository } from './../../../../../base.model';
import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/model/UserModel';
import { LoginModel } from 'src/dto/login.dto';

@Injectable()
export class LoginService extends BaseRepository<User> {

    constructor(@InjectModel('User')
    private loginmodel: Model<User>, private readonly jwtService: JwtService,) {
        super(loginmodel)
    }

    async login(user: LoginModel) {


    }

    public async _createToken(

        user
    ) {
        const accessToken = this.jwtService.sign({
            user
        });
        const refreshToken = this.jwtService.sign(
            { user },
            {
                secret: process.env.SECRETKEY_REFRESH,
                expiresIn: process.env.EXPIRESIN_REFRESH,
            },
        );
        await this.loginmodel.findByIdAndUpdate(
            { username: user.username },
            // phần body update
            {
                refreshToken: refreshToken,
            },
        );
        return {
            expiresIn: process.env.EXPIRESIN,
            accessToken,
            refreshToken,
            expiresInRefresh: process.env.EXPIRESIN_REFRESH,
        };
        // return {
        //     expiresIn: process.env.EXPIRESIN,
        //     accessToken,
        // };
    }

    async refresh(refresh_token) {
        try {
            const payload = await this.jwtService.verify(refresh_token, {
                secret: process.env.SECRETKEY_REFRESH,
            });
            const user = await this.loginmodel.findOne(
                refresh_token,
                payload.email,
            );
            const token = await this._createToken(user);
            return {
                email: user.email,
                ...token,
            };
        } catch (e) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
    }
    async validateUser(username) {
        return await this.loginmodel.findOne(
            { username: username }
        );
    }

}
