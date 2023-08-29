import { JwtService } from '@nestjs/jwt';
import { BaseRepository } from './../../../../../base.model';
import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/model/UserModelSchema';
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

        { username, _id, createdAt, updatedAt }
    ) {

        const accessToken = this.jwtService.sign(
            {
                username, _id, createdAt, updatedAt
            }

        );
        const refreshToken = this.jwtService.sign(
            { username },
            {
                secret: process.env.SECRETKEY_REFRESH,
                expiresIn: process.env.EXPIRESIN_REFRESH,
            },
        );
        await this.loginmodel.findOneAndUpdate(
            { username: username },
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
            const user: any = await this.loginmodel.findOne(
                { username: payload.username }
            );
            const token = await this._createToken(user);
            return {
                username: user.username,
                ...token,
            };
        } catch (e) {
            throw new HttpException('Invalid refresh_token', HttpStatus.UNAUTHORIZED);
        }
    }
    async validateUser(username) {
        return await this.loginmodel.findOne(
            { username: username }
        );
    }

}
