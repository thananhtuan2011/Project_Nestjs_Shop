import { Document, Schema } from "mongoose";

const ProductSchema = new Schema(
    {
        amount: Number,
        DonGia: Number,
        product_name: String,
        size: String,
        SĐT: Number,
        Sale: Number,
        DonGiaGoc: Number,
        Img: String,
        Mota: String,
        Media: []

    },
    {
        timestamps: true,
        collection: 'Product',
    }


);

export { ProductSchema }

export interface Product extends Document {
    amount: number
    DonGia: number
    product_name: string
    size: string
    SĐT: number
    Sale: number
    DonGiaGoc: number
    Img: string
    Mota: string
    Media: any[]
}