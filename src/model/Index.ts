import { Schema, Document } from "mongoose";
import mongoose from "mongoose";

interface IUser extends Document {
  email: string;
  createdAt: Date;
  credits: number;
  recharged: boolean;
}

export interface Iinvestor extends Document {
    name: string;
    category: string;
    type: 'Investor' | 'Mentor';
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
  email: {
    type:String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email address"],
  },
  createdAt: {
    default: Date.now,
    type: Date,
  },
  credits: {
    default: 5,
    type: Number,
  },
  recharged: {
    type: Boolean,
    default: false,
  },
});

const InvestorSchema:Schema<Iinvestor>=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true,
        enum:["Investor","Mentor"]
    }
})

export const Investor =mongoose.models.Investor || mongoose.model<Iinvestor>("Investor", InvestorSchema);
export const User =mongoose.models.User || mongoose.model<IUser>("User", UserSchema);



