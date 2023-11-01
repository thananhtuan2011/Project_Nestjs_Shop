import { Document, Schema } from "mongoose";

const UserSchema = new Schema(
    {
        username: String,
        password: Number,
        fullname: String,
        email: String,
        phone: Number,
        refreshToken: String,
        roles: String
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
    phone: number,
    roles: string,
    refreshToken: string

}