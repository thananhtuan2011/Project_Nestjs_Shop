import { Document, Schema } from "mongoose";
import { User } from "./UserModelSchema";
import { Product } from "./ProductModelSchema";

const MediaSchema = new Schema(
    {
        MediaUrl: [String],

    },

    {
        timestamps: true,
        collection: 'Media',
    }


);

export { MediaSchema }

export interface Media extends Document {
    MediaUrl: string[],
    Product: Product

}