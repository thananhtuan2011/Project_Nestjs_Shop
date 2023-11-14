import { QueryParamsModel } from './../../share/Pagination/Querypram';
import { Body, Controller, Get, Inject, Param, Post, Req, UseGuards } from '@nestjs/common';
import { DonHangService } from './don_hang.service';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtData } from 'src/dto/jwt';
import { OrderService } from 'src/order/order/order.service';
@UseGuards(AuthGuard('jwt'))
@Controller('donhang')
export class DonHangController {

    constructor(

        private _donhang_services: DonHangService, private readonly jwtService: JwtService, private _order_services: OrderService) { }



    @Get("GetDonHangXacNhanByAcountDangVanChuyen")
    @ApiBearerAuth('JWT')
    async GetDonHangXacNhanByAcountDangVanChuyen(@Req() request) {
        try {

            const accessToken = request.headers['authorization'].split(' ')[1];
            const decodedToken = await this.jwtService.decode(accessToken) as JwtData;
            return await this._donhang_services.GetDonHangXacNhanByAcountDangVanChuyen(decodedToken._id)

        }
        catch (e) {
            return { status: 0, error: e.message }
        }

    }


    @Get("AllDonHang")
    @ApiBearerAuth('JWT')
    async AllDonHang(@Req() request, @Body() pageOptionsDto: QueryParamsModel) {
        try {

            const accessToken = request.headers['authorization'].split(' ')[1];
            const decodedToken = await this.jwtService.decode(accessToken) as JwtData;
            return await this._donhang_services.AllDonHang(pageOptionsDto)

        }
        catch (e) {
            return { status: 0, error: e.message }
        }

    }


    @Post("EditDonHang")
    @ApiBearerAuth('JWT')
    async EditDonHang(@Body() body, @Req() request) {
        try {

            const accessToken = request.headers['authorization'].split(' ')[1];
            const decodedToken = await this.jwtService.decode(accessToken) as JwtData;
            return await this._donhang_services.EditDonHang(body)

        }
        catch (e) {
            return { status: 0, error: e.message }
        }

    }
    @Get("GetDonHangXacNhanByAcount")
    @ApiBearerAuth('JWT')
    async GetDonHangXacNhanByAcount(@Req() request) {
        try {

            const accessToken = request.headers['authorization'].split(' ')[1];
            const decodedToken = await this.jwtService.decode(accessToken) as JwtData;
            return await this._donhang_services.GetDonHangXacNhanByAcount(decodedToken._id)

        }
        catch (e) {
            return { status: 0, error: e.message }
        }

    }

    @Get("GetDonHangAcountDetail/:id")
    @ApiBearerAuth('JWT')
    async GetDonHangAcountDetail(@Param("id") id: string, @Req() request) {
        try {
            const accessToken = request.headers['authorization'].split(' ')[1];
            const decodedToken = await this.jwtService.decode(accessToken) as JwtData;

            var data = await this._donhang_services.GetDonHangAcountDetail(decodedToken._id, id)
            return { status: 1, data }
        }
        catch (e) {
            return { status: 0, error: e.message }
        }
    }
    @Get("GetDonHangChoXacNhan")
    @ApiBearerAuth('JWT')
    async GetDonHangChoXacNhan(@Req() request) {
        try {

            const accessToken = request.headers['authorization'].split(' ')[1];
            const decodedToken = await this.jwtService.decode(accessToken) as JwtData;
            return await this._donhang_services.GetDonHangChoXacNhan(decodedToken._id)

        }
        catch (e) {
            return { status: 0, error: e.message }
        }

    }

    @Post("AddDonHang")
    @ApiBearerAuth('JWT')
    async AddDonHang(@Body() body) {
        try {

            var dt = await this._donhang_services.AddDongHang(body)
            if (dt.status == 1) {
                body.ListOrderIteam
                    .forEach(element => {
                        this._order_services.UpdatePay(element._id)
                    });

            }
            return { status: 1, dt }

        }
        catch (e) {
            return { status: 0, error: e.message }
        }

    }

}
