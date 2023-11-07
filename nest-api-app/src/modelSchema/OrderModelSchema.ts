import { Document, Schema } from "mongoose";

const OrderSchema = new Schema(
    {

        soluong: Number,
        address: String,
        full_name: String,
        phone: String,
        DonGia: Number,
        Size: String,
        Img: String,
        color: String,
        product_name: String,
        Pay: Boolean,
        Category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
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

    soluong: Number,
    address: String,
    full_name: String,
    phone: String,
    Pay: Boolean,
    DonGia: Number,
    Size: String,
    Img: String,
    color: String,
    product_name: String,
    Category: [],
    Product: [],
    User: {}

}