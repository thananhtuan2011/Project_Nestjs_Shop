import { SocketModule } from './../../SocketGetWay/socket/socket.module';
import { OrderModule } from './../../order/order/order.module';
import { OrderService } from 'src/order/order/order.service';
import { Module } from '@nestjs/common';
import { DonHangController } from './don_hang.controller';
import { DonHangService } from './don_hang.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DonHangSchema } from 'src/modelSchema/DonHangModelSchema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature(
    [

      {
        name: 'DonHang',
        schema: DonHangSchema
      },
    ]
  ),
    OrderModule,
    SocketModule

  ],
  controllers: [DonHangController],
  providers: [DonHangService, JwtService]
})
export class DonHangModule { }
