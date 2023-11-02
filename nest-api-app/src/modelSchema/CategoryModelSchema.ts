import { Document, Schema } from "mongoose";

const CategorySchema = new Schema(
    {
        created_at: Date,
        category_code: String,
        category_name: String,
        status: String,
        // Sub: []

    },
    {
        timestamps: true,
        collection: 'Catefory',
    }


);

export { CategorySchema }

export interface Category extends Document {
    created_at: Date,
    category_code: String,
    category_name: String,
    status: String,
}