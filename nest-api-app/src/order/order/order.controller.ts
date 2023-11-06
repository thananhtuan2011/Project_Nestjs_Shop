import { Body, Controller, Param, Post, Req, UseGuards, Request } from '@nestjs/common';
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
    async GetOrder(@Param("id") id: string) {
        // const jwt = req
        // console.log("jwt", jwt);
        //   const decodedToken = await this.jwtService.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InR1YW50YSIsIl9pZCI6IjY1NDIxOGUwOWRlM2QxZDY0MmRlM2JmNSIsImNyZWF0ZWRBdCI6IjIwMjMtMTEtMDFUMDk6MjI6NDAuMzY2WiIsInVwZGF0ZWRBdCI6IjIwMjMtMTEtMDZUMDM6MDQ6MjkuMTY4WiIsImlhdCI6MTY5OTI2MzQ4NywiZXhwIjoxNjk5MjY5NDg3fQ.gBYghZgT42t4o76Cm26HRSCEqufKYXDzcLOLp62u-lI") as JwtData;

        //console.log("decodedToken", decodedToken);
        // console.log("username", decodedToken.username);
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
