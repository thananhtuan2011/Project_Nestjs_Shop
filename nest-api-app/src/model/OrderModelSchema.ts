import { Document, Schema } from "mongoose";
import { User } from "./UserModelSchema";

const OrderSchema = new Schema(
    {
        amount: Number,
        DonGia: Number,
        product_name: String,
        size: String,
        DiaChi: String,
        SĐT: Number,
        Sale: Number,
        DonGiaGoc: Number,
        Img: String,
        Mota: String,
        User: { type: Schema.Types.ObjectId, ref: 'User' },
    },

    {
        timestamps: true,
        collection: 'Order',
    }


);

export { OrderSchema }

export interface Order extends Document {
    amount: number
    DonGia: number
    product_name: string
    size: string
    SĐT: number
    Sale: number
    DonGiaGoc: number
    Img: string
    Mota: string
    User: User,
    DiaChi: string

}