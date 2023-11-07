import { Body, Controller, Param, Post, Req, UseGuards, Get } from '@nestjs/common';
import { OrderModel } from 'src/dto/order.dto';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtData } from 'src/dto/jwt';
@Controller('order')
export class OrderController {

    constructor(private _order_service: OrderService,
        private readonly jwtService: JwtService
    ) {

    }

    @Post("GetOrder/:id")
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('JWT')
    async GetOrder(@Param("id") id: string, @Req() request) {
        const accessToken = request.cookies.accessToken
        const decodedToken = await this.jwtService.decode(accessToken) as JwtData;

        return await this._order_service.OrderDetail(id)
    }


    @Post("DeleteProductInOrder/:id/:id_pro")
    async DeleteProductInOrder(@Param("id") id: string, @Param("id_pro") id_pro: string) {
        return await this._order_service.DeleteProductInOrder(id, id_pro)
    }

    @Post("UpdateProductInOrder/:id/:id_pro")
    async UpdateProductInOrder(@Param("id") id: string, @Param("id_pro") id_pro: string) {
        return await this._order_service.UpdateProductInOrder(id, id_pro)
    }

    @Post("AddOrder")
    @UseGuards(AuthGuard('jwt'))
    async AddOrder(@Body() body: OrderModel) {
        return await this._order_service.CreaedOrder(body)
    }
}
