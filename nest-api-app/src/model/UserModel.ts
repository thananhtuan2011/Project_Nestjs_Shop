import { Document, Schema } from "mongoose";

const UserSchema = new Schema(
    {
        username: String,
        password: Number,
        fullname: String,
        email: String,
        SĐT: Number,
        refreshToken: String
    },
    {
        timestamps: true,
        collection: 'User',
    }


);

export { UserSchema }

export interface User extends Document {
    username: string,
    password: number,
    fullname: string,
    email: string,
    SĐT: number,
    refreshToken: string

}