import { Document, Schema } from "mongoose";
import { User } from "./UserModelSchema";
import { Product } from "./ProductModelSchema";

const OrderSchema = new Schema(
    {
        amount: Number,
        size: String,
        DiaChi: String,
        SĐT: Number,
        Sale: Number,
        Product: [{ type: Schema.Types.ObjectId, ref: "Product" }],
        User: { type: Schema.Types.ObjectId, ref: 'User' },
    },

    {
        timestamps: true,
        collection: 'Order',
    }


);

export { OrderSchema }

export interface Order extends Document {
    amount: number,
    size: string,
    DiaChi: string,
    SĐT: number,
    Sale: number,
    User: User,
    Product: Product

}