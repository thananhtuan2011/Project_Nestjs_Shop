import { OrderService } from 'src/order/order/order.service';
import { DonHang } from './../../modelSchema/DonHangModelSchema';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.model';

@Injectable()
export class DonHangService extends BaseRepository<DonHang> {

    // @Inject(OrderService)
    // private readonly itemService: OrderService;

    constructor(@InjectModel('DonHang')
    private dhmodel: Model<DonHang>) {
        super(dhmodel)
    }
    async GetDonHangXacNhanByAcountDangVanChuyen(id) {
        try {
            var data = await this.dhmodel.find({ User: id, status: 0 })

            return { status: 1, data }
        }
        catch (e) {
            return { status: 0, message: e.message || 'my error' }
        }
    }
    async GetDonHangChoXacNhan(id) {
        try {
            var data = await this.dhmodel.find({ User: id, status: 1 })

            return { status: 1, data }
        }
        catch (e) {
            return { status: 0, message: e.message || 'my error' }
        }
    }
    GetDonHangAcountDetail(idacount, id) {
        try {
            const data = this.dhmodel.find({ User: idacount, _id: id })
            if (data) {
                data.populate({ path: "User", select: "username createdAt" })
                data.populate({ path: "Product", select: "DonGiaGoc product_name Img Mota " })
                return data;
            }
            return data;
        }
        catch (e) {
            return { status: 0, message: e.message || 'my error' }
        }
    }
    async GetDonHangXacNhanByAcount(id) {
        try {
            var data = await this.dhmodel.find({ User: id })

            return { status: 1, data }
        }
        catch (e) {
            return { status: 0, message: e.message || 'my error' }
        }
    }

    async AddDongHang(body) {
        try {
            this.dhmodel.create(body)

            return { status: 1 }
        }
        catch (e) {
            return { status: 0, message: e.message || 'my error' }
        }
    }
}
