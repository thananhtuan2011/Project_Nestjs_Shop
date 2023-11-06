import { Document, Schema } from "mongoose";
import { User } from "./UserModelSchema";
import { Product } from "./ProductModelSchema";

const OrderSchema = new Schema(
    {
        account_id: String,
        product_id: String,
        soluong: Number,
        address: String,
        full_name: String,
        phone: String,
        DonGia: Number,
        category_id: String,
        Size: String,
        Img: String,
        color: String,
        product_name: String,
        Pay: Boolean,
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
    account_id: String,
    product_id: String,
    soluong: Number,
    address: String,
    full_name: String,
    phone: String,
    Pay: Boolean,
    DonGia: Number,
    category_id: String,
    Size: String,
    Img: String,
    color: String,
    product_name: String,

}