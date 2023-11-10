import { Document, Schema } from "mongoose";

const CategorySubSchema = new Schema(
    {
        category_name: String,


    },
    {
        timestamps: true,
        collection: 'CategorySub',
    }


);

export { CategorySubSchema }

export interface CategorySub extends Document {

    category_name: String,
    Category: {},
}