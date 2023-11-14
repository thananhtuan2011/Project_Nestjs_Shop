import { JwtService } from '@nestjs/jwt';
import { BaseRepository } from './../../../../../base.model';
import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/modelSchema/UserModelSchema';
import { LoginModel } from 'src/dto/login.dto';
import { range } from 'rxjs';

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
    public async AllAcount(
        page: number, limit: number
    ) {
        try {
            let pageSizes = [];
            const itemCount = await this.loginmodel.countDocuments();
            let count_page = (itemCount / limit).toFixed()
            const data = await this.loginmodel.find({}, { password: 0 })
                .skip((page - 1) * limit)
                .limit(limit);

            if (!Number.isNaN(count_page)) {
                count_page = "0";
            }

            range(1, Number(count_page == "0" ? 1 : count_page)).subscribe(res => {
                pageSizes.push(res)
            });
            let panigator =
            {
                "total": itemCount,
                "totalpage": limit,
                "page": page,
                "pageSize": count_page,
                "pageSizes": pageSizes
            }
            // console.log("ffff", panigator)
            return { status: 1, panigator, data }
        }
        catch (e) {
            return { status: 0, message: e.message || 'my error' }
        }
    }

}
