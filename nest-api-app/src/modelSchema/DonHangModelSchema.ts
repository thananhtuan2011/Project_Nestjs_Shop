import { Document, Schema } from "mongoose";

const DonHangSchema = new Schema(
    {
        status: Number,
        TongTien: Number,
        phone: String,
        full_name: String,
        address: String,
        email: String,
        soluong: Number,
        created_at: Date,
        updated_at: Date,
        deleted_at: Date,
        Product: [{ type: Schema.Types.ObjectId, ref: "Product" }],
        User: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true,
        collection: 'DonHang',
    }


);

export { DonHangSchema }

export interface DonHang extends Document {
    status: Number,
    TongTien: Number,
    phone: String,
    full_name: String,
    address: String,
    email: String,
    soluong: Number,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date,
    Product: [],
    User: {}
}